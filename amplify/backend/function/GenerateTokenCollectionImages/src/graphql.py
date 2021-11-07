from datetime import datetime, timezone
import json
import logging
import os
import requests

session = requests.Session()

GRAPHQL_API_ENDPOINT = os.getenv("API_CIPHERLAUNCHGQL_GRAPHQLAPIENDPOINTOUTPUT")
GRAPHQL_API_KEY = os.getenv("API_CIPHERLAUNCHGQL_GRAPHQLAPIKEYOUTPUT")

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)


def update_collection_with_generated_images(collection_id):
    query = """
        mutation updateCollection ($input: UpdateCollectionInput!) {
            updateCollection(updateCollectionInput: $input) {
                name
                images_generated
            }
        }
    """
    variables = {"input": {
        "collection_id": collection_id,
        "images_generated": True
    }}
    response_data = run_graphql_query(query, variables)
    logger.debug("update_collection_with_generated_images query result: " + str(response_data))
    return response_data["updateCollection"]



def run_graphql_query(query, variables):
    response = session.request(
        url=GRAPHQL_API_ENDPOINT,
        method='POST',
        headers={'x-api-key': GRAPHQL_API_KEY},
        json={'query': query, 'variables': variables}
    )
    json_response = json.loads(response.text)
    if "errors" in json_response.keys():
        errors = json_response["errors"]
        logger.error(f"Error with request: {errors}")
        raise Exception(f"GraphQL Request failure")
    else:
        return json_response["data"]