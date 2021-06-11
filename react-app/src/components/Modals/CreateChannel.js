import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as serverReducer from '../../store/server';
import * as activeReducer from '../../store/active'
import { useDisclosure } from "@chakra-ui/react"
import { CloseIcon } from '@chakra-ui/icons'

const CreateChannel = ({setOpenCreateChannelModal}) => {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const server = useSelector(state => state.active.server);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [channelName, setChannelName] = useState('')
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')


  function handleCloseChannelCreate() {
    setOpenCreateChannelModal(false)
  }

  async function handleChannelCreate(e) {
    e.preventDefault()
    const newChannel = {
        name,
        description,
        server_id: server.id
    };




    const channel = await dispatch(serverReducer.createNewChannel(newChannel))
    dispatch(activeReducer.getActiveServer(server.id))
    setOpenCreateChannelModal(false)
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
                </div>
            </div>
            <div className='server-settings-content'>
                <form onSubmit={handleChannelCreate}>
                    <div className='overview-exit-container'>

                        <div className='server-settings-overview-title channel-over-title'>Create Channel</div>
                        <div onClick={handleCloseChannelCreate} className='nav-bar-server-icon close-server-settings'>
                            <CloseIcon onClick={handleCloseChannelCreate} />
                        </div>
                    </div>
                    <div className='server-picture-input-div'>
                        <div className='server-picture-input-title'>Channel Name</div>
                        <input onChange={(e) => setName(e.target.value)} className='server-picture-input' value={name}></input>
                    </div>
                    <div className='change-server-name-div'>
                        <div className='change-server-name-title'>Channel Description</div>
                        <input onChange={(e) => setDescription(e.target.value)} className='change-server-name-input' value={description}></input>
                    </div>
                    <button className='submit-server-changes' type='submit'>Create</button>
                </form>
            </div>
        </div>
        {/* <Modal
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
        </Modal> */}
    </>
  )
};

export default CreateChannel;
