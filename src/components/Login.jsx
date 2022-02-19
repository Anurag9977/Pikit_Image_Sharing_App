import React from "react";
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineGooglePlus } from 'react-icons/ai';
import { FaFacebookF } from 'react-icons/fa';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import { client } from "../client";
import { useEffect } from "react";
import { useState } from "react";
import { MutatingDots } from "react-loader-spinner";
import Spinner from "./Spinner";


 const Login = () => {
    const [videoLoad,setVideoLoad] = useState(true); 
    const [loading,setLoading] = useState(false)
    //console.log(videoLoad)
    //console.log(loading)
  
    const navigate = useNavigate();

    const responseFacebook = (response) => {
        //console.log(response);

        setLoading(true);
        const { name, userID } = response;
        const imageUrl = response.picture.data.url;
        const pikitObj = {
            name,
            pikitId : userID,
            imageUrl
        }
        localStorage.setItem('user',JSON.stringify(pikitObj))
        const doc = {
            _id : userID,
            _type : 'user',
            userName : name,
            image : imageUrl
        }

        client.createIfNotExists(doc)
        .then(() => {
            setLoading(false)
            navigate('/', { replace : true })
        })

    }
    
    const responseGoogle = (response) => {
      //  console.log(response)

        setLoading(true);
        const { name, googleId, imageUrl } = response.profileObj;

        
        const pikitObj = {
            name,
            pikitId : googleId,
            imageUrl
        }
        localStorage.setItem('user',JSON.stringify(pikitObj))
        const doc = {
            _id : googleId,
            _type : 'user',
            userName : name,
            image : imageUrl
        }

        client.createIfNotExists(doc)
        .then(() => {
            setLoading(false)
            navigate('/', { replace : true })
        })

    }
    
    useEffect(()=>{
        if(localStorage.getItem('user'))
        navigate('/');
    },[navigate])

    if (loading) {
        return (
          <Spinner message={'One Moment Please...'} />
        );
      }

    return(
    <div className="flex justify-start items-center flex-col h-screen">
        {videoLoad && <div className="flex flex-col p-9 items-center absolute w-full h-full bg-white z-10">
            <MutatingDots
               color="#f95801"
               secondaryColor='#000000'
               height={100}
               width={100}
               className="m-9 p-9"
            />
            <p className="text-lg text-center px-2 py-4">One Moment Please...</p>
        </div>
        }
        <div className="relative w-full h-full">
                <video
                  src={shareVideo}
                  type="video/mp4"
                  loop
                  controls={false}
                  muted
                  autoPlay
                  onLoadStart={()=>{
                      setTimeout(() => setVideoLoad(false),2500)
                  }}
                  className="w-full h-full object-cover"                
                />

            <div className="absolute flex flex-col justify-center items-center top-0 right-0 bottom-0 left-0 bg-blackOverlay">
                <div className="p-5">
                    <Link to="/">
                      <img src={logo} width="250px" alt="logo" />
                    </Link>
                </div>

                <div className="shadow-2xl">
                    <GoogleLogin
                     clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                     render={(renderProps) => (
                         <button 
                           type="button"
                           className="bg-mainColor flex justify-center items-center p-3 m-3 rounded-lg cursor-pointer outline-none"
                           style={{backgroundColor:'#db3236',color:'white'}}
                           onClick={renderProps.onClick}
                           disabled={renderProps.disabled}
                         >
                             <AiOutlineGooglePlus fontSize={25} className="mr-2"/> Sign In with Google

                         </button>
                     )}
                     onSuccess={responseGoogle}
                     onFailure={responseGoogle}
                     cookiePolicy="single_host_origin"
                    
                    />
                </div>
                <div className="shadow-2xl">
                    <FacebookLogin
                        appId={process.env.REACT_APP_FACEBOOK_API_TOKEN}
                        fields="name,email,picture"
                        autoLoad={false}
                        isMobile={false}
                        callback={responseFacebook}
                        buttonStyle={{backgroundColor:'#3b5998',color:'white'}}
                        cssClass="flex justify-center items-center p-3 m-3 rounded-lg cursor-pointer outline-none"
                        icon={<FaFacebookF fontSize={18} className="mr-2"/>}
                        render={renderProps => (
                           <button 
                            type="button"
                           // cssClass="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                            onClick={renderProps.onClick}
                           >
                            Login with Facebook
                           </button>
                        )}
                    />
                </div>
            </div>
        </div>
    </div>
    )
 }

 export default Login