import Link from 'next/link';
import React from 'react';

const AdminNavigation = () => {
  return (
    <div>
      <Link href={'/admin/'}>Overview</Link>
      <Link href={'/admin/occurrences'}>Occurrences</Link>
      <Link href={'/admin/dishes'}>Dishes</Link>
      <Link href={'/admin/reviews'}>Reviews</Link>
    </div>
  );
};

export default AdminNavigation;
