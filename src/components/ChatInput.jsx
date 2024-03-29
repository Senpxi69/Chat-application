import React, { useState } from 'react';
import styled from 'styled-components';
import Picker, { Emoji } from 'emoji-picker-react';
import { IoMdSend } from 'react-icons/io';
import { BsEmojiSmileFill } from 'react-icons/bs';

function ChatInput({ handleSendMsg }) {
    const [showemojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState("");

    const handleEmojiPickerHideShow = async (emojiObject) => {
        setShowEmojiPicker(!showemojiPicker);
    }

    const handleEmojiClick = async (event, emoji) => {
        let message = msg;
        message += emoji.emoji
        setMsg(message)    }

    const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
            handleSendMsg(msg);
            setMsg('');
        }
    }

    return (
        <Container>
            <div className='button-container'>
                <div className='emoji'>
                    <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
                    {showemojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
                </div>
            </div>
            <form className='input-container' onSubmit={(e) => { sendChat(e) }}>
                <input type='text' placeholder='type your message here ...' value={msg} onChange={(e) => { setMsg(e.target.value) }} />
                <button className='submit'>
                    <IoMdSend />
                </button>
            </form>
        </Container>
    )
}
const Container = styled.div`
display:grid;
grid-template-columns:5% 95%;
align-items:center;
padding:0 2rem;
padding-bottom:0.3rem;
.button-container{
    display:flex;
    align-items:center;
    color:white;
    gap:1rem;
    .emoji {
        position: relative;

        svg {
            font-size: 1.5rem;
            color: #ffff00c8;
            cursor: pointer;
        }

        .emoji-picker-react {
            position: absolute;
            top:-350px;
            background-color:#080420;
            box-shadow: 0 5px 10px #9a86f3;
            border-color:#9a86f3;
            .emoji-scroll-wrapper::-webkit-scrollbar{
                background-color:#080420;
                width:5px;
                &-thumb{
                    background-color:#9186f3;
                    border-radius:5px;
                }
            }

            .emoji-catogaries{
                button{
                    filter:contrast(0);
                }
            }
            .emoji-search{
                color:white;
                background-color:#080420;
                border-color:#9a86f3;
            }
            .emoji-group:before{
                background-color:#080420;
                border-color:#9a86f3;
            }
        }
    }
}

.input-container{
    width:100%;
    border-radius:2rem;
    display:flex;
    align-items:center;
    gap:2rem;
    background-color:#ffffff34;
    input{
        width:90%;
        ${'' /* height:60%; */}
        color:white;
        background-color:transparent;
        border:none;
        font-size:1.2rem;
        padding-left:1rem;
        &::selection{
            background-color:#9186f3;
        }
        &:focus{
            outline:none;
        }
    }
button{
    padding:0.3rem 2rem;
    border-radius:2rem;
    display:flex;
    align-items:center;
    justify-content:center;
    background-color:#9186f3; 
    border:none;
    svg{
        font-size:2rem;
        color:white;
    }
}
}
`

export default ChatInput