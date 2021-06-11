import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as serverReducer from '../../store/server';
import * as activeReducer from '../../store/active'
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
    useDisclosure,
    useClipboard,
    Flex,
    Input,
    useEditable
} from "@chakra-ui/react"
import { CloseIcon } from '@chakra-ui/icons'

const ChannelSettings = ({setOpenEditChannelModal}) => {
  const user = useSelector(state => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const server = useSelector(state => state.active.server);
  const channel = useSelector(state => state.active.channel);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [channelName, setChannelName] = useState(channel.name)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)


  function handleOpenDeleteModal() {

    setOpenDeleteModal(true)
  }

  function handleDeleteCancel() {

    setOpenDeleteModal(false)
  }

  function handleCloseChannelSettings() {
    setOpenEditChannelModal(false)
  }

  async function handleChannelDelete() {
    await dispatch(serverReducer.deleteCurrentChannel(channel))
    dispatch(activeReducer.getActiveServer(server.id))
    setOpenEditChannelModal(false)
  }

  const handleChannelEdit = async (e) => {
    e.preventDefault()
    const channelEdits = {
        id: channel.id,
        name: channelName,
        serverId: server.id
    }
    const edited_channel = await dispatch(serverReducer.editCurrentChannel(channelEdits))
    const temp = await dispatch(activeReducer.setActiveChannel(edited_channel))
    dispatch(activeReducer.getActiveServer(server.id))
    setOpenEditChannelModal(false)
  }


  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <>
        <div className='server-settings-modal-container channel-settings-container'>
            <div className='server-settings-navigation-container'>
                <div className='server-settings-navigation'>
                    <div className='server-overview'>
                        Overview
                    </div>
                    <div onClick={handleOpenDeleteModal} className='server-delete'>
                        Delete Channel
                    </div>
                </div>
            </div>
            <div className='server-settings-content'>
                <form onSubmit={handleChannelEdit}>
                    <div className='overview-exit-container'>

                        <div className='server-settings-overview-title channel-over-title'>Channel Overview</div>
                        <div onClick={handleCloseChannelSettings} className='nav-bar-server-icon close-server-settings'>
                            <CloseIcon onClick={handleCloseChannelSettings} />
                        </div>
                    </div>
                    <div className='change-server-name-div'>
                        <div className='change-server-name-title'>Change Channel Name?</div>
                        <input onChange={(e) => setChannelName(e.target.value)} className='change-server-name-input' value={channelName}></input>
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
                <div className='server-settings-modal-container delete-server-container delete-channel-container'>
                    <div className='delete-server-confirmation-title'>
                        {`Delete '${channel.name}'`}
                    </div>
                    <span className='delete-span'>Are you sure you want to delete {channel.name}? This action cannot be undone.</span>
                    <div className='delete-server-actions'>
                        <button className='delete-server-btn' onClick={handleChannelDelete}>Delete Channel</button>
                        <button className='cancel-delete-server-btn' onClick={handleDeleteCancel}>Cancel</button>
                    </div>
                </div>
            </ModalContent>
        </Modal>
    </>
  )
};

export default ChannelSettings;
