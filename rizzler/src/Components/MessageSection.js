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
  const [interviewMessageList, setInterviewMessageList] = useState([{
    content: "Hi there! Tell me a bit about yourself!",
    direction: "incoming"
  }]);
  const [conversationMessageList, setConversationMessageList] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [typing, setTyping] = useState(false)

  const onInputChange = (event) => {
    setNewMessage(event);
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (newMessage.trim() !== "") {
        if (props.version === "Interview") {
          const newMessageObj = {
            content: newMessage,
            direction: "outgoing"
          }
          const newMessageList = interviewMessageList.concat(newMessageObj);
          setInterviewMessageList(newMessageList);
        } else {
          const newMessageObj = {
            content: newMessage,
            direction: "outgoing"
          }
          const newMessageList = conversationMessageList.concat(newMessageObj);
          setConversationMessageList(newMessageList);
        }
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
            {props.version === "Interview" ?
              interviewMessageList.map(({content, direction}) => {
                return <Message 
                  key={uuid()}
                  model={{
                    message: content,
                    sentTime: "just now",
                    direction: direction
                }}/>
              }) :
              conversationMessageList.map(({content, direction}) => {
                return <Message 
                  key={uuid()}
                  model={{
                    message: content,
                    sentTime: "just now",
                    direction: direction
                }}/>
              })
            }
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
