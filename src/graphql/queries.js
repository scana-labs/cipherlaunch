/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCollection = /* GraphQL */ `
  query GetCollection($collection_id: String!) {
    getCollection(collection_id: $collection_id) {
      collection_id
      name
      project_id
      create_timestamp
    }
  }
`;
export const listCollections = /* GraphQL */ `
  query ListCollections {
    listCollections {
      collection_id
      name
      project_id
      create_timestamp
    }
  }
`;
export const listCollectionsUnderProject = /* GraphQL */ `
  query ListCollectionsUnderProject($project_id: String!) {
    listCollectionsUnderProject(project_id: $project_id) {
      collection_id
      name
      project_id
      create_timestamp
    }
  }
`;
export const getProject = /* GraphQL */ `
  query GetProject($project_id: String!) {
    getProject(project_id: $project_id) {
      project_id
      user_id
      name
      create_timestamp
    }
  }
`;
export const listProjects = /* GraphQL */ `
  query ListProjects {
    listProjects {
      project_id
      user_id
      name
      create_timestamp
    }
  }
`;
export const listProjectsUnderUser = /* GraphQL */ `
  query ListProjectsUnderUser($user_id: String!) {
    listProjectsUnderUser(user_id: $user_id) {
      project_id
      user_id
      name
      create_timestamp
    }
  }
`;
export const getTrait = /* GraphQL */ `
  query GetTrait($trait_id: String!) {
    getTrait(trait_id: $trait_id) {
      trait_id
      name
      rarity
      image_url
      project_id
      layer_id
    }
  }
`;
export const listTraits = /* GraphQL */ `
  query ListTraits {
    listTraits {
      trait_id
      name
      rarity
      image_url
      project_id
      layer_id
    }
  }
`;
export const listTraitsUnderLayer = /* GraphQL */ `
  query ListTraitsUnderLayer($layer_id: String!) {
    listTraitsUnderLayer(layer_id: $layer_id) {
      trait_id
      name
      rarity
      image_url
      project_id
      layer_id
    }
  }
`;
export const getLayer = /* GraphQL */ `
  query GetLayer($layer_id: String!) {
    getLayer(layer_id: $layer_id) {
      name
      project_id
      layer_id
      layer_order
    }
  }
`;
export const listLayers = /* GraphQL */ `
  query ListLayers {
    listLayers {
      name
      project_id
      layer_id
      layer_order
    }
  }
`;
export const listLayersUnderProject = /* GraphQL */ `
  query ListLayersUnderProject($project_id: String!) {
    listLayersUnderProject(project_id: $project_id) {
      name
      project_id
      layer_id
      layer_order
    }
  }
`;
