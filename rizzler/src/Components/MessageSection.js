import { v4 as uuid } from 'uuid';
import React, { useState } from 'react';
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { 
  MainContainer, 
  ChatContainer, 
  MessageList, 
  Message, 
  MessageInput, 
  TypingIndicator } from '@chatscope/chat-ui-kit-react';

function MessageSection(props) {
  const [messageList, setMessageList] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [typing, setTyping] = useState(false)

  const onInputChange = (event) => {
    setNewMessage(event);
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (newMessage.trim() !== "") {
        const newMessageList = messageList.concat(newMessage);
        setMessageList(newMessageList);
      } 
      setNewMessage('');
    }
  };
  
  return (
    <div style={{ position:"relative", height: "540px" }}>
      <header className="App-header">
        <h2 style={{ marginTop: "0"}}>{props.version}</h2>
      </header>
      <MainContainer>
        <ChatContainer>   
          <MessageList>
            {props.version === "Interview" &&
              <Message model={{
                message: "Hi there! Tell me a bit about yourself!",
                sentTime: "just now",
                sender: "Joe"
                }} /> }
            {messageList.map((item) => (
              <Message 
              key={uuid()}
              model={{
              message: item,
              sentTime: "just now",
              direction: "outgoing"
              }}/>
            ))}
            {typing && <TypingIndicator />}
            </MessageList>
            <MessageInput placeholder={/*newMessage === '' ? */ "Type message here" /*: newMessage*/}
                          onFocus={(e) => e.target.placeholder = ""}
                          onChange={onInputChange}
                          onKeyDown={handleKeyDown}/>
        </ChatContainer>
      </MainContainer>
    </div>
  )
}

export default MessageSection;
