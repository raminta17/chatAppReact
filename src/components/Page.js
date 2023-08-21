import React, { useEffect, useRef, useState } from 'react';
import ChatBox from "./ChatBox";
import Emojis from "./Emojis";

const Page = ({user, saveMsg, conversations,emojis}) => {

    const userMessageRef = useRef();
    const userMessageContRef = useRef();
    const availableConversations = conversations.filter(conversation => conversation.users.includes(user))
    const [selectedUser, updateSelectedUser] = useState();

    function sendAndClearMsk(e) {
        e.preventDefault();
        let message = userMessageRef.current.value;
        if (message !== '') {
            saveMsg(message, user, selectedUser,e);
            userMessageRef.current.value = '';
        }
    }
    useEffect(() => {
        userMessageContRef.current.scrollTop = userMessageContRef.current.scrollHeight;
    }, [availableConversations]);
    function displayEmojisOptions(emoji) {
        userMessageRef.current.value += emoji;
        console.log(emojis[0])
        // emojis.map((emoji,index)=> <div key={index}>{emoji}</div>)
    }

    return (
        <div className="chat">
            <div className="f1 box">
                <div className="availableChats">
                    {availableConversations.map((conversation, index) => {
                        const userToChat = conversation.users.filter(oneOfTheUser => oneOfTheUser !== user)[0];
                        const lastMessage = conversation.messages[conversation.messages.length-1];

                        return <div
                            className={userToChat === selectedUser ? 'selected' : 'notSelected'}
                            onClick={() => updateSelectedUser(userToChat)}
                            key={index}
                        >
                            <h5>{userToChat}</h5>
                            {lastMessage && <div className="d-flex spBetween"><i>{lastMessage.user === user ? 'You: ' : null} {lastMessage.message}</i><p>{lastMessage.date}</p></div>}
                        </div>
                    })
                    }
                </div>
            </div>
            <div className="f2 box">
                <div ref={userMessageContRef} className="chatWindow f6">
                    {conversations.map((conv, index) => {
                        if (conv.users.includes(user) && conv.users.includes(selectedUser)) {
                            return <ChatBox key={index} conv={conv} loggedInUser={user} />
                        }
                    })}
                </div>
                <div className="f1 chatInputBox">
                    <form onSubmit={sendAndClearMsk}>
                        <input type="text" ref={userMessageRef} placeholder="Your message goes here" />
                        <div className="emojiButton" onClick={() => displayEmojisOptions(emojis[0])}>{emojis[0]}</div>
                        <button type="submit">SEND</button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Page;