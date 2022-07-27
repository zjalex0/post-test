import { types } from '@types';

const initialState = {
  userPost: {},
  commentsPost: [],
  postsHome: [],
  loandingPost: false,
  page: 0,
  tag: ''
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.postLoadedHome:
      return {
        ...state,
        loandingPost: false,
        postsHome: action.payload.page === 0 || action.payload.tag !== state.tag ? action.payload.data : [...state.postsHome, ...action.payload.data],
        page: action.payload.page,
        tag: action.payload.tag
      };
    case types.postLoadUserPost:
      return {
        ...state,
        loandingPost: false,
        userPost: action.payload
      };
    case types.postLoadComments:
      return {
        ...state,
        loandingPost: false,
        commentsPost: action.payload
      };
    case types.postLoadPostId:
      return {
        ...state,
        loandingPost: false,
        postsHome: state.postsHome.map((e) => (e.id === action.payload.id ? { ...e, textComplite: true, text: action.payload.text } : e))
      };
    case types.loandingPost:
      return {
        ...state,
        loandingPost: action.payload
      };
    default:
      return state;
  }
};
