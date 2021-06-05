import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import './ServerSelection.css'
import * as serverReducer from '../../store/server';
import UserInfo from '../UserInfo/index';
import discordLogo from '../SplashPage/imgs/Discord-Logo-Home.png'
import CreateServer from '../CreateServer/index';
import Modal from 'react-modal';

const ServerSelection = () => {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const servers = useSelector(state => state.server.servers);
  const history = useHistory();
  const [active, setActive] = useState('')
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(serverReducer.getUserServers(user.id))
  },[])


  if (!user) {
    return <Redirect to="/login" />;
  }


  if(!servers.length) {
    return null
  }

  function handleServerClick(serverId) {
    setActive(serverId)
    history.push(`/channels/@me/${serverId}`)
  }

  function handleHomeClick() {
    setActive('home')
    history.push(`/discovery`)
  }

  function handleCreateServerClick() {
    setActive('create')
    setOpenModal(true)
  }

  return (
    <>
      <div className='server_selection__container'>
        <div className='home-btn-wrapper'>
          <div onClick={() => handleHomeClick()} className={`discord-logo-home-div ${'home' === active ? 'active': ''}`}>
            <img className='discord-logo-home' src={discordLogo} alt='discord logo' />
          </div>
        </div>
        {servers.map((server) => {
          return (
            <div key={server.id} className={`nav-bar-server-icon ${server.id === active ? 'active': ''}`} onClick={() => handleServerClick(server.id)}>
              {server.serverPicture ? <img className='server-picture' src={server.serverPicture} alt={server.name[0].toUpperCase()}></img> : <div>{server.name[0].toUpperCase()}</div>}
            </div>
          )
        })}
        <div onClick={() => handleCreateServerClick()} className={`create-server-div ${'create' === active ? 'create-active': ''}`}>
            +
        </div>
      </div>
      {openModal &&
        <>
          <div className='modal-container'>
            <CreateServer setOpenModal={setOpenModal}/>
          </div>
        </>}
    </>
  )
};

export default ServerSelection;
