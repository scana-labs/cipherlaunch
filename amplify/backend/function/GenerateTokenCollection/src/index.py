from collection import Collection


def handler(event, context):
    project_id = event["project_id"]
    num_tokens = event["num_tokens"]

    collection = Collection(project_id)
    collection.generate_tokens(num_tokens)

