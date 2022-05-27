import React from 'react';
import { Categories, setActiveIndex, useAppDispatch } from 'src/store';

const AdminNavigation = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <button onClick={() => dispatch(setActiveIndex(Categories.Occurrences))}>
        Gerichte
      </button>
      <button onClick={() => dispatch(setActiveIndex(Categories.Pictures))}>
        Bilder
      </button>
      <button onClick={() => dispatch(setActiveIndex(Categories.Comments))}>
        Kommentare
      </button>
    </>
  );
};

export default AdminNavigation;
