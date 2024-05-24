import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      _id
      email
      username
    }
  }
`;

export const SIGNUP = gql`
  mutation ($email: String!, $password: String!, $username: String!) {
    signUp(email: $email, password: $password, username: $username) {
      _id
      email
      username
    }
  }
`;

export const ADDTOFAVOURITE = gql`
  mutation ($favourite: String!) {
    addFavourite(favourite: $favourite) {
      _id
      favourite
      author {
        username
      }
    }
  }
`;

export const FUNDRAISER = gql`
  mutation ($description: String!, $goal: String!, $title: String) {
    fundRaiser(description: $description, goal: $goal, title: $title) {
      author {
        _id
        email
        username
      }
    }
  }
`;
