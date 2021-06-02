import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import './ServerSelection.css'
import * as serverReducer from '../../store/index'

const ServerSelection = () => {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();


  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <div className='server_selection__container'>
        <h1>Temp</h1>
        <h1>Temp</h1>
        <h1>Temp</h1>
        <h1>Temp</h1>
        <h1>Temp</h1>
    </div>
  )
};

export default ServerSelection;
