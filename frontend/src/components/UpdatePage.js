import React, { useState, useEffect, PureComponent } from 'react'
import { Input } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

function UpdatePage(data) { 
  
  // Prepopulate form values with current user values  
  const [userData, setUserData] = useState(0);
  
  useEffect(() => {
    fetch('/user', {
        headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        }}).then(res => res.json()).then(data => {
        setUserData(data);
    });
    }, []);
  
  const [values, setValues] = React.useState({
    calorie_total: userData.calorie_total,
    bodyweight: userData.bodyweight,
    fat: userData.fat,
    carb: userData.carb,
    protein: userData.protein,
    bust: userData.bust,
    waist: userData.waist,
    hips: userData.hips,
    showPassword: false,
  });


  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( values )
    };
    fetch('/update', requestOptions)
        .then(response => response.json())
  };

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
        <TextField
          id="water_amount"
          label="Water Goal"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={values.water_amount}
          onChange={handleChange('water_amount')}
        />
        <label for="carb"> Percent Carbs </label>
        <input type="number" id="carb_goal" name="carb"/>
        <input className="btn-large" type="submit" value="Save" />
      </form>
    </div>
  );
}

export default UpdatePage;