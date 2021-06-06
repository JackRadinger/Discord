import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import './ServerSelection.css'
import * as serverReducer from '../../store/server';
import * as activeReducer from '../../store/active';
import UserInfo from '../UserInfo/index';
import discordLogo from '../SplashPage/imgs/Discord-Logo-Home.png'
import CreateServer from '../CreateServer/index';
import CreateServerModal from '../Modals/CreateServerModal'
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

  useEffect(() => {
    dispatch(serverReducer.getUserServers(user.id))
  },[])

  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = React.useRef()

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

  const onCreate = async (e) => {
    e.preventDefault();
    await dispatch(serverReducer.createNewServer( name, picture, user.id ))
  };

  async function handleServerClick(server) {
    setActive(server.id)
    await dispatch(activeReducer.setActivePage(server))
    history.push(`/channels/@me/${server.id}/${server.channels[0].id}`)
  }

  function handleHomeClick() {
    setActive('home')
    history.push(`/discovery`)
  }

  function handleCreateServerClick() {
    setActive('create')
    onOpen()
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
        <ModalContent className='create-server-form-container' width='400px' height='300px'>
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
                      className='server-picture-input'
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
              <button className='create-server-form-btn' type="submit">Create</button>
            </div>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
};

export default ServerSelection;
