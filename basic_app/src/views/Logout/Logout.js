import React, { useEffect, Redirect } from 'react';

export default function Logout() {

    useEffect(() => {
        sessionStorage.clear();
        this.props.history.push("/login");
    }, [])

    return (
        <div className="login">
            <h1>You have Logged Out</h1>
        </div>
    )
}
