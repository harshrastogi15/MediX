import React, { useState } from 'react'
import style from './InputMessage.module.css'
import Dictaphone from './Dictaphone'
function InputMessage(props) {
    const {messageget} = props
    const [newMessage,updateNewMessage] = useState("")


    return (
        <div className={style.UIInputMessage}>
            <Dictaphone updateMessageMic = {(msg)=>{updateNewMessage(msg)}} />
            <div className={style.Inputmessage}>
                <textarea placeholder="Type Your Query Here" name="" id="" value={newMessage}  onChange={(e)=>{updateNewMessage(e.target.value)}} ></textarea>
            </div>
            <div className={style.SubmitMessage}>
                <input type="button" value="Submit" onClick={(e)=>{messageget(newMessage)}}/>
            </div>
        </div>
    ) 
}

export default InputMessage