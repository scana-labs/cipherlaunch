from collection import Collection
import logging

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)


def handler(event, context):
    project_id = event["project_id"]
    num_tokens = event["num_tokens"]
    logger.debug(f"Received create token collection request for project_id {project_id} and num_tokens {num_tokens}")

    collection = Collection(project_id)
    collection.generate_tokens(num_tokens)
