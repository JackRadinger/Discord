import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../store/session";
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/channels/@me" />;
  }

  return (
    <>
      <div className='login-page-wrapper'>
        <div className='login-form-wrapper'>
          <form className='login-form' onSubmit={onLogin}>
            <h3 className='login-title'>Welcome back!</h3>
            <div className='login-secondary-header'>We're so excited to see you again!</div>
            <div className='login-errors'>
              {errors.map((error) => (
                <div>{error}</div>
              ))}
            </div>
            <div className='form-input-fields'>
              <div className='login-email-input-wrapper'>
                <h5 className='login-email-label' htmlFor="email">Email</h5>
                <input
                  className='login-email-input'
                  name="email"
                  type="text"
                  value={email}
                  onChange={updateEmail}
                />
              </div>
              <div className='login-password-input-wrapper'>
                <h5 className='login-password-label' htmlFor="password">Password</h5>
                <input
                  className='login-password-input'
                  name="password"
                  type="password"
                  value={password}
                  onChange={updatePassword}
                />
              </div>
              <button className='login-form-btn' type="submit">Login</button>
              <div className='login-form-register'>
                <span className='login-form-register-span'>Need an account?</span>
                <button className='login-form-register-link' onClick={() => history.push('/sign-up')}>Register</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
