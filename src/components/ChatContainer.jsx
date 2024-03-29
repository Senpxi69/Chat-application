import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Logout from './Logout';
import ChatInput from './ChatInput';
import axios from 'axios';
import { getAllMessagesRoute, sendMessageRoute } from '../utils/APIRoutes';
import { v4 as uuidv4 } from 'uuid';

function ChatContainer({ currentChat, currentUser, socket }) {
    const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    async function fetchData() {
     if (currentChat) {
      const response = await axios.post(getAllMessagesRoute, {
       from:currentUser._id,
       to:currentChat._id
      });
      setMessages(response.data);
     }
  }
    fetchData();
  }, [currentUser,currentChat]);

  const handleSendMsg = async(msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg
    });

    socket.current.emit("send-msg", {
      from: currentUser._id,
      to: currentChat._id,
      message:msg
    });

    const msgs = [...messages];
    msgs.push({fromSelf:true, message:msg});
    setMessages(msgs);
  }

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


    return (
        <>
            {currentChat && (
                <Container>
                    <div className='chat-header'>
                        <div className='user-details'>
                            <div className='avatar'>
                                <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                                    alt='avatar' />
                            </div>
                            <div className='username'>
                                <h3>{currentChat.username}</h3>
                            </div>
                        </div>
                        <Logout />
                    </div>
                    <div className='chat-messages'>
                        {messages.map((message) => (
                            <div key={uuidv4()} ref={scrollRef}>
                                <div className={`message ${message.fromSelf ? "sent" : "received"}`}>
                                    <div className='content'>
                                        <p>{message.message}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <ChatInput handleSendMsg={handleSendMsg} />
                </Container>
            )}
        </>
    )
}

const Container = styled.div`
padding:1rem;
display:grid;
grid-template-rows:10% 78% 12%;
gap:0.1rem;
overflow:hidden;
@media screen and (min-width:720px) and (max-width:1080px){
    grid-template-rows:15% 70% 15%;
}

.chat-header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:0 2rem;
  .user-details{
    display:flex;
    align-itmes:center;
    gap:1rem;
   .avatar{
    img{
        height:3rem;
    }
   } 
   .username{
    h3{
        color:white;
    }
   }
  }    
}

.chat-messages{
    padding:1rem 2em;
    display:flex;
    flex-direction:column;
    overflow:auto;
  .message{
    display:flex;
    align-items:center;
    .content{
        max-width:40%;
        overflow-wrap:break-word;
        padding:1rem;
        margin-bottom:1rem;
        font-size:1.1rem;
        border-radius:1rem;
        color:#d1d1d1;
    }
  }
  .sent{
    justify-content:flex-end;
    .content{
        background-color:#4f04ff21;
    }
  }  
  .received{
    justify-content:flex-start;
    .content{
        background-color:#9900ff20;
    }
  }
}

`

export default ChatContainer