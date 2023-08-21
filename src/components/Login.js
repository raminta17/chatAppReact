import React, {useRef} from 'react';

const Login = ({login, error}) => {

    const usernameRef = useRef();
    const pass1Ref = useRef();

    return (
        <div>
            <div className="box">
                <form className="form" onSubmit={(e) => {e.preventDefault(); login(usernameRef.current.value, pass1Ref.current.value)}}>
                    <input type="text" ref={usernameRef} placeholder="username"/>
                    <input type="password" ref={pass1Ref} placeholder="password"/>
                    <div className="error">{error}</div>
                    <button type="submit">LOGIN</button>
                </form>
            </div>
        </div>
    );
};

export default Login;