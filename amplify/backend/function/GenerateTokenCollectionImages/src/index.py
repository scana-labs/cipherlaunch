import json

from collection import Collection


def handler(event, context):
    collection_id = event["collection_id"]
    project_id = event["project_id"]
    num_of_tokens = event["num_of_tokens"]
    collection = Collection(collection_id, project_id, num_of_tokens)
    collection_with_images_generated = collection.generate_token_images()
    return {
      "statusCode": 200,
      "headers": {
        "Content-Type": "application/json"
      },
      "body": json.dumps(collection_with_images_generated)
    }
