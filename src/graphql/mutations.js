/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const deleteCollection = /* GraphQL */ `
  mutation DeleteCollection($collection_id: String!) {
    deleteCollection(collection_id: $collection_id) {
      collection_id
      images_generated
      name
      num_of_tokens
      project_id
      create_timestamp
    }
  }
`;
export const createCollection = /* GraphQL */ `
  mutation CreateCollection($createCollectionInput: CreateCollectionInput!) {
    createCollection(createCollectionInput: $createCollectionInput) {
      collection_id
      images_generated
      name
      num_of_tokens
      project_id
      create_timestamp
    }
  }
`;
export const updateCollection = /* GraphQL */ `
  mutation UpdateCollection($updateCollectionInput: UpdateCollectionInput!) {
    updateCollection(updateCollectionInput: $updateCollectionInput) {
      collection_id
      images_generated
      name
      num_of_tokens
      project_id
      create_timestamp
    }
  }
`;
export const deleteIncompatibility = /* GraphQL */ `
  mutation DeleteIncompatibility($incompatibility_id: String!) {
    deleteIncompatibility(incompatibility_id: $incompatibility_id) {
      trait_1_id
      trait_2_id
      project_id
      incompatibility_id
    }
  }
`;
export const createIncompatibility = /* GraphQL */ `
  mutation CreateIncompatibility(
    $createIncompatibilityInput: CreateIncompatibilityInput!
  ) {
    createIncompatibility(
      createIncompatibilityInput: $createIncompatibilityInput
    ) {
      trait_1_id
      trait_2_id
      project_id
      incompatibility_id
    }
  }
`;
export const updateIncompatibility = /* GraphQL */ `
  mutation UpdateIncompatibility(
    $updateIncompatibilityInput: UpdateIncompatibilityInput!
  ) {
    updateIncompatibility(
      updateIncompatibilityInput: $updateIncompatibilityInput
    ) {
      trait_1_id
      trait_2_id
      project_id
      incompatibility_id
    }
  }
`;
export const deleteProject = /* GraphQL */ `
  mutation DeleteProject($project_id: String!) {
    deleteProject(project_id: $project_id) {
      project_id
      user_id
      name
      create_timestamp
    }
  }
`;
export const createProject = /* GraphQL */ `
  mutation CreateProject($createProjectInput: CreateProjectInput!) {
    createProject(createProjectInput: $createProjectInput) {
      project_id
      user_id
      name
      create_timestamp
    }
  }
`;
export const updateProject = /* GraphQL */ `
  mutation UpdateProject($updateProjectInput: UpdateProjectInput!) {
    updateProject(updateProjectInput: $updateProjectInput) {
      project_id
      user_id
      name
      create_timestamp
    }
  }
`;
export const deleteTrait = /* GraphQL */ `
  mutation DeleteTrait($trait_id: String!) {
    deleteTrait(trait_id: $trait_id) {
      trait_id
      name
      rarity
      image_url
      project_id
      layer_id
    }
  }
`;
export const createTrait = /* GraphQL */ `
  mutation CreateTrait($createTraitInput: CreateTraitInput!) {
    createTrait(createTraitInput: $createTraitInput) {
      trait_id
      name
      rarity
      image_url
      project_id
      layer_id
    }
  }
`;
export const updateTrait = /* GraphQL */ `
  mutation UpdateTrait($updateTraitInput: UpdateTraitInput!) {
    updateTrait(updateTraitInput: $updateTraitInput) {
      trait_id
      name
      rarity
      image_url
      project_id
      layer_id
    }
  }
`;
export const deleteLayer = /* GraphQL */ `
  mutation DeleteLayer($layer_id: String!) {
    deleteLayer(layer_id: $layer_id) {
      name
      project_id
      layer_id
      layer_order
    }
  }
`;
export const createLayer = /* GraphQL */ `
  mutation CreateLayer($createLayerInput: CreateLayerInput!) {
    createLayer(createLayerInput: $createLayerInput) {
      name
      project_id
      layer_id
      layer_order
    }
  }
`;
export const updateLayer = /* GraphQL */ `
  mutation UpdateLayer($updateLayerInput: UpdateLayerInput!) {
    updateLayer(updateLayerInput: $updateLayerInput) {
      name
      project_id
      layer_id
      layer_order
    }
  }
`;
