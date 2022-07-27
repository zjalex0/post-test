import { axiosApi } from '@axiosApi';
import { types } from '@types';

export const postStartLoanding = (page = 0, tag = '') => {
  return async (dispatch) => {
    try {
      const { data } = await axiosApi.get(`${tag !== '' ? `/tag/${tag}` : ''}/post?limit=8&page=${page}`);
      const newArray = data.data?.map(async (item) => {
        const { data } = await axiosApi.get(`/post/${item.id}/comment`);
        return { ...item, commentsData: data };
      });

      Promise.all(newArray).then((data) => {
        dispatch(postLoadeyHome({ data, page, tag }));
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const postLoadPostId = (id) => {
  return async (dispatch) => {
    const { data } = await axiosApi.get(`/post/${id}`);
    dispatch(loadPostId({ ...data }));
  };
};

export const postLoadUserId = (id) => {
  return async (dispatch) => {
    const { data } = await axiosApi.get(`/user/${id}`);
    dispatch(loadUserPost({ ...data }));
  };
};

const postLoadeyHome = (posts) => ({
  type: types.postLoadedHome,
  payload: posts
});

const loadPostId = (state) => ({
  type: types.postLoadPostId,
  payload: state
});

export const loadUserPost = (state) => ({
  type: types.postLoadUserPost,
  payload: state
});

export const postLoadComments = (comments) => ({
  type: types.postLoadComments,
  payload: comments
});

export const postLoanding = (state) => ({
  type: types.loandingPost,
  payload: state
});
