export type AmplifyDependentResourcesAttributes = {
    "api": {
        "CipherLaunchGQL": {
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    },
    "function": {
        "GenerateTokenCollection": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "GenerateTokenCollectionImages": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    },
    "auth": {
        "cognito8d64442b": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        }
    },
    "storage": {
        "CipherLaunchProjects": {
            "BucketName": "string",
            "Region": "string"
        }
    }
}