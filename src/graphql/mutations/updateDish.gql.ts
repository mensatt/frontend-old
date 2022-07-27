import { gql } from '@apollo/client';

export const UPDATE_DISH = gql`
  mutation updateDish($id: UUID!, $nameDe: String, $nameEn: String) {
    updateDish(input: { id: $id, nameDe: $nameDe, nameEn: $nameEn }) {
      id
      nameDe
      nameEn
      aliases
    }
  }
`;
