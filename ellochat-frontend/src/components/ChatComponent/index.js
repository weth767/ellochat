import React from 'react';
import './styles.css';
import Wallpaper from '../../assets/wallpaper.gif';

export default function ChatComponent() {
    return (
        <div className="chat">
            <img src ={Wallpaper} alt="wallpaper"/>
        </div>
    )
}