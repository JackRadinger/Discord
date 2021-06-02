import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import DirectMessages from "../DirectMessages/Index";
import ServerSelection from '../ServerSelection/index';
import StageDiscovery from '../StageDiscovery/index';
import UserInfo from '../UserInfo/index';
import './HomePage.css'

const HomePage = () => {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();


  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <div className='home__container'>
      <h1>Home</h1>
      <StageDiscovery />
      <ServerSelection />
      <DirectMessages />
      <UserInfo />
    </div>
  )
};

export default HomePage;
