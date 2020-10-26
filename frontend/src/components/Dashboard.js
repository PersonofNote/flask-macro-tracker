/**
 * TODO: Break into subcomponents and render conditionally
 */

import React, { useState, useEffect } from 'react'

import {
  PieChart, Pie, Legend, Tooltip, Sector, Cell,
} from 'recharts'

function Dashboard() {
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

    console.log(userData);

    const handleSubmit = (event) => {
      // TODO: Construct post request to add data to days
      // Construct post request by iterating over (not-empty) values in form
      // Set user data to new result
    };

  const chartData = [
    { name: 'Carbs', value: userData['carb_goal'] },
    { name: 'Protein', value: userData['protein_goal'] },
    { name: 'Fat', value: userData['fat_goal']},
  ];
  

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent, index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="" style={{height: `100vh`}}>
      <div className="row" style={{
          display: `flex`,
          flexDirection: `row`
      }}>
        <div style={{
            display: `flex`,
            flexDirection: `column`
        }}>
          <PieChart width={250} height={245}>
            <Pie
              data={chartData}
              cx={124}
              cy={125}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {
                chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
              }
            </Pie>
          </PieChart>
          <h2> 400/{userData['calorie_total']}</h2>
          <div className="form-entry">
            <form>
              <input></input>
              <input></input>
              <input></input>
            </form>
      </div>
        </div>
        <div style={{
          display: `flex`,
          flexDirection: `column`,
          width: `100%`
        }}>
          <div style={{
            margin: `auto`,
            marginTop: `2rem`,
            height: `12rem`,
            width: `2rem`,
            border: `4px solid gray`,
            borderRadius: `16px`
          }}></div>
           <h2> 0/{userData['water_amount']}</h2>
        </div>
      </div>
      <div className="row">
        {userData['bust']},
        {userData['waist']},
        {userData['hips']}
      </div>
    </div>
  );
}

export default Dashboard;
