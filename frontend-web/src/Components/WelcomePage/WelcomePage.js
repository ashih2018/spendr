import { useState } from 'react';
import * as React from "react";
import '../../styles/welcome.css';
import blob from '../../assets/blob.svg';
import threeCharacters from '../../assets/3characters.svg'
import RegistrationModal from './Registration';
import { useForm } from "react-hook-form";
import { login } from '../../reducers/loggedInReducer';
import { useDispatch } from 'react-redux';

function WelcomePage() {
  const [show, setShow] = useState(false);
  const [loginError, setLoginError] = useState("");

  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { register, handleSubmit } = useForm();

  async function onSubmit (data) {
    const result = await dispatch(login(data.username, data.password));
    if (result.err) {
      setLoginError(result.err);
    }
  }

  return (
    <div id={"welcomeBackground"}>
      <div id={"leftSide"}>
        <div id={"welcomeText"}>
          <h1 className="welcomeTitle">
            Welcome&nbsp;to<br/>Spendr
          </h1>
          <h3 className="welcomeSubTitle">
            Track your spendings <br/>
            Share your cops
          </h3>
        </div>
      </div>

      <div id={'rightSide'}>
        <div id={'loginCard'}>
          <form id={"loginForm"} onSubmit={handleSubmit(onSubmit)}>
            <input ref ={register} className="inputBox" type="text" name="username" placeholder={"Username"}/>
            <input ref ={register} className="inputBox" type="password" name="password" placeholder={"Password"}/>
            <p className={"redErrorText"}>{loginError}</p>
            <input className="inputBox" type={"submit"} id={"loginBtn"} value={"Log In"}/>
          </form>
          <button id={"openRegistrationModal"} onClick={handleShow}>Create New Account</button>
          <RegistrationModal handleClose = {handleClose} show = {show}/>
        </div>
      </div>

      <div id={'bottomArt'}>
        <img src={blob} id={'blob'} alt="Background blob"/>
        <img src={threeCharacters} id={'threeCharacters'} alt="Three people"/>
      </div>
    </div>
  );
}

export default WelcomePage;
