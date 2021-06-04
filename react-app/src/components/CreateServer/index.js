import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import './CreateServer.css';
// import './ServerPage.css'

const CreateServer = () => {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updatePicture = (e) => {
    setPicture(e.target.value);
  };

  const onCreate = async (e) => {
    e.preventDefault();
    console.log(name)
    console.log(picture)
    // if (password === repeatPassword) {
    //   await dispatch(signUp(username, email, password));
    // }
  };

  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <>
        <div className='create-server-form-container'>
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
                        <h5 className='server-name-label'>Server Name</h5>
                        <input
                            className='server-name-input'
                            type="text"
                            name="server-name"
                            onChange={updateName}
                            value={name}
                        />
                    </div>
                    <div className='server-picture-input-wrapper'>
                        <h5 className='server-picture-label'>Picture Url</h5>
                        <input
                            className='server-picture-input'
                            type="text"
                            name="server-picture"
                            onChange={updatePicture}
                            value={picture}
                        />
                    </div>
                    <div className='create-server-btn-container'>
                        <button className='create-server-modal-exit'>Exit</button>
                        <button className='create-server-form-btn' type="submit">Create</button>
                    </div>
                </div>
            </form>
        </div>
    </>
  )
};

export default CreateServer;
