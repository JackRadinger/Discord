import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import './UserInfo.css'

const UserInfo = () => {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();



  return (
    <div className='user_info__container'>
      <h1>Temp User</h1>
    </div>
  )
};

export default UserInfo;
