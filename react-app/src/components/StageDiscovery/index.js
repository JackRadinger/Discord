import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import './StageDiscovery.css'

const StageDiscovery = () => {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();



  return (
    <div className='stage_discovery__container'>
      <h1>Temp Server</h1>
      <h1>Temp Server</h1>
      <h1>Temp Server</h1>
      <h1>Temp Server</h1>
      <h1>Temp Server</h1>
    </div>
  )
};

export default StageDiscovery;
