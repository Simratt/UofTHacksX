import { v4 as uuid } from 'uuid';
import axios from 'axios';
import React, { useState } from 'react';
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { 
  MainContainer, 
  ChatContainer, 
  MessageList, 
  Message, 
  MessageInput, 
  TypingIndicator } from '@chatscope/chat-ui-kit-react';
import Slider from '@mui/material/Slider';

const getOptions = (prompt) => {
  return {
    method: 'POST',
    url: 'https://api.cohere.ai/generate',
    headers: {
      accept: 'application/json',
      'Cohere-Version': '2022-12-06',
      'content-type': 'application/json',
      authorization: 'Bearer OTspaqbEisazXeUu6gsCNxeW63Hz8A1f46Mo8tIu'
    },
    data: {
      max_tokens: 70,
      return_likelihoods: 'NONE',
      truncate: 'END',
      prompt: prompt,
      model: 'c780452d-c955-494a-9cd4-66d977d0cfea-ft'
    }
  };
}

function MessageSection(props) {
  const [interviewMessageList, setInterviewMessageList] = useState([{
    content: "Hi there! Please enter a prompt to get some interview questions!",
    direction: "incoming"
  }]);
  const [prompt, setPrompt] = useState("");
  const [conversationMessageList, setConversationMessageList] = useState([]);
  const [evaluationMessageList, setEvaluationMessageList] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  React.useEffect(() => {
    if (prompt !== "") {
      axios
      .request(getOptions(prompt))
      .then(function (response) {
        let newBotMessage = response.data.generations[0].text.replace(/[\r\n]+/g," ").trim();
        const tempNewBotMessage = newBotMessage
        while (newBotMessage[newBotMessage.length-1] !== "?" && newBotMessage[newBotMessage.length-1] !== "." &&
          newBotMessage.length > 0) {
          newBotMessage = newBotMessage.substring(0, newBotMessage.length-1);
        }
        if (newBotMessage.length === 0) {
          newBotMessage = tempNewBotMessage
        }
        const newMessageObj = {
          content: newBotMessage,
          direction: "incoming"
        }
        if (props.version === "Interview") {
          const newMessageList = interviewMessageList.concat(newMessageObj);
          setInterviewMessageList(newMessageList);
        } else if (props.version === "Conversation") {
          const newMessageList = conversationMessageList.concat(newMessageObj);
          setConversationMessageList(newMessageList);
        } else {
          const newMessageList = evaluationMessageList.concat(newMessageObj);
          setEvaluationMessageList(newMessageList);
        }
        console.log(response.data);
        setPrompt("")
      })
      .catch(function (error) {
        console.error(error);
        setPrompt("")
      });
    }
  }, [prompt]);

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
        } else if (props.version === "Conversation") {
          const newMessageObj = {
            content: newMessage,
            direction: "outgoing"
          }
          const newMessageList = conversationMessageList.concat(newMessageObj);
          setConversationMessageList(newMessageList);
        } else {
          const newMessageObj = {
            content: newMessage,
            direction: "outgoing"
          }
          const newMessageList = evaluationMessageList.concat(newMessageObj);
          setEvaluationMessageList(newMessageList);
        }
      } 
      setPrompt(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div style={{ position:"relative", height: "540px" }}>
      <header className="App-header">
        <h2 style={{ marginTop: "0"}}>{props.version}</h2>
      </header>
      {props.version === "Evaluation" && 
        <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" /> }
      <MainContainer className={props.version === "Evaluation" ? "evaluation" : ""}>
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
              }) : props.version === "Conversation" ?
              conversationMessageList.map(({content, direction}) => {
                return <Message 
                  key={uuid()}
                  model={{
                    message: content,
                    sentTime: "just now",
                    direction: direction
                }}/>
              }) :
              evaluationMessageList.map(({content, direction}) => {
                return <Message 
                  key={uuid()}
                  model={{
                    message: content,
                    sentTime: "just now",
                    direction: direction
                }}/>
              })
            }
            {prompt !== "" && <TypingIndicator />}
            </MessageList>
            <MessageInput placeholder={/*newMessage === '' ? */ "Type message here" /*: newMessage*/}
                          onFocus={(e) => e.target.placeholder = ""}
                          onChange={onInputChange}
                          onKeyDown={handleKeyDown}
                          attachButton={false}/>
        </ChatContainer>
      </MainContainer>
    </div>
  )
}

export default MessageSection;
