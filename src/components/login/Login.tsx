import React, { useState } from 'react';
import { login, useAppDispatch } from 'src/store';

export default function Login() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <>
      <input
        onChange={(event) => setEmail(event.target.value)}
        value={email}
        placeholder="E-Mail"
      />
      <input
        onChange={(event) => setPassword(event.target.value)}
        value={password}
        type="password"
        placeholder="Password"
      />
      <button
        onClick={() => {
          setEmail('');
          setPassword('');
          dispatch(login({ email: email, password: password }));
        }}
      >
        Log in
      </button>
    </>
  );
}
