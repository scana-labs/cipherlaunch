import json
import logging
import os
import requests
from requests_aws4auth import AWS4Auth

session = requests.Session()
session.auth = AWS4Auth(
    os.environ["API_GETPROJECTDATA_GRAPHQLAPIIDOUTPUT"],
    os.environ["API_GETPROJECTDATA_GRAPHQLAPIKEYOUTPUT"],
    os.environ["REGION"],
    'appsync'
)
GRAPHQL_API_ENDPOINT = os.environ["API_GETPROJECTDATA_GRAPHQLAPIENDPOINTOUTPUT"]

logger = logging.getLogger(__name__)



def get_categories_under_project(project_id):
    query = """
        query ($project_id:String!) {
            listCategoriesUnderProject(project_id: $project_id) {
                category_id,
                name,
                rank
            }
        }
    """
    variables = {"project_id": project_id}
    response_data = run_graphql_query(query, variables)
    return response_data["listCategoriesUnderProject"]


def get_traits_under_category(category_id):
    query = """
        query ($category_id:String!) {
            listTraitsUnderCategory(category_id: $category_id) {
                name,
                rarity,
                bucket_url
            }
        }
    """
    variables = {"category_id": category_id}
    response_data = run_graphql_query(query, variables)
    return response_data["listTraitsUnderCategory"]


def create_new_collection(collection_id, project_id, bucket_url):
    mutation = """
        mutation ($collection_input:CreateCollectionInput!) {
            createCollections(collection_input: $collection_input) {
                Collections
            } 
        }  
    """

    variables = {"collection_input": {
        "collection_id": collection_id, "project_id": project_id, "bucket_url": bucket_url
        }
    }
    run_graphql_query(mutation, variables)


def run_graphql_query(query, variables):
    response = session.request(
        url=GRAPHQL_API_ENDPOINT,
        method='POST',
        json={'query': query, 'variables': variables}
    )
    json_response = json.loads(response.text)
    if "errors" in json_response.keys():
        errors = json_response["errors"]
        logger.error(f"Error with request: {errors}")
        raise Exception(f"GraphQL Request failure")
    else:
        return json_response["data"]
