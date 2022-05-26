import React from 'react';
import { useAppDispatch } from 'src/store';
import { Categories, setActiveIndex } from 'src/store/actions/admin-nav';

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
