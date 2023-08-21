import './App.css';
import React, {useEffect, useRef, useState} from "react";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Page from "./components/Page";

const emojis = [ "😀", "😃", "😄", "😁", "😆", "😅",
    "😂", "🤣", "😊", "😇", "🙂", "🙃",
    "😉", "😌", "😍", "🥰", "😘", "😋",
    "😎", "🤩", "😏", "😒", "😞", "😔",]
function App() {

    const [navMsg, updateNavMsg] = useState('GO TO LOGIN');
    const [users, updateUsers] = useState([]);
    const [ifRegistered, updateIfRegistered] = useState(false);
    const [ifLoggedIn, updateIfLoggedIn] = useState(false);
    const [loggedInUser, updateLoggedInUser] = useState();
    const [error, updateError] = useState();
    const [conversations, updateConversations] = useState([]);
    const passRegex = /\d/;

    function register(username, pass1, pass2) {
        const newUser = {
            username: username,
            password: pass1
        }
        if (users.filter(user => user.username === username).length > 0) return updateError('Username is taken.');
        if (username.length < 3 || username.length > 20) return updateError('Username should be between 3 and 20 characters.');
        if (!pass1.match(passRegex)) return updateError('Password should contain at least one numeric character.');
        if (pass1 !== pass2) return updateError('Passwords should match.');
        updateUsers([...users, newUser])
        updateIfRegistered(true)
        updateError();
        updateNavMsg('GO TO REGISTER');

        const newConversations = users.map(existingUser => (
            {
                users: [existingUser.username, username],
                messages: []
            }
        ))

        updateConversations([...conversations, ...newConversations]);
    }

    function login(username, pass) {
        if(users.filter(existingUser => existingUser.username === username).length === 0) return updateError('This user doesn\'t exist.');
        if(users.filter(existingUser => existingUser.username === username)[0].password !== pass) return updateError('Wrong password');
        updateError();
        updateIfLoggedIn(true);
        updateLoggedInUser(username);
        updateNavMsg('LOGOUT');
    }

    function navigate() {
        updateError();
        if (navMsg === 'GO TO LOGIN') {
            updateIfRegistered(true);
            updateIfLoggedIn(false);
            updateNavMsg('GO TO REGISTER');
        }
        if (navMsg === 'GO TO REGISTER') {
            updateIfRegistered(false);
            updateNavMsg('GO TO LOGIN');
        }
        if (navMsg === 'LOGOUT') {
            updateIfRegistered(true);
            updateIfLoggedIn(false);
            updateNavMsg('GO TO REGISTER');
        }
    }

    function saveMsg(message, user, selectedUser) {
        const currentdate = new Date();
        const datetime = currentdate.getHours() + ":"
            + currentdate.getMinutes() + ' '
            + currentdate.getDate() + "/"
            + (currentdate.getMonth()+1);

        updateConversations(conversations.map(conv => {
                    if (conv.users.includes(user) && conv.users.includes(selectedUser)) {
                        return {
                            ...conv,
                            messages: [
                                ...conv.messages,
                                {
                                    user: user,
                                    message: message,
                                    date: datetime
                                }
                            ]

                        }
                    } else {
                        return conv;
                    }
                }
            )
        );
    }

    return (
        <div>
            <nav>
                <div onClick={navigate}>{navMsg}</div>
            </nav>
            <div className="cont">
                {!ifRegistered && <Registration
                    register={register}
                    error={error}
                />}
                {ifRegistered && !ifLoggedIn && <Login
                    login={login}
                    error={error}/>}
                {ifLoggedIn && <Page
                    user={loggedInUser}
                    saveMsg={saveMsg}
                    conversations={conversations}
                    emojis={emojis}
                />}
            </div>
        </div>

    );
}

export default App;
