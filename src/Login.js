import React, {useState} from 'react'
import './Login.css'
import { Link , useNavigate } from 'react-router-dom'
import {auth} from './firebase'
function Login() {
    const navigate = useNavigate ();
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const signIn = e =>{
        e.preventDefault(); // no refreshing
        // firebase signin
        auth    
            .signInWithEmailAndPassword(email, password)
            .then((auth)=>{
                navigate('/'); // if successful
            })
            .catch(error => alert(error.message))
    }

    const register = e =>{
        e.preventDefault();
        // firebase resigter
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                if (auth) {
                    navigate('/');
                }
            })
            .catch(error => alert(error.message))
    }

  return (
    <div className='login'>
        <Link to="/">
        <img className='login__logo'
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/905px-Amazon_logo.svg.png'
            alt="login-logo">
        </img>
        </Link>

        <div className='login__container'>
            <h1>Sign-in</h1>
            <form>
                <h5>E-mail</h5>
                <input type='text' value={email} onChange={e => setEmail(e.target.value)}></input>
                
                <h5>Password</h5>
                <input type='password' value={password} onChange={e =>setPassword(e.target.value)} ></input>
                
                <button type='submit' onClick={signIn} className='login__signInButton'>Sign In</button>
            </form>
            <p>
                By signing-in you agree to AMAZON FAKS CLONE's Conditions of Use & Sales.
                Please see our Privacy Notice, our Cookies Notice and out Interest-Based Ads Notice.
            </p>
            <button onClick={register} className='login__registerButton'>Create your Amazon Account</button>
        </div>    
    </div> 
  )
}

export default Login
