import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, BrowserRouter, Route, Switch } from "react-router-dom";
import DirectMessages from "../DirectMessages/Index";
import ServerSelection from '../ServerSelection/index';
import StageDiscovery from '../StageDiscovery/index';
import './HomePage.css'
import ProtectedRoute from "../auth/ProtectedRoute";
import ServerPage from '../ServerPage/index'
import * as activeReducer from '../../store/active';

const HomePage = () => {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();


  if (!user) {
    return <Redirect to="/login" />;
  }



  return (
    <div className='home__container'>
      <ProtectedRoute path='/'>
        <ServerSelection />
      </ProtectedRoute>
      <Switch>
        <ProtectedRoute path='/discovery'>
          <StageDiscovery />
        </ProtectedRoute>
        <ProtectedRoute path='/channels/:serverId/:channelId'>
          <ServerPage />
        </ProtectedRoute>
        <ProtectedRoute path='/channels/@me/:conversationId'>
          {/* <ServerPage /> */}
        </ProtectedRoute>
      </Switch>
    </div>
  )
};

export default HomePage;
