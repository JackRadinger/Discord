import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import './ServerSelection.css'
import * as serverReducer from '../../store/server';
import * as activeReducer from '../../store/active';
import UserInfo from '../UserInfo/index';
import discordLogo from '../SplashPage/imgs/Discord-Logo-Home.png'
import CreateServer from '../CreateServer/index';
import {
  Modal,
  Button,
  Lorem,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from "@chakra-ui/react"
import '../CreateServer/CreateServer.css'

const ServerSelection = () => {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const servers = useSelector(state => state.server.servers);
  const history = useHistory();
  const [active, setActive] = useState('')
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [invite, setInvite] = useState("");

  useEffect(() => {
    dispatch(serverReducer.getUserServers(user.id))
  },[])

  const { isOpen, onOpen, onClose } = useDisclosure()

  if (!user) {
    return <Redirect to="/login" />;
  }


  if(!servers.length) {
    return null
  }

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updatePicture = (e) => {
    setPicture(e.target.value);
  };

  const updateInvite = (e) => {
    setInvite(e.target.value);
  };

  const onCreate = async (e) => {
    e.preventDefault();
    await dispatch(serverReducer.createNewServer( name, picture, user.id ))
    setActive('')
  };

  async function handleServerClick(server) {
    setActive(server.id)
    dispatch(activeReducer.setActivePage(server))
    dispatch(activeReducer.setActiveChannel(server.channels[0]))
    history.push(`/channels/${server.id}/${server.channels[0].id}`)

  }

  function handleHomeClick() {
    setActive('home')
    history.push(`/channels/@me`)
  }

  function handleCreateServerClick() {
    setActive('create')
    onOpen()
    setOpenModal(true)
  }

  function handleInvite(e) {
    e.preventDefault()
    let serverId = invite.slice(7)
    dispatch(serverReducer.joinNewServer(serverId))
    onClose()
    setActive('')
    setInvite('')
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
            <div key={server.id} className={`nav-bar-server-icon ${server.id === active ? 'active': ''}`} onClick={() => handleServerClick(server)}>
              {server.serverPicture ? <img className='server-picture' src={server.serverPicture} alt={server.name[0].toUpperCase()}></img> : <div>{server.name[0].toUpperCase()}</div>}
            </div>
          )
        })}
        <div onClick={() => handleCreateServerClick()} className={`create-server-div ${'create' === active ? 'create-active': ''}`}>
            +
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent className='create-server-form-container' width='400px' height='400px'>
          <form className='create-server-form' onSubmit={onCreate}>
            <div className='create-title-container'>
              <h3 className='create-title'>Customize Your Server</h3>
            </div>
            <div className='sub-create-title-div'>
              <div className='sub-create-title'>Give your new server a personality with a name and an icon.</div>
              <div className='sub-create-title-2'>You can always change it later.</div>
            </div>
            <div className='create-form-input-fields'>
              <div className='server-name-input-wrapper'>
                  <h5 className='server-name-label'>SERVER NAME</h5>
                  <input
                      className='server-name-input'
                      type="text"
                      name="server-name"
                      onChange={updateName}
                      value={name}
                      required
                  />
              </div>
              <div className='server-picture-input-wrapper'>
                  <h5 className='server-picture-label'>PICTURE URL</h5>
                  <input
                      className='server-name-input invite-link'
                      type="text"
                      name="server-picture"
                      onChange={updatePicture}
                      value={picture}
                  />
              </div>
            </div>
            <div className='create-server-btn-container'>
              <Button className='create-server-modal-exit'  onClick={onClose}>
                  Back
              </Button>
              <button className='create-server-form-btn' type="submit" onClick={onClose}>Create</button>


            </div>
            <div className='server-picture-input-wrapper'>
                  <h5 className='server-picture-label'>INVITE LINK</h5>
                  <input
                      className='server-name-input invite-link'
                      type="text"
                      name="server-picture"
                      onChange={updateInvite}
                      value={invite}
                  />
                  <button className='create-server-form-btn' onClick={(e) => handleInvite(e)}>Join</button>
              </div>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
};

export default ServerSelection;
