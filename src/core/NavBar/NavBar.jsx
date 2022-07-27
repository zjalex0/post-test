import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleLogout } from 'react-google-login';
import { useForm } from '@hooks';
import { postStartLoanding, postLoanding, loadUserPost, startLogout } from '@actions';
import '@styles/_navbar.scss';

const clientId = '18277888745-d71l0utggqvrccskusdgui4nme3slogo.apps.googleusercontent.com';

export const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { uid, data, google } = useSelector((state) => state.auth);
  const { page, tag } = useSelector((state) => state.post);

  const [{ search }, handleInputChange, , setValues] = useForm({ search: tag });

  const handlerClickSearch = () => {
    dispatch(postLoanding(true));
    dispatch(postStartLoanding(page, search));
  };

  useEffect(() => {
    setValues({ search: tag });
  }, [tag, setValues]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-header">
          <Link to="/">
            <h4>
              Post-<span>Test</span>
            </h4>
          </Link>
        </div>
        <div className="search-container">
          <input type="text" placeholder="Search tags.." name="search" value={search} onChange={handleInputChange} />
          <button className="primary" type="button" onClick={handlerClickSearch}>
            <i> Search</i>
          </button>
        </div>
        <div className="navbar-menu" id="open-navbar1">
          <ul className="navbar-nav">
            {uid ? (
              <li className="navbar-dropdown">
                <div className="dropdown-toggler">
                  <span>{`${data?.firstName} ${data?.lastName}`}</span>
                  <img className="blog-author-image" src={data?.picture} />
                </div>
                <ul className="dropdown">
                  <li
                    className="cursor-pointer"
                    onClick={() => {
                      dispatch(loadUserPost(data));
                    }}>
                    <a>view profile</a>
                  </li>
                  <li className="separator"></li>
                  {google ? (
                    <GoogleLogout
                      className="nav-btnGoogleLogout"
                      clientId={clientId}
                      onLogoutSuccess={() => {
                        dispatch(startLogout());
                        navigate('/login');
                      }}>
                      Logout
                    </GoogleLogout>
                  ) : (
                    <li
                      className="cursor-pointer"
                      onClick={() => {
                        dispatch(startLogout());
                        navigate('/login');
                      }}>
                      <a className="text-center">Logout</a>
                    </li>
                  )}
                </ul>
              </li>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
