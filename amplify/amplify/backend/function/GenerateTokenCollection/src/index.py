import boto3
import json
import os
import requests
from requests_aws4auth import AWS4Auth

session = requests.Session()
session.auth = AWS4Auth (
    os.environ("API_GETPROJECTDATA_GRAPHQLAPIIDOUTPUT"),
    os.environ("API_GETPROJECTDATA_GRAPHQLAPIKEYOUTPUT"),
    os.environ("REGION"),
    'appsync'
)
GETPROJECTDATA_API_ENDPOINT = os.environ("API_GETPROJECTDATA_GRAPHQLAPIENDPOINTOUTPUT")

s3_client = boto3.client("s3")

def getCategoriesUnderProject(project_id):
    query = """
        query ($project_id:String!) {
            listCategoriesUnderProject(project_id: $project_id) {
                category_id,
                rank
            }
        }
    """
    variables = {"project_id": project_id}
    response_data = run_getProjectData_query(query, variables)
    return response_data["listCategoriesUnderProject"]

def getTraitsUnderCategory(category_id):
    query = """
        query ($category_id:String!) {
            listTraitsUnderCategory(category_id: category_id) {
                name,
                rarity,
                bucket_url
            }
        }
    """
    variables = {"category_id": category_id}
    response_data = run_getProjectData_query(query, variables)
    return response_data["listTraitsUnderCategory"]


def run_getProjectData_query(query, variables):
    response = session.request(
        url = GETPROJECTDATA_API_ENDPOINT,
        method = 'POST',
        json={'query': query, 'variables': variables}
    )
    json_response = json.loads(response.json)
    if "errors" in json_response.keys():
        errors = json_response["errors"]
        raise Exception (f"Error with request: {errors}")
    else:
        return json_response["data"]

def handler(event, context):
    pass