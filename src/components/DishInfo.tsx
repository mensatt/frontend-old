import React from 'react';

import {
  useAppSelector,
  useAppDispatch,
  selectSelectedDish,
  getDishes,
} from '../store';

export const DishInfo = () => {
  const dish = useAppSelector(selectSelectedDish);
  const dispatch = useAppDispatch();

  return (
    <div>
      <button
        onClick={() =>
          dispatch(getDishes({ id: '2032eec9-1b3e-42aa-b0a0-7215b2e844b4' }))
        }
      >
        Get Seelachs
      </button>
      <button
        onClick={() =>
          dispatch(getDishes({ id: '903wee79-1b3e-32aa-c0a0-kek5b2e84439' }))
        }
      >
        Get Pommes
      </button>
      <p>
        {dish.id
          ? 'Selected Dish: ' + dish.name + 'has allergies:'
          : 'No dish selected'}
      </p>
      <ul>
        {dish.allergies.map((elem) => (
          <li key={elem.abbreviation}>{elem.abbreviation} </li>
        ))}
      </ul>
    </div>
  );
};
