import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import './UserInfo.css'
import { SettingsIcon } from '@chakra-ui/icons'
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react"

const UserInfo = () => {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();



  return (
    <div className='user_info__container'>
      <div className='user-pfp-name-container'>
        <div className='user-profile-picture-container'>
          <img className='user-profile-picture' src={user.profilePicture} />
        </div>
        <div className='user-username'>{user.username}</div>
      </div>
      <div className='user-setting-container'>
        <SettingsIcon className='user-settings-btn'/>
      </div>
    </div>
  )
};

export default UserInfo;
