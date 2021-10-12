/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory {
    onCreateCategory {
      category_id
      name
      rank
      project_id
    }
  }
`;
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
      category_id
      project_id
    }
  }
`;
