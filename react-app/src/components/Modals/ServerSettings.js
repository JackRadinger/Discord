import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as serverReducer from '../../store/server';
import * as activeReducer from '../../store/active'
import {
    Modal,
    ModalContent,
    useDisclosure,
} from "@chakra-ui/react"
import { CloseIcon } from '@chakra-ui/icons'

const ServerSettings = ({setOpenServerSettingsModal}) => {
  const user = useSelector(state => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const server = useSelector(state => state.active.server);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [serverName, setServerName] = useState(server.name)
  const [serverImage, setServerImage] = useState(server.serverPicture)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)


  function handleOpenDeleteModal() {

    setOpenDeleteModal(true)
  }

  function handleDeleteCancel() {

    setOpenDeleteModal(false)
  }

  function handleCloseServerSettings() {
    setOpenServerSettingsModal(false)
  }

  async function handleDelete() {
    await dispatch(serverReducer.deleteCurrentServer(server))
    dispatch(serverReducer.getUserServers(user.id))
    setOpenDeleteModal(false)
    history.push('/channels/@me')
  }

  const handleEdit = async (e) => {
    e.preventDefault()
    const serverEdits = {
        id: server.id,
        name: serverName,
        serverPicture: serverImage
    }
    const edited_server = await dispatch(serverReducer.editCurrentServer(serverEdits))
    dispatch(activeReducer.getActiveServer(edited_server.id))
    setOpenServerSettingsModal(false)
  }


  if (!user) {
    return <Redirect to="/login" />;
  }



  return (
    <>
        <div className='server-settings-modal-container'>
            <div className='server-settings-navigation-container'>
                <div className='server-settings-navigation'>
                    <div className='server-overview'>
                        Overview
                    </div>
                    <div onClick={handleOpenDeleteModal} className='server-delete'>
                        Delete Server
                    </div>
                </div>
            </div>
            <div className='server-settings-content'>
                <div onClick={handleCloseServerSettings} className='nav-bar-server-icon close-server-settings'>
                    <CloseIcon onClick={handleCloseServerSettings} />
                </div>
                <form onSubmit={handleEdit}>
                    <div className='server-settings-overview-title'>Server Overview</div>
                    <div className='nav-bar-server-icon'>
                        {server.serverPicture ? <img className='server-picture' src={server.serverPicture}/> : <div>{server.name[0].toUpperCase()}</div>}
                    </div>
                    <div className='server-picture-input-div'>
                        <div className='server-picture-input-title'>Change Picture?</div>
                        <input onChange={(e) => setServerImage(e.target.value)} className='server-picture-input' placeholder='URL'></input>
                    </div>
                    <div className='change-server-name-div'>
                        <div className='change-server-name-title'>Change Server Name?</div>
                        <input onChange={(e) => setServerName(e.target.value)} className='change-server-name-input' value={serverName}></input>
                    </div>
                    <button className='submit-server-changes' type='submit'>Edit</button>
                </form>
            </div>
        </div>
        <Modal
        isOpen={openDeleteModal}
        onClose={onClose}
        >
            <ModalContent>
                <div className='server-settings-modal-container delete-server-container'>
                    <div className='delete-server-confirmation-title'>
                        {`Delete '${server.name}'`}
                    </div>
                    <span className='delete-span'>Are you sure you want to delete {server.name}? This action cannot be undone.</span>
                    <div className='delete-server-actions'>
                        <button className='delete-server-btn' onClick={handleDelete}>Delete Server</button>
                        <button className='cancel-delete-server-btn' onClick={handleDeleteCancel}>Cancel</button>
                    </div>
                </div>
            </ModalContent>
        </Modal>
    </>
  )
};

export default ServerSettings;
