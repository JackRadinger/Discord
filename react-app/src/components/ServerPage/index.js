import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useParams, useHistory } from "react-router-dom";
import './ServerPage.css'
import UserInfo from '../UserInfo/index'
import * as activeReducer from '../../store/active';
import Channels from '../Channels/index';

const ServerPage = () => {
  const user = useSelector(state => state.session.user);
  const { serverId } = useParams();
  const dispatch = useDispatch();
  const servers = useSelector(state => state.server.servers);
  const server = useSelector(state => state.active.server);
  const history = useHistory();

  if (!user) {
    return <Redirect to="/login" />;
  }



  if (Object.keys(server).length === 0) {
    console.log('here')
    history.push('/channels/@me')
  }


  console.log(server)

  return (
    <>
      <Channels />
    </>
  )
};

export default ServerPage;
