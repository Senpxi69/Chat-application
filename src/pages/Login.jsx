import React from 'react'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Logo from '../assets/logo.svg'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios'
import { loginRoute } from '../utils/APIRoutes'

function Login() {

  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    password: "",
  })

  async function handleSubmit(event) {
    event.preventDefault();
    if (handleValidation()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password
      })
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("chat-user-app", JSON.stringify(data.user))
        navigate("/")
      }

    }
  }

  const toastOptions = {
    position: "bottom-right",
    theme: "dark",
    pauseOnHover: 8000,
    draggable: true
  }

  useEffect(()=>{
    if(localStorage.getItem('chat-user-app')){
      navigate('/')
    }
  },[])

  function handleValidation() {

    const { password, confirmPassword, username, email } = values;

    if (email === "") {
      toast.error("E-mail cannot be empty", toastOptions);
      return false;
    }

    if (password === "") {
      toast.error("Password cannot be empty", toastOptions);
      return false;
    }

    return true;
  }

  function handleChange(event) {
const {name , value} = event.target;

setValues({...values, [name]:value})
  }

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => {
          handleSubmit(event)
        }}>
          <div className='brand'>
            <img src={Logo} />
            <h1>Snappy</h1>
          </div>

          <input
            type='text'
            placeholder='Username'
            name='username'
            onChange={(e) => {
              handleChange(e)
            }}
          />
          <input
            type='password'
            placeholder='Password'
            name='password'
            onChange={(e) => {
              handleChange(e)
            }}
          />
          <button type='submit'>Login</button>
          <span>
            Dont have an account <Link to='/register'>Register</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
height:100vh;
width:100wh;
display:flex;
flex-direction:column;
justify-content:center;
gap:1rem;
align-items:center;
background-color:#131324;
.brand{
  display:flex;
  justify-content:center;
  align-items:center;
  gap:1rem;
}
img{
    height:5rem;
}

h1{
color:white;
text-transform:uppercase;
}

form{
    display:flex;
    flex-direction:column;
    gap:2rem;
    background-color:#00000076;
    border-radius:2rem;
    padding:2rem 5rem;
}
input{
    background-color:transparent;
    padding:1rem;
    border: 0.1rem solid #4e0eff;
    border-radius:0.4rem;
    color:white;
    font-size:1rem;
    &:focus{
        border:0.1rem solid #997af0;
        outline:none;
    }   
}
button{
    background-color:#997af0;
    color:white;
    padding:1rem 2rem;
    border-radius:0.4rem;
    font-size:1rem;
    text-transform:uppercase;
    cursor:pointer;
    transition:0.5s ease-in-out;
    &:hover{
        background-color:#4e0eff;
    }
} 
span{
    color:white;
    text-transform:uppercase;
    a{
        text-decoration:none;
        color:#4e0eff;
    }
}
`;

export default Login