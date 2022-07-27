import React, { useState } from 'react';

import { useMutation } from '@apollo/client';

import {
  GetAdminPanelDishesQuery,
  UpdateDishMutation,
  UpdateDishMutationVariables,
} from '../../graphql/graphql-types';
import { UPDATE_DISH } from '../../graphql/mutations';
import { GET_ADMIN_PANEL_DISHES } from '../../graphql/queries';

type ValueType = 'id' | 'nameDe' | 'nameEn';

const DishInput = ({
  dish,
  valueAttribute,
}: {
  dish: GetAdminPanelDishesQuery['dishes'][number];
  valueAttribute: ValueType;
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
      // TODO: Move to scss file
      style={{ width: '95%' }}
      onChange={(e) =>
        setCurrentDish({
          id: dish.id,
          nameDe: valueAttribute == 'nameDe' ? e.target.value : dish.nameDe,
          nameEn:
            valueAttribute == 'nameEn'
              ? e.target.value
              : dish.nameEn ?? '<NULL>',
        })
      }
      onKeyUp={(e) => {
        if (e.key == 'Enter') {
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

export default DishInput;
