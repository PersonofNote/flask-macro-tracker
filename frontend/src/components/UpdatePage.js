/**
 * TODO:
 * -Consider if it's worth it to extend the textfield so that you can populate it from props
 * -There's 10 fields so maybe not worth the effort
 */

import React, { useState, useEffect, PureComponent } from 'react'
import { Input } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

function UpdatePage() { 
  
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
    water_amount: userData.water_amount,
    vegetables: userData.vegetables
  });


  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    console.log(event.target.value);
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
      <h3> Stats </h3>
      <TextField
          id="calorie_total"
          label="Calorie Total"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={userData.calorie_total}
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
        /> <br/>
        <TextField
          id="bust"
          label="Bust Measurement"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={values.bust}
          onChange={handleChange('bust')}
        />
        <TextField
          id="waist"
          label="Waist Measurement"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={values.waist}
          onChange={handleChange('waist')}
        />
        <TextField
          id="hips"
          label="Hip Measurement"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={values.hips}
          onChange={handleChange('hips')}
        />
        <h3> Nutrient Goals </h3>
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
        <TextField
          id="vegetables"
          label="Vegetable Goal"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={values.vegetables}
          onChange={handleChange('vegetables')}
        />
        <TextField
          id="protein"
          label="% Protein"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={values.protein}
          onChange={handleChange('protein')}
        />
        <TextField
          id="carb"
          label="% Carbs"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={values.carb}
          onChange={handleChange('carb')}
        />
        <TextField
          id="fat"
          label="% Fat"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={values.fat}
          onChange={handleChange('fat')}
        />
        <input className="btn-large" type="submit" value="Save" />
      </form>
    </div>
  );
}

export default UpdatePage;