import React from 'react'
import styled from 'styled-components'
import Robot from '../assets/robot.gif'

function Welcome({currentUser}) {
  return (
    <Container>
    <img src={Robot} alt='robot'/>
    <h1>Welocme {currentUser.username} !</h1>
    <h3>Please select a chat to Start messaging!</h3>
      </Container>
  )
}

const Container = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
h1{
    color:white;
}
h3{
    color:white;
}
img{
    height:20rem;
}
`;

export default Welcome