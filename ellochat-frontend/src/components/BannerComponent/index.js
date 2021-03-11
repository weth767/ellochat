import React from 'react';
import './styles.css';
import Wallpaper from '../../assets/wallpaper.gif';
import ChatComponent from '../ChatComponent';

export default function BannerComponent(props) {
    return (
        <div className="chat">
            {!props.contact ? <img src ={Wallpaper} alt="wallpaper"/> : 
            <ChatComponent contact={props.contact} image={props.image} isNewChat={props.isNewChat}/>}
        </div>
    )
}