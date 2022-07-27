import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { Link } from 'react-router-dom';
import { startLogin, startRegister } from '@actions';
import { useForm } from '@hooks';
import '@styles/_login.scss';

const clientId = '18277888745-d71l0utggqvrccskusdgui4nme3slogo.apps.googleusercontent.com';

export const Login = () => {
  const dispatch = useDispatch();
  const { loandingAuth } = useSelector((state) => state.auth);

  const [formLoginValues, handleLoginInputChange] = useForm({
    loginEmail: '',
    loginPassword: ''
    // loginEmail: 'roberto.vega@example.com',
    // loginPassword: '60d0fe4f5311236168a109cd'
  });

  const { loginEmail, loginPassword } = formLoginValues;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLogin(loginEmail, loginPassword));
  };

  const onSuccess = (res) => {
    if (!localStorage.getItem('token')) {
      const { googleId, email, givenName, familyName, imageUrl } = res.profileObj;
      dispatch(startRegister({ id: googleId, firstName: givenName, lastName: familyName, email, picture: imageUrl, google: true }));
    }
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
  };

  return (
    <div className="login-container">
      <div className="login-container-body">
        <div className="col-md-6 login-form-1">
          <h3 className="text-center">Ingreso</h3>
          <form onSubmit={handleLogin}>
            <div className="container">
              <label htmlFor="loginEmail">
                <b>Email</b>
              </label>
              <input type="text" placeholder="Enter Email" name="loginEmail" value={loginEmail} onChange={handleLoginInputChange} required />

              <label htmlFor="loginPassword">
                <b>Password</b>
              </label>
              <input type="password" placeholder="Enter Password" name="loginPassword" value={loginPassword} onChange={handleLoginInputChange} required />

              <button type="submit" className="success">
                Login
              </button>
              <GoogleLogin className="login-google" clientId={clientId} buttonText="Google" onSuccess={onSuccess} onFailure={onFailure} cookiePolicy={'single_host_origin'} style={{ marginTop: '100px' }} isSignedIn={true} />
              <Link to="/">
                <button type="submit" className="primary">
                  Home
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
      {loandingAuth && (
        <div className="container-spinner">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};
