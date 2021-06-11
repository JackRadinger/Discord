import { useEditable } from "@chakra-ui/editable";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import './StageDiscovery.css'
import * as serverReducer from '../../store/server'

const StageDiscovery = () => {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const servers = useSelector(state => state.server.allServers)
  const userServers = useSelector(state => state.server.servers)

  useEffect(() => {
    dispatch(serverReducer.getServers())
  }, [dispatch, userServers])

  function handleNewServerClick(serverId) {
    dispatch(serverReducer.joinNewServer(serverId))
  }

  if(!servers) {
    return null
  }

  return (
    <div className='stage_discovery__container'>
      <div className='stage-title-container'>
        <div className='stage-title'>
          Stage Discovery
        </div>
      </div>
      <div className='stage-server-container'>
        {servers.map((server) => {
          return (
            <div key={server.id} className='stage-discovery-server'>
              <div className='server-picture-div'>
              {server.serverPicture ? <img className='stage-server-picture' src={server.serverPicture} alt={server.name[0].toUpperCase()}></img> : <div className='stage-server-picture-letter'>{server.name[0].toUpperCase()}</div>}
              </div>
              <div className='stage-server-name-btn-container'>
                <div className='stage-server-name'>{server.name}</div>
                <button onClick={() => handleNewServerClick(server.id)}className='server-join-btn'>Join</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
};

export default StageDiscovery;
