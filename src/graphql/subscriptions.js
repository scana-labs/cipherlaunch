/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCollection = /* GraphQL */ `
  subscription OnCreateCollection {
    onCreateCollection {
      collection_id
      project_id
      bucket_url
      create_timestamp
    }
  }
`;
export const onCreateProject = /* GraphQL */ `
  subscription OnCreateProject {
    onCreateProject {
      project_id
      user_id
      name
      create_timestamp
    }
  }
`;
export const onCreateTrait = /* GraphQL */ `
  subscription OnCreateTrait {
    onCreateTrait {
      trait_id
      name
      rarity
      bucket_url
      project_id
      layer_id
    }
  }
`;
export const onCreateLayer = /* GraphQL */ `
  subscription OnCreateLayer {
    onCreateLayer {
      name
      project_id
      layer_id
      layer_order
    }
  }
`;
