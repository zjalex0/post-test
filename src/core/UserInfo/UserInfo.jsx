import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import '@styles/_userinfo.scss';

export const UserInfo = ({ data }) => {
  const { firstName, lastName, picture, dateOfBirth, phone, gender, title, email, location, registerDate, updatedDate } = data;
  return (
    <div className="row display-flex mt-10 w-100 center">
      <img className="userinfo-image" src={picture} />
      <div className="display-flex mt-30 w-100 center">
        <div className="row">
          <div className="userinfo mb-20">
            <h2>{`${firstName} ${lastName}`}</h2>
            <h4>{title}</h4>
          </div>
          <fieldset className="userinfo-fieldset">
            <legend>Personal information</legend>
            <div className="row display-flex">
              <div className="col-md-6">
                <strong className="userinfo-span">Gender: </strong> <span>{gender || '...'}</span>
              </div>
              <div className="col-md-6">
                <strong className="userinfo-span">Date of Birth: </strong> {moment(dateOfBirth).format('LL')}
              </div>
            </div>
            <div className="row mt-20 display-flex">
              <div className="col-md-6">
                <strong className="userinfo-span">Phone: </strong> {phone || '...'}
              </div>
              <div className="col-md-6">
                <strong className="userinfo-span">Email: </strong> {email}
              </div>
            </div>
            {location && (
              <div className="row mt-20 display-flex">
                <div className="col-md-12">
                  <strong className="userinfo-span">Location: </strong> {`${location?.country},  ${location?.state} ${location?.city} - ${location?.street}`}
                </div>
              </div>
            )}
            <div className="row mt-20 display-flex">
              <div className="col-md-6">
                <strong className="userinfo-span">Register date: </strong> {moment(registerDate).format('LL')}
              </div>
              <div className="col-md-6">
                <strong className="userinfo-span">Update date: </strong> {moment(updatedDate).format('LL')}
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

UserInfo.propTypes = {
  data: PropTypes.object.isRequired
};
