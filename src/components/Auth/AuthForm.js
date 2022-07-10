import { useState, useRef,useContext} from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const[isLoading,setIsloading]=useState(false);
  const authCtx=useContext(AuthContext);
  const history=useHistory()
  const {isLoggedIn}=authCtx;
  console.log('authCtx',authCtx);

const emailInputRef=useRef();
const passwordInputRef=useRef();
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
const submithandler=(event)=>{
  event.preventDefault();
  const emailInputValue=emailInputRef.current.value;
  const passwordInputValue=passwordInputRef.current.value;
  console.log('--coming here--');
  setIsloading(true);
  let url;
  if(isLogin){
    url ='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDQRiJZj1kyKAIYIMU_-WO8ejeEzIKpnhQ'
  }
  else{
    url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDQRiJZj1kyKAIYIMU_-WO8ejeEzIKpnhQ'
  }
    fetch(url,
    {
      method:'POST',
      headers:{
        'Content-Type':"application/json"
      },
      body:JSON.stringify({
        email:emailInputValue,
        password:passwordInputValue,
        returnSecureToken:true
      })

    }
    ).then(res=>{
  setIsloading(false)

      if(res.ok){
return res.json();
      }
      else{
        return res.json().then(data=>{
          let errroMessage='Athentication failed!';
          throw new Error(errroMessage)
        })
      }
    }).then(data=>{
      console.log('data',data);
      const expirationTime= new Date(new Date().getTime() + +data.expiresIn*1000)
      authCtx.login( data.idToken,expirationTime.toISOString());
      history.replace('/')

    })
    .catch((error)=>{
      alert(error.mesage)
      console.log('error',error)
    })
  

}
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submithandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' ref={emailInputRef} id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password' >Your Password</label>
          <input type='password' ref={passwordInputRef} id='password' required />
        </div>
        <div className={classes.actions}>
         { !isLoading &&<button type='submit'>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Sending Request..</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
