import React, { useState, useEffect, PureComponent } from 'react'

function UpdatePage() {
  useEffect(() => {
    // POST request using fetch inside useEffect React hook
    /*
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ calore_total: '6000' })
    };
    fetch('/update', requestOptions)
        .then(response => response.json())
        .then(data => console.log(data));
    */
}, []);

const handleSubmit = (event) => {
  // Construct post request by iterating over (not-empty) values in form
  // Set user data to new result
  event.preventDefault();
  console.log(event);
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ calore_total: '6000' })
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
          <h1> Update (post request endpoint)</h1>
      </div>
      <form method="post" onSubmit={handleSubmit}>
        <label for="calorie_total"> Total Daily Calorie goal </label>
        <input type="number" id="calorie_total" name="calorie_total"/>
        <label for="bodyweight"> Body Weight </label>
        <input type="number" id="bodyweight" name="bodyweight"/>
        <label for="water_amount"> Daily Water Goal </label>
        <input type="number" id="water_amount" name="water_amount"/>
        <label for="carb"> Percent Carbs </label>
        <input type="number" id="carb_goal" name="carb"/>
        <input className="btn-large" type="submit" value="Save" />
      </form>
    </div>
  );
}

export default UpdatePage;