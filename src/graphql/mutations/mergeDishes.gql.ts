import { gql } from '@apollo/client';

export const MERGE_DISHES = gql`
  mutation mergeDishes($keep: UUID!, $merge: UUID!) {
    mergeDishes(input: { keep: $keep, merge: $merge }) {
      id
    }
  }
`;
