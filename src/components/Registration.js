import React, {useRef} from 'react';

const Registration = ({register,error}) => {

    const usernameRef = useRef();
    const pass1Ref = useRef();
    const pass2Ref = useRef();


    return (
        <div className="box">
            <form className="form" onSubmit={(e) => {e.preventDefault(); register(usernameRef.current.value, pass1Ref.current.value, pass2Ref.current.value)}}>
                <input type="text" ref={usernameRef} placeholder="username"/>
                <input type="password" ref={pass1Ref} placeholder="password"/>
                <input type="password" ref={pass2Ref} placeholder="repeat password"/>
                <div className="error">{error}</div>
                <button type="submit">REGISTER</button>
            </form>
        </div>
    );
};

export default Registration;