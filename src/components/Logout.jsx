import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import { BiPowerOff } from 'react-icons/bi';

function Logout() {
    const navigate = useNavigate();
    const logOut = () => {
        localStorage.removeItem('chat-user-app');
        navigate("/login")
    }
    return (
        <Button>
            <BiPowerOff onClick={logOut}/>
        </Button>
    )
}
const Button = styled.div`
display:flex;
jsutify-content:center;
align-items:center;
padding:0.5rem;
border-radius:0.5rem;
background-color:#9e86f3;
cursor:pointer;
border:none;
svg{
    font-size:1.3rem;
    color:#ebe7ff;
}
`;

export default Logout