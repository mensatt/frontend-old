import React from "react";

import { useAppSelector, useAppDispatch } from "../store";

import { decrement, increment, selectCount } from "../store/actions/counter";

export const Counter = () => {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  return (
    <div>
      Counter: {count}
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
};
