import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import './ServerPage.css'

const ServerPage = () => {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();


  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <div className='channel-container'>
        <h1>channel</h1>
        <h1>channel</h1>
        <h1>channel</h1>
        <h1>channel</h1>
        <h1>channel</h1>
    </div>
  )
};

export default ServerPage;
