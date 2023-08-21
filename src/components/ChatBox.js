import React from 'react';

const ChatBox = ({conv, loggedInUser}) => {
    return (
        <div className="messagesCont">
            {conv.messages.map((message,index) => {

                return <div className = {(message.user === loggedInUser) ? "loggedInUserMessage": "message"} key={index}>
                    <div className="d-flex">
                        <h5>{message.user} </h5>
                        <i>{message.date}</i>
                    </div>
                    <p>{message.message}</p>
                </div>
            })}
        </div>
    );
};

export default ChatBox;