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

function MessageSection() {
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

    <div style={{ position:"relative", height: "500px" }}>
      <MainContainer>
        <ChatContainer>   
          <MessageList>
            <Message model={{
                    message: "Hello my friend",
                    sentTime: "just now",
                    sender: "Joe"
                    }} />
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
