/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetDishInfo
// ====================================================

export interface GetDishInfo_dish_allergies {
  __typename: "Allergy";
  abbreviation: string;
}

export interface GetDishInfo_dish {
  __typename: "Dish";
  id: any;
  name: string;
  allergies: GetDishInfo_dish_allergies[];
}

export interface GetDishInfo {
  dish: GetDishInfo_dish | null;
}

export interface GetDishInfoVariables {
  id: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
