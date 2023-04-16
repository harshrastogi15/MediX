import React, { useEffect, useState } from 'react'
import style from './Message.module.css'
import InputMessage from './Chatpart/InputMessage'

function Message() {
  const [newMessage,updateNewMessage] = useState("")
  const [IsmessageSent , updateMessageSent] = useState(false)
  const messageget = async(msg)=>{
    if(msg.length===0){
      return 
    }
    updateNewMessage(msg)
    updateMessageSent(true) 
  } 

  const getMessageFromServer = async()=>{
    console.log(newMessage)
    await fetch('/api/chat',{
      method:'POST',
      headers : {"content-type":"application/json"},
      body : JSON.stringify({question : newMessage})
    })
    .then((res)=>{
      // console.log(res.status)
      if(res.status!==200){
        addMessageServer("Unable to fetch! Reload")         
      }
      return res.json()
    })
    .then((res)=>{
      // console.log(res)
      addMessageServer(res.msg)
    }).catch((err)=>{
      console.log(err)
    })
  }

  const addMessageClient = ()=>{
      let create = document.createElement(`div`)
      create.classList.add(style.clientmessage)
      // create.appendChild(document.createTextNode(`You : ${newMessage}`));
      create.innerText = `You : ${newMessage}`
      let p = document.getElementById('addMessage').appendChild(create)
  } 

  const addMessageServer = (msg)=>{
    let create = document.createElement(`div`)
    create.classList.add(style.servermessage)
    // create.appendChild(document.createTextNode(`You : ${newMessage}`));
    create.innerText = `Server : ${msg}`
    let p = document.getElementById('addMessage').appendChild(create)
  } 
 
  useEffect(()=>{
    if((newMessage.length===0 ) || (!IsmessageSent) ){return ;}
    addMessageClient()
    getMessageFromServer()
    updateMessageSent(false)   
  },[newMessage])

  return (
    <div className={style.UImessage}>
      <div className={style.chatmessage} id='addMessage'>
        <h2>MediX Chat Bot</h2>
      </div>
      <InputMessage messageget={messageget} updateNewMessage newMessage/>
    </div>
  )
}

export default Message