import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { postLoadUserId, postLoadComments, postStartLoanding, postLoanding, postLoadPostId } from '@actions';
import '@styles/_card.scss';

export const Card = ({ data }) => {
  const dispatch = useDispatch();
  const { page } = useSelector((state) => state.post);

  const { id, owner, text, tags, publishDate, image, likes, commentsData, textComplite } = data;

  const handlerClickUserPost = (userId) => {
    dispatch(postLoanding(true));
    dispatch(postLoadUserId(userId));
  };

  const handlerClickComments = (comments) => {
    dispatch(postLoadComments(comments));
  };

  return (
    <>
      <div className="blog-container">
        <div className="blog-header">
          <div
            className="blog-author--no-cover cursor-pointer"
            onClick={() => {
              handlerClickUserPost(owner.id);
            }}>
            <img className="blog-author-image" src={owner.picture} />
            <h3>{`${owner.firstName} ${owner.lastName}`} </h3>
          </div>
        </div>

        <div className="blog-body">
          <img className="post-image" src={image} />
          <div className="blog-title">
            <h1>{owner.title}</h1>
          </div>
          <div className="blog-summary">
            <p>
              {text} {text.length >= 53 && !textComplite && <a onClick={() => dispatch(postLoadPostId(id))}>view more</a>}
            </p>
          </div>
          <div className="blog-tags">
            <ul>
              {tags?.map((item) => (
                <li key={uuidv4()}>
                  <a
                    onClick={() => {
                      dispatch(postLoanding(true));
                      dispatch(postStartLoanding(page, item));
                    }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="blog-footer">
          <ul>
            <li className="published-date">{moment(publishDate).format('llll')}</li>
            <li className="comments cursor-pointer">
              <div className="ico-likes"></div>
              <h3 className="numero">{likes}</h3>
            </li>
            <li
              className={commentsData.total > 0 ? 'cursor-pointer' : ''}
              onClick={() => {
                handlerClickComments(commentsData.data);
              }}>
              <div className="ico-comments"></div>
              <h3 className="numero">{commentsData.total}</h3>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

Card.propTypes = {
  data: PropTypes.object.isRequired
};
