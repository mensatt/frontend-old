import { gql } from '@apollo/client';

export const GET_ADMIN_PANEL_DISHES = gql`
  query getAdminPanelDishes {
    dishes {
      id
      nameDe
      nameEn
      aliases
    }
  }
`;
