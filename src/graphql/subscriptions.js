/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCollection = /* GraphQL */ `
  subscription OnCreateCollection {
    onCreateCollection {
      collection_id
      images_generated
      name
      num_of_tokens
      project_id
      create_timestamp
    }
  }
`;
export const onCreateIncompatibility = /* GraphQL */ `
  subscription OnCreateIncompatibility {
    onCreateIncompatibility {
      trait_1_id
      trait_2_id
      project_id
      incompatibility_id
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
      image_url
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
