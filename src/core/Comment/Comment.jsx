import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import '@styles/_comment.scss';

export const Comment = ({ data }) => {
  const { message, publishDate, owner } = data;
  return (
    <div className="row display-flex mt-30">
      <div className="comment-header">
        <div className="comment-author--no-cover">
          <img className="comment-author-image" src={owner.picture} />
          <h3>{`${owner.firstName} ${owner.lastName}`} </h3>
          <h5 className="comment-published-date">{moment(publishDate).startOf('day').fromNow()}</h5>
        </div>
        <div className="comment-body">
          <div className="comment-summary">
            <p>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  data: PropTypes.object.isRequired
};
