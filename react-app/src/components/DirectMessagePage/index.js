import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useParams, useHistory } from "react-router-dom";
import './ServerPage.css'
import UserInfo from '../UserInfo/index'
import * as activeReducer from '../../store/active';
import Channels from '../Channels/index';
import ChannelMessages from '../ChannelMessages/index';
import ServerUsers from '../ServerUsers/index';

const DirectMessages = () => {
  const user = useSelector(state => state.session.user);
  const { serverId } = useParams();
  const dispatch = useDispatch();
  const servers = useSelector(state => state.server.servers);
  const server = useSelector(state => state.active.server);
  const history = useHistory();

  useEffect(() => {
    dispatch(activeReducer.getActiveServer(serverId))
  }, [dispatch])

  if (!user) {
    return <Redirect to="/login" />;
  }

  if (Object.keys(server).length === 0) {
    history.push('/channels/@me')
  }

  return (
    <>
    
      {/* <Channels server={server}/>
      <ChannelMessages />
      <ServerUsers /> */}
    </>
  )
};

export default DirectMessages;
