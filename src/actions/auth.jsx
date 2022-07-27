// import Swal from 'sweetalert2';
import { axiosApi } from '@axiosApi';
import { types } from '../types/types';

export const startLogin = (email, id) => {
  return async (dispatch) => {
    const { data } = await axiosApi.get(`/user/${id}`);
    localStorage.setItem('token', data.id);
    localStorage.setItem('token-init-date', new Date().getTime());
    if (email === data.email) {
      dispatch(login({ data, uid: data.id, id: data.id }));
    }
  };
};

export const startRegister = (user) => {
  return async (dispatch) => {
    try {
      if (user.google) {
        const { data } = await axiosApi.post(`/user/create`, user);
        dispatch(login({ data, uid: data.id, id: data.id }));
      }
    } catch (error) {
      dispatch(authLoanding(true));
      const newArray = await getUserAllData();
      Promise.all(
        newArray.map(async (item) => {
          const { data } = await axiosApi.get(`/user/${item.id}`);
          return data;
        })
      ).then((data) => {
        localStorage.clear();
        const [userFilter] = data.filter((e) => e.email === user.email);
        localStorage.setItem('token', userFilter.id);
        localStorage.setItem('token-init-date', new Date().getTime());
        dispatch(login({ data: userFilter, uid: userFilter.id, id: userFilter.id, google: true }));
      });
    }
  };
};

const getUserAllData = async (page = 0, array = []) => {
  const { data: result } = await axiosApi.get(`/user?page=${page}`);
  if (result.data?.length > 0) {
    const newArray = await getUserAllData(result.page + 1, result.data);
    array = [...array, ...newArray];
  }
  return array;
};

export const startChecking = () => {
  return async (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) return dispatch(logout());
    try {
      const { data } = await axiosApi.get(`/user/${token}`);
      localStorage.setItem('token', data.id);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(login({ data, uid: data.id, id: data.id }));
    } catch (error) {
      localStorage.clear();
      dispatch(logout());
    }
  };
};

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logout());
  };
};

const login = (user) => ({
  type: types.authLogin,
  payload: user
});

const logout = () => ({
  type: types.authLogout
});

export const finishRegister = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(registerOnOff(false));
  };
};

const registerOnOff = (state) => ({
  type: types.authRegistered,
  payload: state
});

export const removeUserPost = (state) => ({
  type: types.authRemoveUserPost,
  payload: state
});

export const authLoanding = (state) => ({
  type: types.loandingAuth,
  payload: state
});
