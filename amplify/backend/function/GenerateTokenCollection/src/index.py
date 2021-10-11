import json

from collection import Collection
import logging

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)


def handler(event, context):
    project_id = event["project_id"]
    project_name = event["project_name"]
    num_tokens = event["num_tokens"]
    base_url = event["base_url"]
    logger.debug(f"Received create token collection request for project_id {project_id} and num_tokens {num_tokens}")

    collection = Collection(project_id, project_name, base_url)
    token_collection = collection.generate_tokens(num_tokens)

    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": json.dumps(token_collection)
    }
