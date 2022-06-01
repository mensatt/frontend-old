import { gql } from '@apollo/client';

export const getToken = gql`
  query getToken($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;
