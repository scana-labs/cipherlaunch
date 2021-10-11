import json
import logging
import os
import requests

session = requests.Session()

GRAPHQL_API_ENDPOINT = os.getenv("API_GETPROJECTDATA_GRAPHQLAPIENDPOINTOUTPUT")
GRAPHQL_API_KEY = os.getenv("API_GETPROJECTDATA_GRAPHQLAPIKEYOUTPUT")

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)


def get_categories_under_project(project_id):
    query = """
        query listCategoriesUnderProject ($project_id: String!) {
            listCategoriesUnderProject(project_id: $project_id) {
                category_id
                name
                rank
            }
        }
    """
    variables = {"project_id": project_id}
    response_data = run_graphql_query(query, variables)
    logger.debug("categories_under_project query result: " + str(response_data))
    return response_data["listCategoriesUnderProject"]


def get_traits_under_category(category_id):
    query = """
        query ($category_id : String!) {
            listTraitsUnderCategory(category_id: $category_id) {
                name
                rarity
                bucket_url
            }
        }
    """
    variables = {"category_id": category_id}
    response_data = run_graphql_query(query, variables)
    return response_data["listTraitsUnderCategory"]


def create_new_collection(collection_id, project_id, bucket_url):
    mutation = """
        mutation ($input : CreateCollectionsInput!) {
            createCollections(createCollectionsInput: $input) {
                bucket_url
                collection_id
            } 
        }  
    """

    variables = {"input": {
        "collection_id": collection_id, "project_id": project_id, "bucket_url": bucket_url
        }
    }
    response_data = run_graphql_query(mutation, variables)
    return response_data['createCollections']


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