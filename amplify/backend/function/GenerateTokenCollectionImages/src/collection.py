import logging
from io import BytesIO

from graphql import update_collection_with_generated_images
from multiprocessing import Process
from PIL import Image
import boto3
import json
import os

s3_client = boto3.client('s3')

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

s3_bucket = os.getenv("STORAGE_CIPHERLAUNCHPROJECTS_BUCKETNAME")


def get_image_data(trait_image_s3_storage_path):
    trait_image_s3_key = f"public/{trait_image_s3_storage_path}"
    logger.debug(f"Retrieving trait image with s3 Key {trait_image_s3_key}")

    image_data = s3_client.get_object(Bucket=s3_bucket, Key=trait_image_s3_key)['Body'].read()

    return Image.open(BytesIO(image_data)).convert('RGBA')


class Collection:
    def __init__(self, collection_id, project_id, num_of_tokens):
        self.collection_id = collection_id
        self.project_id = project_id
        self.num_of_tokens = num_of_tokens

    def generate_token_images(self):
        image_metadata_raw = s3_client.get_object(
            Bucket=s3_bucket, Key=f"public/projects/{self.project_id}/collections/" +
                                  f"{self.collection_id}/image_metadata/image_metadata.json")['Body']\
            .read().decode('utf-8')
        image_metadata = json.loads(image_metadata_raw)
        token_creation_processes = []
        partition_size = self.num_of_tokens // 30
        i = 0
        while i < self.num_of_tokens:
            end_token = i + partition_size
            if end_token > self.num_of_tokens:
                end_token = self.num_of_tokens
            token_image_metadata = []
            token_ids = []
            for j in range(i, end_token):
                token_image_metadata.append(image_metadata[str(j)])
                token_ids.append(j)
            token_creation_process = Process(target=self.create_token_image, args=(token_image_metadata, token_ids))
            token_creation_processes.append(token_creation_process)
            i = end_token

        for process in token_creation_processes:
            process.start()

        for process in token_creation_processes:
            process.join()

        updated_collection = update_collection_with_generated_images(self.collection_id)
        return updated_collection

    def create_token_image(self, token_trait_images, token_ids):
        for i in range(len(token_ids)):
            trait_images = token_trait_images[i]
            token_id = token_ids[i]
            logger.debug(f"Creating token for token {token_id}")
            composite_img = Image.alpha_composite(
                get_image_data(trait_images[0]),
                get_image_data(trait_images[1])
            )
            for j in range(2, len(trait_images)):
                image_rgb = get_image_data(trait_images[j])
                composite_img = Image.alpha_composite(
                    composite_img,
                    image_rgb
                )
            rgb_img = composite_img.convert('RGB')
            self.upload_image(rgb_img, token_id)

    def upload_image(self, img, token_id):
        buffer = BytesIO()
        img.save(buffer, "JPEG")
        buffer.seek(0)
        key = f"public/projects/{self.project_id}/collections/{self.collection_id}/token_images/{token_id}.jpg"
        image_upload_response = s3_client.put_object(Bucket=s3_bucket, Key=key, Body=buffer)
        if image_upload_response['ResponseMetadata']['HTTPStatusCode'] != 200:
            status_code = image_upload_response['ResponseMetadata']['HTTPStatusCode']
            logger.error(
                f"Received status code {status_code} when attempting to put object to bucket " +
                f"{s3_bucket} and key {key}"
            )
            raise Exception(f"Failed to upload image for token {token_id} to bucket {s3_bucket}")
        logger.debug(f"Uploaded image to bucket {s3_bucket} and key {key}")