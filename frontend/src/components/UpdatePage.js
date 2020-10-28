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
  

  const handleChange = (prop) => (event) => {
    setUserData({ ...userData, [prop]: event.target.value });
    console.log(event.target.value);
    console.log(userData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( userData )
    };
    fetch('/update', requestOptions)
        .then(response => response.json())
  };

  // Delay until fetch. Consider spinner, but if it loads too fast it will flash. Worth
  // Implementing a delay and then loading the spinner? Or just assume it's a light enough GET?
  if (userData == 0) {
      return <div />
  }

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
          defaultValue={userData.bodyweight}
          onChange={handleChange('bodyweight')}
        /> <br/>
        <TextField
          id="bust"
          label="Bust Measurement"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={userData.bust}
          onChange={handleChange('bust')}
        />
        <TextField
          id="waist"
          label="Waist Measurement"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={userData.waist}
          onChange={handleChange('waist')}
        />
        <TextField
          id="hips"
          label="Hip Measurement"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={userData.hips}
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
          defaultValue={userData.water_amount}
          onChange={handleChange('water_amount')}
        />
        <TextField
          id="vegetables"
          label="Vegetable Goal"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={userData.vegetables}
          onChange={handleChange('vegetables')}
        />
        <TextField
          id="protein"
          label="% Protein"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={userData.protein}
          onChange={handleChange('protein')}
        />
        <TextField
          id="carb"
          label="% Carbs"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={userData.carb}
          onChange={handleChange('carb')}
        />
        <TextField
          id="fat"
          label="% Fat"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={userData.fat}
          onChange={handleChange('fat')}
        />
        <input className="btn-large" type="submit" value="Save" />
      </form>
    </div>
  );
}

export default UpdatePage;