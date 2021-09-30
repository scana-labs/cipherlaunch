/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCategories = /* GraphQL */ `
  query GetCategories($category_id: String!) {
    getCategories(category_id: $category_id) {
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
export const getCollections = /* GraphQL */ `
  query GetCollections($collection_id: String!) {
    getCollections(collection_id: $collection_id) {
      collection_id
      project_id
      bucket_url
    }
  }
`;
export const listCollections = /* GraphQL */ `
  query ListCollections {
    listCollections {
      collection_id
      project_id
      bucket_url
    }
  }
`;
export const getProjects = /* GraphQL */ `
  query GetProjects($project_id: String!) {
    getProjects(project_id: $project_id) {
      project_id
      user_id
      name
    }
  }
`;
export const listProjects = /* GraphQL */ `
  query ListProjects {
    listProjects {
      project_id
      user_id
      name
    }
  }
`;
export const listProjectsUnderUser = /* GraphQL */ `
  query ListProjectsUnderUser($user_id: String!) {
    listProjectsUnderUser(user_id: $user_id) {
      project_id
      user_id
      name
    }
  }
`;
export const getTraits = /* GraphQL */ `
  query GetTraits($trait_id: String!) {
    getTraits(trait_id: $trait_id) {
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
export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
