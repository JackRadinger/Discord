import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
// import './CreateServer.css';
import * as serverReducer from '../../store/server'
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

const ServerInvite = ({setOpenInviteModal, hasCopied, setHasCopied}) => {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const server = useSelector(state => state.active.server);
  // const [value, setValue] = React.useState("Hello world")
  // const { hasCopied, onCopy } = useClipboard(server.invite_url)

  function handleClose(e) {

    setOpenInviteModal(false)
  }

  const { isOpen, onOpen, onClose } = useDisclosure()

  if (!user) {
    return <Redirect to="/login" />;
  }

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(server.invite_url)
    setOpenInviteModal(false)
  }

  return (
    <>
      <div className='create-invite-container invite'>
       <div className='create-title-container'>
          <h3 className='create-invite-title'>{`INVITE FRIENDS TO ${server.name.toUpperCase()}`}</h3>
          <CloseIcon onClick={handleClose} className='server-settings-icon' w={16} h={16}/>
        </div>
        <div className='server-invite-container'>
          <Input className='invite-url' value={server.invite_url} isReadOnly />
          <button className='copy-invite-button' onClick={() => copyToClipBoard()} >
            {hasCopied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

    </>
  )
};

export default ServerInvite;
