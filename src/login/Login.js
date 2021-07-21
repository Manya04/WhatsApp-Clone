import React, {useContext} from 'react'
import "./Login.css"
import {Button} from "@material-ui/core"
import {auth, provider} from '../firebase'
import { actionTypes } from '../reducer';
import {useStateValue} from "../StateProvider"

function Login() {
    const [{}, dispatch] = useStateValue();

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then((result) =>{
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user
            });
         }).catch((error) => alert(error.message))
         
    };
    return (
        <div className="login">
            <div className="login_container">
                <img src= "https://1000logos.net/wp-content/uploads/2018/03/logo-wa.png"
                alt=""
                />
                <div className="login_text">
                    <h1>Sign In to WhatsApp</h1>
                </div>
                <Button onClick={signIn}>
                    Sign In with Google
                </Button>
            </div>
        </div>
    )
}

export default Login
