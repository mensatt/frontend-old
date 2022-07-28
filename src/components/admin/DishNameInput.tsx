import React, { useState } from 'react';

import { useMutation } from '@apollo/client';

import {
  GetAdminPanelDishesQuery,
  UpdateDishMutation,
  UpdateDishMutationVariables,
} from '../../graphql/graphql-types';
import { UPDATE_DISH } from '../../graphql/mutations';
import { GET_ADMIN_PANEL_DISHES } from '../../graphql/queries';

type DishValueType = GetAdminPanelDishesQuery['dishes'][number];

const DishNameInput = ({
  dish,
  valueAttribute,
}: {
  dish: DishValueType;
  valueAttribute: Exclude<keyof DishValueType, '__typename' | 'aliases'>;
}) => {
  const [currentDish, setCurrentDish] = useState({
    id: '',
    nameDe: '',
    nameEn: '',
  });

  const [updateDish, { loading: mutationLoading }] = useMutation<
    UpdateDishMutation,
    UpdateDishMutationVariables
  >(UPDATE_DISH, {
    refetchQueries: [
      {
        query: GET_ADMIN_PANEL_DISHES,
      },
    ],
  });

  return (
    <input
      type="text"
      disabled={mutationLoading}
      value={
        currentDish.id === dish.id
          ? currentDish[valueAttribute]
          : dish[valueAttribute] ?? '<NULL>'
      }
      onChange={(e) =>
        setCurrentDish({
          id: dish.id,
          nameDe: valueAttribute === 'nameDe' ? e.target.value : dish.nameDe,
          nameEn:
            valueAttribute === 'nameEn'
              ? e.target.value
              : dish.nameEn ?? '<NULL>',
        })
      }
      onKeyUp={(e) => {
        if (e.key === 'Enter') {
          updateDish({
            variables: {
              id: dish.id,
              nameDe: currentDish.nameDe,
              nameEn: currentDish.nameEn,
            },
          });
        }
      }}
    />
  );
};

export default DishNameInput;
