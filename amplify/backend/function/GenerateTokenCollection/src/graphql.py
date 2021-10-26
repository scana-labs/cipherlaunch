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


def get_layers_under_project(project_id):
    query = """
        query listLayersUnderProject ($project_id: String!) {
            listLayersUnderProject(project_id: $project_id) {
                layer_id
                name
                layer_order
            }
        }
    """
    variables = {"project_id": project_id}
    response_data = run_graphql_query(query, variables)
    logger.debug("layers_under_project query result: " + str(response_data))
    return response_data["listLayersUnderProject"]


def get_traits_under_layer(layer_id):
    query = """
        query ($layer_id : String!) {
            listTraitsUnderLayer(layer_id: $layer_id) {
                name
                rarity
                image_url
            }
        }
    """
    variables = {"layer_id": layer_id}
    response_data = run_graphql_query(query, variables)
    return response_data["listTraitsUnderLayer"]


def create_new_collection(collection_id, project_id, s3_url):
    mutation = """
        mutation ($input : CreateCollectionInput!) {
            createCollection(createCollectionInput: $input) {
                s3_url
                collection_id
            } 
        }  
    """

    variables = {"input": {
        "collection_id": collection_id,
        "project_id": project_id,
        "s3_url": s3_url,
        "create_timestamp": datetime.utcnow().isoformat()
        }
    }
    response_data = run_graphql_query(mutation, variables)
    logger.debug("createCollection result: " + str(response_data))
    return response_data['createCollection']


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