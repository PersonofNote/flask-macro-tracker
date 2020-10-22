import React, { useState, useEffect, PureComponent } from 'react'

function UpdatePage() {
  useEffect(() => {
    // POST request using fetch inside useEffect React hook
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ calore_total: '6000' })
    };
    fetch('/update', requestOptions)
        .then(response => response.json())
        .then(data => setPostId(data.calorie_total));

}, []);

const handleSubmit = (event) => {
  // Construct post request by iterating over (not-empty) values in form
  // Set user data to new result
  console.log(event);
  };

  return (
    <div className="" style={{height: `100vh`}}>
      <div className="row" style={{
          display: `flex`,
          flexDirection: `row`
      }}>
          <h1> Update (post request endpoint)</h1>
      </div>
    </div>
  );
}

export default UpdatePage;