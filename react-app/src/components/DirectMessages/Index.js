import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import './DirectMessage.css'

const DirectMessages = () => {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();


  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <div className='direct_message__container'>
        <h1>TempDM</h1>
        <h1>TempDM</h1>
        <h1>TempDM</h1>
        <h1>TempDM</h1>
        <h1>TempDM</h1>
    </div>
  )
};

export default DirectMessages;
