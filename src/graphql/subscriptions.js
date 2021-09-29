/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCategories = /* GraphQL */ `
  subscription OnCreateCategories {
    onCreateCategories {
      category_id
      name
      rank
      project_id
    }
  }
`;
export const onCreateCollections = /* GraphQL */ `
  subscription OnCreateCollections {
    onCreateCollections {
      collection_id
      project_id
      bucket_url
    }
  }
`;
export const onCreateProjects = /* GraphQL */ `
  subscription OnCreateProjects {
    onCreateProjects {
      project_id
      user_id
      name
    }
  }
`;
export const onCreateTraits = /* GraphQL */ `
  subscription OnCreateTraits {
    onCreateTraits {
      trait_id
      name
      rarity
      bucket_url
      category_id
      project_id
    }
  }
`;
export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo {
    onCreateTodo {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo {
    onUpdateTodo {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo {
    onDeleteTodo {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
