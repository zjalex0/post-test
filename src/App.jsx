import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Home, Login } from '@pages';
import { startChecking } from './actions/auth';

const loading = (
  <div className="container-spinner">
    <div className="loader"></div>
  </div>
);

function App() {
  const dispatch = useDispatch();
  const { checking, uid } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (checking) {
    return loading;
  }
  return (
    <BrowserRouter>
      <Suspense fallback={loading}>
        <Routes>
          {uid ? (
            <>
              <Route path="/home" name="Home" element={<Home />} />
              <Route path="*" element={<Navigate replace to="/Home" />} />
            </>
          ) : (
            <>
              <Route path="/home" name="Home" element={<Home />} />
              <Route path="/login" name="Login" element={<Login />} />
              <Route path="*" element={<Navigate replace to="/Home" />} />
            </>
          )}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
