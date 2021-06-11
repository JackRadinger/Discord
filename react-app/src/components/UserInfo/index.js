import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import './UserInfo.css'
import { SettingsIcon } from '@chakra-ui/icons'
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react"
import LogoutButton from '../auth/LogoutButton';
import { editProfilePicture } from "../../store/session";

const UserInfo = () => {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [settings, openSettings] = useState(false)
  const [picture, setPicture] = useState('')
  const userId = user.id

  async function handleSettingsClick() {
    dispatch(editProfilePicture(picture, userId))
    openSettings(false)
  }

  return (
    <>
      {settings &&
      <div className='user-settings-container'>
        <div className='user-pfp-name-container'>
          <div className='user-settings-profile-picture-container'>
            <img className='user-settings-profile-picture' src={user.profilePicture} />
          </div>
        </div>
        <div className='user-username'>{user.username}</div>
        <div>
          <h5>
            Change Profile Picture
          </h5>
          <input
          className='change-profile-picture-input'
          value={picture}
          onChange={(e) => setPicture(e.target.value)}
          placeholder={user.profilePicture}
          >
          </input>
          <button className='submit-pfp-change-btn' onClick={handleSettingsClick}>Submit</button>
        </div>
        <LogoutButton className='logout-btn'/>
      </div>
      }
      <div className='user_info__container'>
        <div className='user-pfp-name-container'>
          <div className='user-profile-picture-container'>
            <img className='user-profile-picture' src={user.profilePicture} />
          </div>
          <div className='user-username'>{user.username}</div>
        </div>
        <div className='user-setting-container'>
          <SettingsIcon className='user-settings-btn' onClick={() => openSettings(settings ? false : true)}/>
        </div>
      </div>
    </>
  )
};

export default UserInfo;
