import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { Redirect, useHistory } from "react-router-dom";
import { signUp } from '../../store/session';
import './SignUp.css';

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      await dispatch(signUp(username, email, password));
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/channels/@me" />;
  }

  return (
    <>
    <div className='login-page-wrapper'>
      <div className='login-form-wrapper'>
        <form className='login-form' onSubmit={onSignUp}>
          <h3 className='login-title'>Come join us!</h3>
          <div className='login-secondary-header'>We'd love to have you!</div>
          <div className='form-input-fields'>
            <div className='login-email-input-wrapper'>
              <h5 className='login-email-label'>Username</h5>
              <input
                className='login-email-input'
                type="text"
                name="username"
                onChange={updateUsername}
                value={username}
              />
            </div>
            <div className='login-email-input-wrapper'>
              <h5 className='login-email-label'>Email</h5>
              <input
                className='login-email-input'
                type="text"
                name="email"
                onChange={updateEmail}
                value={email}
              />
            </div>
            <div className='login-email-input-wrapper'>
              <h5 className='login-email-label'>Password</h5>
              <input
                className='login-email-input'
                type="password"
                name="password"
                onChange={updatePassword}
                value={password}
              />
            </div>
            <div className='login-password-input-wrapper'>
              <h5 className='login-email-label'>Repeat Password</h5>
              <input
                className='login-password-input'
                type="password"
                name="repeat_password"
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
              />
            </div>
            <button className='login-form-btn' type="submit">Sign Up</button>
            <div className='login-form-register'>
                <span className='login-form-register-span'>Already have an account?</span>
                <button className='login-form-register-link' onClick={() => history.push('/login')}>Log In</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default SignUpForm;
