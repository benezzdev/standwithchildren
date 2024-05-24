import { gql } from "@apollo/client";

export const FAVOURITES = gql`
  query {
    favourites {
      _id
      createdAt
      favourite
      author {
        username
      }
    }
  }
`;

export const FUNDRAISERS = gql`
  query {
    fundraisers {
      _id
      createdAt
      fundraiser
      author {
        username
      }
    }
  }
`;
