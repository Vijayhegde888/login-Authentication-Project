import React,{useContext, useRef}from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const inputPasswordRef=useRef();
const {isLoggedIn,token}=useContext(AuthContext);
const history=useHistory()
console.log('isLoggedIn',isLoggedIn,token)
  const submitHandler=(e)=>{
    e.preventDefault();
    console.log('coming here---')
    const inputPasswordRefValue=inputPasswordRef.current.value;

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDQRiJZj1kyKAIYIMU_-WO8ejeEzIKpnhQ',{
      
        method:'POST',
        headers:{
          'Content-Type':"application/json"
        },
        body:JSON.stringify({
          idToken:token,
          password:inputPasswordRefValue,
          returnSecureToken:false
        })
  
      
    }).then(res =>{
      history.replace('/');
      return res.json();
    })


  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={inputPasswordRef} />
      </div>
      <div className={classes.action}>
        <button type='submit'>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
