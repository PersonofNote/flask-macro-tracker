import React, { useState, useEffect, PureComponent } from 'react'
import { Input } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

function UpdatePage(data) {
  const currentValue = data.data
  const [values, setValues] = React.useState({
    calorie_total: currentValue.calorie_total,
    bodyweight: currentValue.bodyweight,
    fat: currentValue.fat,
    carb: currentValue.carb,
    protein: currentValue.protein,
    bust: currentValue.bust,
    waist: currentValue.waist,
    hips: currentValue.hips,
    showPassword: false,
  });

  console.log(values);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    console.log(values);
  };

  const handleSubmit = (event) => {
    console.log(`Submission values: ${values[0]}`)
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( values )
    };
    fetch('/update', requestOptions)
        .then(response => response.json())
  };

  // Prepopulate values with current user values
  useEffect(() => {
    fetch('/user', {
        headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        }}).then(res => res.json()).then(data => {
        setValues(data);
    });
    }, []);

  return (
    <div className="" style={{height: `100vh`}}>
      <div className="row" style={{
          display: `flex`,
          flexDirection: `row`
      }}>
      </div>
      <form method="post" onSubmit={handleSubmit}>
      <TextField
          id="calorie_total"
          label="Calorie Total"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={values.calorie_total}
          onChange={handleChange('calorie_total')}
        />
        <TextField
          id="bodyweight"
          label="Body Weight"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={values.bodyweight}
          onChange={handleChange('bodyweight')}
        />
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