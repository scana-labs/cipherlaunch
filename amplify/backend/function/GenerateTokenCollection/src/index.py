import json

from collection import Collection
import logging

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)


def handler(event, context):
    project_id = event["project_id"]
    project_name = event["project_name"]
    collection_name = event["collection_name"]
    num_tokens = event["num_tokens"]
    base_url = event["base_url"]
    logger.debug(f"Received create token collection request for project_id {project_id} and num_tokens {num_tokens}")

    collection = Collection(project_id, project_name, base_url, collection_name)
    token_trait_distribution_dict, token_collection = collection.generate_tokens(num_tokens)
    response_body = {"token_trait_distribution": token_trait_distribution_dict, "token_collection": token_collection}

    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": json.dumps(response_body)
    }
