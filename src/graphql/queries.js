/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCategory = /* GraphQL */ `
  query GetCategory($category_id: String!) {
    getCategory(category_id: $category_id) {
      category_id
      name
      rank
      project_id
    }
  }
`;
export const listCategories = /* GraphQL */ `
  query ListCategories {
    listCategories {
      category_id
      name
      rank
      project_id
    }
  }
`;
export const listCategoriesUnderProject = /* GraphQL */ `
  query ListCategoriesUnderProject($project_id: String!) {
    listCategoriesUnderProject(project_id: $project_id) {
      category_id
      name
      rank
      project_id
    }
  }
`;
export const getCollection = /* GraphQL */ `
  query GetCollection($collection_id: String!) {
    getCollection(collection_id: $collection_id) {
      collection_id
      project_id
      bucket_url
      create_timestamp
    }
  }
`;
export const listCollections = /* GraphQL */ `
  query ListCollections {
    listCollections {
      collection_id
      project_id
      bucket_url
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
      bucket_url
      category_id
      project_id
    }
  }
`;
export const listTraits = /* GraphQL */ `
  query ListTraits {
    listTraits {
      trait_id
      name
      rarity
      bucket_url
      category_id
      project_id
    }
  }
`;
export const listTraitsUnderCategory = /* GraphQL */ `
  query ListTraitsUnderCategory($category_id: String!) {
    listTraitsUnderCategory(category_id: $category_id) {
      trait_id
      name
      rarity
      bucket_url
      category_id
      project_id
    }
  }
`;
export const listCategorys = /* GraphQL */ `
  query ListCategorys {
    listCategorys {
      category_id
      name
      rank
      project_id
    }
  }
`;
