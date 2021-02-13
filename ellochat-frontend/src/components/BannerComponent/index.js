import React from 'react';
import './styles.css';
import Wallpaper from '../../assets/wallpaper.gif';
import ChatComponent from '../ChatComponent';

export default function BannerComponent() {
    return (
        <div className="chat">
            {/* <img src ={Wallpaper} alt="wallpaper"/> */}
            <ChatComponent contactName="GOKU"/>
        </div>
    )
}