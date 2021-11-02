from collections import defaultdict

from graphql import get_layers_under_project, get_traits_under_layer, create_new_collection
from uuid import uuid4
from token_item import Token
import boto3
import json
import logging
import os
import random

s3_client = boto3.client("s3")

s3_bucket = os.getenv("STORAGE_CIPHERLAUNCHPROJECTS_BUCKETNAME")

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

UTF_8_ENCODING = 'UTF-8'


class Collection:

    def __init__(self, project_id, project_name, base_url, collection_name):
        self.project_id = project_id
        self.project_name = project_name
        self.collection_name = collection_name
        self.base_url = base_url
        self.layers = self.get_project_layers()  # list of layers in order of ascending layer_order number
        self.layer_trait_rarities, self.trait_images = self.get_metadata_maps()
        self.collection_id = str(uuid4())

    def get_project_layers(self):
        return get_layers_under_project(self.project_id)

    def get_metadata_maps(self):
        layers_trait_rarities = {}
        trait_images = {}
        for layer in self.layers:
            trait_rarities = {}
            layer_traits = get_traits_under_layer(layer["layer_id"])
            for trait in layer_traits:
                trait_rarities[trait["name"]] = trait["rarity"]
                trait_images[trait["name"]] = trait["image_url"]
            layers_trait_rarities[layer["name"]] = trait_rarities
        return layers_trait_rarities, trait_images

    def generate_tokens(self, total_tokens, token_id_offset=0):
        # Check that we have enough traits to generate total_tokens.
        total_possible = 1
        for layer in self.layer_trait_rarities:
            traits = list(self.layer_trait_rarities[layer].keys())
            if traits:
                total_possible *= len(traits)
        if total_possible < total_tokens:
            raise Exception(f'Not enough traits to generate {total_tokens} tokens, only {total_possible} possible')
        elif total_possible * 0.8 <= total_tokens:
            print(f'Barely enough traits to generate {total_tokens} tokens, so may take a while')

        # Trait generation.
        random.seed(42)
        tokens = []
        tokens_set = set()
        while len(tokens) < total_tokens:
            token = Token.random(self.layer_trait_rarities)
            if token in tokens_set:  # TODO: incompatible traits
                continue
            tokens.append(token)
            tokens_set.add(token)

        # Add token ids to json.
        for i, token in enumerate(tokens):
            token.token_id = i + token_id_offset

        # Print all token traits.
        # print(list(items))

        # Get trait counts.
        layer_to_trait_counts_dict = defaultdict(lambda: defaultdict(lambda: defaultdict(float)))
        for token in tokens:
            for layer, trait_value in token.token_traits.items():
                layer_to_trait_counts_dict[layer][trait_value]["actual_rarity"] += 1
        for layer in layer_to_trait_counts_dict.keys():
            for trait in layer_to_trait_counts_dict[layer].keys():
                layer_to_trait_counts_dict[layer][trait]["input_rarity"] = self.layer_trait_rarities[layer][trait]
                layer_to_trait_counts_dict[layer][trait]["actual_rarity"] /= total_tokens

        token_trait_count_bytes = bytes(json.dumps(layer_to_trait_counts_dict).encode(UTF_8_ENCODING))
        key = f"public/projects/{self.project_id}/collections/{self.collection_id}/trait-counts/trait-distribution.json"
        trait_counts_upload_response = s3_client.put_object(
                Bucket=s3_bucket,
                Key=key,
                Body=token_trait_count_bytes
            )
        if trait_counts_upload_response['ResponseMetadata']['HTTPStatusCode'] != 200:
            status_code = trait_counts_upload_response['ResponseMetadata']['HTTPStatusCode']
            logger.error(
                f"Received status code {status_code} when attempting to put object to bucket " +
                f"{s3_bucket} and key {key}"
            )
            raise Exception(f"Failed to upload trait counts to bucket {s3_bucket}")
        logger.debug(f"Uploaded trait counts to bucket {s3_bucket} and key {key}")

        # Write each item's metadata to a separate metadata file.
        for token in tokens:
            metadata_bytes = bytes(json.dumps(token.metadata(self.project_name, self.base_url)).encode(UTF_8_ENCODING))
            key = f"public/projects/{self.project_id}/collections/{self.collection_id}/metadata/{token.token_id}.json"
            metadata_upload_response = s3_client.put_object(
                Bucket=s3_bucket,
                Key=key,
                Body=metadata_bytes
            )
            if metadata_upload_response['ResponseMetadata']['HTTPStatusCode'] != 200:
                status_code = metadata_upload_response['ResponseMetadata']['HTTPStatusCode']
                logger.error(
                    f"Received status code {status_code} when attempting to put object to bucket " +
                    f"{s3_bucket} and key {key}"
                )
                raise Exception(f"Failed to upload metadata for token_id {token.token_id} to key " +
                                f"{key}")
            logger.debug(f"Uploaded metadata for token_id {token.token_id} to {key}")

        created_collection = create_new_collection(self.collection_id, self.collection_name, self.project_id, total_tokens)

        create_collection_id = created_collection["collection_id"]
        created_collection_name = created_collection["name"]

        logger.debug(
            f"Created collection with id {create_collection_id} and name {created_collection_name}")

        return layer_to_trait_counts_dict, created_collection

