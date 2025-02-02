import React, {useState} from 'react';
import './Login.css'
import { useNavigate } from "react-router-dom";

import axios from "axios";

function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [warning, setWarning] = useState("");
    const navigate = useNavigate();
    
    const handleLogin = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/login/", {
            'username': username,
            'password': password
        }).then(
            response => {
                localStorage.setItem('auth', 'Token ' + response.data.token);
                navigate("app/")
            }
        ).catch(error => {
            setWarning("User name doesn't match with password.")
        })
    }

    return <>
        <div id='main'>
            <label>
                User Name <input type='text' name='userName' value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
                Password <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <p id='warn'>{warning}</p>
            <button onClick={(e) => handleLogin(e)}>Login</button>
        </div>
    </>
}

export default Login