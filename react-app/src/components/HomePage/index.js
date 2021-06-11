import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, BrowserRouter, Route, Switch } from "react-router-dom";
import ServerSelection from '../ServerSelection/index';
import StageDiscovery from '../StageDiscovery/index';
import './HomePage.css'
import ProtectedRoute from "../auth/ProtectedRoute";
import ServerPage from '../ServerPage/index'
import * as serverReducer from '../../store/server';
import UserDMs from '../UserDMs/index';
import DirectMessages from '../DirectMessagePage/index';

const HomePage = () => {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(serverReducer.getUserServers(user.id))
  },[])

  if (!user) {
    return <Redirect to="/login" />;
  }



  return (
    <div className='home__container'>
      <ProtectedRoute path='/'>
        <ServerSelection />
      </ProtectedRoute>
      <Switch>
        <ProtectedRoute path='/channels/@me/' exact={true}>
          <UserDMs />
          <StageDiscovery />
        </ProtectedRoute>
        <ProtectedRoute path='/channels/@me/:convoId' >
          <UserDMs />
          <DirectMessages />
        </ProtectedRoute>
        <ProtectedRoute path='/channels/:serverId/:channelId'>
          <ServerPage />
        </ProtectedRoute>
      </Switch>
    </div>
  )
};

export default HomePage;
