import React, { useState, useEffect, PureComponent } from 'react'

function Login() {

    const handleSubmit = (event) => {
        // Construct post request by iterating over (not-empty) values in form
        // Set user data to new result
        event.preventDefault();
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: 'Hmmm' })
        };
        fetch('/update', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
      };

  return (
    <div className="" style={{height: `100vh`}}>
      <div className="row" style={{
          display: `flex`,
          flexDirection: `row`
      }}>
      <form method="post" onSubmit={handleSubmit}>
            <label>
            Username
            </label>
            <input type="text" id="username" name="username" />
            <label>
            Pasword
            </label>
            <input type="text" id="password" name="password" />
            <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}

export default Login;