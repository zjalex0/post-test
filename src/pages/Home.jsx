import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { NavBar, Modal, Comment, Card, UserInfo } from '@core';
import { postLoadComments, postStartLoanding, loadUserPost, postLoanding } from '@actions';

export const Home = () => {
  const dispatch = useDispatch();
  const { postsHome, page, tag, loandingPost, userPost, commentsPost } = useSelector((state) => state.post);
  const [pagePost, setPagePost] = useState(page);

  useEffect(() => {
    dispatch(postLoanding(true));
    dispatch(postStartLoanding(pagePost, tag));
  }, [dispatch, pagePost]);

  return (
    <>
      <NavBar />
      <div className="container-flex w-80 mc x-center y-center">
        {postsHome?.map((item) => (
          <Card key={uuidv4()} data={item} />
        ))}
      </div>
      <div className="row mt-20 mb-50 display-flex center">
        <button className="primary" onClick={() => setPagePost((e) => e + 1)}>
          LOAD MORE
        </button>
      </div>
      <Modal show={!!userPost?.id} onClose={() => dispatch(loadUserPost({}))}>
        <UserInfo data={userPost} />
      </Modal>
      <Modal show={!!commentsPost?.length} onClose={() => dispatch(postLoadComments([]))}>
        <h2>Comments</h2>
        {commentsPost?.map((item) => (
          <Comment key={uuidv4()} data={item} />
        ))}
      </Modal>
      {loandingPost && (
        <div className="container-spinner">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
};
