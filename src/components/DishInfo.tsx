import React from 'react';

type Props = {
  name: string;
  id: string;
};

export const DishInfo = ({ id, name }: Props) => {
  // const dish = useAppSelector(selectSelectedDish);
  return (
    <div>
      <button
        onClick={
          () => {
            console.log('dummy');
          }
          // dispatch(getDishes({ id: '2032eec9-1b3e-42aa-b0a0-7215b2e844b4' }))
        }
      >
        Get Seelachs
      </button>
      <button
        onClick={
          () => {
            console.log('dummy');
          }
          // dispatch(getDishes({ id: '903wee79-1b3e-32aa-c0a0-kek5b2e84439' }))
        }
      >
        Get Pommes
      </button>
      <p>
        {id ? 'Selected Dish: ' + name + 'has allergies:' : 'No dish selected'}
      </p>
      <ul>
        {/* {allergies.map((elem) => (
          <li key={elem.abbreviation}>{elem.abbreviation} </li>
        ))} */}
      </ul>
    </div>
  );
};
