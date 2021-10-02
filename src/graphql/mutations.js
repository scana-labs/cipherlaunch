/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const deleteCategories = /* GraphQL */ `
  mutation DeleteCategories($category_id: String!) {
    deleteCategories(category_id: $category_id) {
      category_id
      name
      rank
      project_id
    }
  }
`;
export const createCategories = /* GraphQL */ `
  mutation CreateCategories($createCategoriesInput: CreateCategoriesInput!) {
    createCategories(createCategoriesInput: $createCategoriesInput) {
      category_id
      name
      rank
      project_id
    }
  }
`;
export const updateCategories = /* GraphQL */ `
  mutation UpdateCategories($updateCategoriesInput: UpdateCategoriesInput!) {
    updateCategories(updateCategoriesInput: $updateCategoriesInput) {
      category_id
      name
      rank
      project_id
    }
  }
`;
export const deleteCollections = /* GraphQL */ `
  mutation DeleteCollections($collection_id: String!) {
    deleteCollections(collection_id: $collection_id) {
      collection_id
      project_id
      bucket_url
    }
  }
`;
export const createCollections = /* GraphQL */ `
  mutation CreateCollections($createCollectionsInput: CreateCollectionsInput!) {
    createCollections(createCollectionsInput: $createCollectionsInput) {
      collection_id
      project_id
      bucket_url
    }
  }
`;
export const updateCollections = /* GraphQL */ `
  mutation UpdateCollections($updateCollectionsInput: UpdateCollectionsInput!) {
    updateCollections(updateCollectionsInput: $updateCollectionsInput) {
      collection_id
      project_id
      bucket_url
    }
  }
`;
export const deleteProjects = /* GraphQL */ `
  mutation DeleteProjects($project_id: String!) {
    deleteProjects(project_id: $project_id) {
      project_id
      user_id
      name
    }
  }
`;
export const createProjects = /* GraphQL */ `
  mutation CreateProjects($createProjectsInput: CreateProjectsInput!) {
    createProjects(createProjectsInput: $createProjectsInput) {
      project_id
      user_id
      name
    }
  }
`;
export const updateProjects = /* GraphQL */ `
  mutation UpdateProjects($updateProjectsInput: UpdateProjectsInput!) {
    updateProjects(updateProjectsInput: $updateProjectsInput) {
      project_id
      user_id
      name
    }
  }
`;
export const deleteTraits = /* GraphQL */ `
  mutation DeleteTraits($trait_id: String!) {
    deleteTraits(trait_id: $trait_id) {
      trait_id
      name
      rarity
      bucket_url
      category_id
      project_id
    }
  }
`;
export const createTraits = /* GraphQL */ `
  mutation CreateTraits($createTraitsInput: CreateTraitsInput!) {
    createTraits(createTraitsInput: $createTraitsInput) {
      trait_id
      name
      rarity
      bucket_url
      category_id
      project_id
    }
  }
`;
export const updateTraits = /* GraphQL */ `
  mutation UpdateTraits($updateTraitsInput: UpdateTraitsInput!) {
    updateTraits(updateTraitsInput: $updateTraitsInput) {
      trait_id
      name
      rarity
      bucket_url
      category_id
      project_id
    }
  }
`;
