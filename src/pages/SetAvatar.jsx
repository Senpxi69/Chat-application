import React from 'react'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../assets/loader.gif'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios'
import { setAvatarRoute } from '../utils/APIRoutes'
import { Buffer } from 'buffer'

function SetAvatar() {
    const [avatars, SetAvatar] = useState([])
    const [loading, SetisLoading] = useState(true)
    const [selectedAvatars, setSelectedAvatars] = useState(undefined)

    const toastOptions = {
        position: "bottom-right",
        theme: "dark",
        pauseOnHover: 8000,
        draggable: true
    }

    useEffect(() => {
        const redir = async () => {
          if (!localStorage.getItem('chat-user-app')) {
            navigate('/login');
          }
        };
      
        redir();
      }, []);

    const api = 'https://api.multiavatar.com/45678945'
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = [];
                for (let i = 0; i < 4; i++) {
                    const response = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
                    const buffer = new Buffer(response.data);
                    const base64String = buffer.toString('base64');
                    data.push(base64String);
                }

                SetAvatar(data);
                SetisLoading(false);
            } catch (error) {

                console.error("Error fetching data:", error);
                SetisLoading(false);
            }
        };

        fetchData();
    }, []);

    const setProfilePicture = async () => {
        if (selectedAvatars === undefined) {
            toast.error("please select an avatar", toastOptions);
        } else {
            const user = await JSON.parse(localStorage.getItem("chat-user-app"))
            const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
                image: avatars[selectedAvatars]
            });


            console.log(data);

            if (data.isSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem("chat-app-user", JSON.stringify(user));
                navigate("/")
            }
            else {
                toast.error("error setting the avatar:please try again", toastOptions);
            }
        }
    }

    return (
        <>
            {
                loading ? <Container>
                    <img src={Loader} className='loader' />
                </Container> :
                    (<Container>

                        <div className='title-container'>
                            <h1>Select an avatar as your profile picture</h1>
                        </div>

                        <div className='avatars'>
                            {avatars.map((avatar, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={`avatar ${selectedAvatars === index ? "selected" : ""}`}>

                                        <img src={`data:image/svg+xml;base64,${avatar}`}
                                            alt='avatar'
                                            onClick={() => { setSelectedAvatars(index) }}
                                        />

                                    </div>
                                )
                            })}
                        </div>

                        <button className='submit-btn'
                            onClick={setProfilePicture}>Set as profile picture</button>

                    </Container>)
            }

            <ToastContainer />
        </>
    )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }

  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 4rem;
      display: flex;
      justify-content: center;
      transition: 0.5s ease-in-out;

      img {
        height: 6rem;
      }
    }

    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }

.submit-btn
    {
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

`;

export default SetAvatar