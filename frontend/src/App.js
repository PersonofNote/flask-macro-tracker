import React, { useState, useEffect, PureComponent } from 'react';
import {
  PieChart, Pie, Legend, Tooltip, Sector, Cell,
} from 'recharts';
import './App.css';

function App() {
  const [userData, setUserData] = useState(0);

useEffect(() => {
  fetch('/user/', {
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
     }}).then(res => res.text()).then(data => {
    setUserData(data.time);
    console.log(data);
  });
}, []);
  //Rechart
  
  const data = [
    { name: 'Carbs', value: 400 },
    { name: 'Protein', value: 300 },
    { name: 'Fat', value: 278 },
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
    <div className="App">
      <div className="row" style={{
          display: `flex`,
          flexDirection: `row`
      }}>
      <p>The current time is {userData}.</p>
      <div style={{
          display: `flex`,
          flexDirection: `column`
      }}>
        <PieChart width={250} height={245}>
          <Pie
            data={data.time}
            cx={124}
            cy={125}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {
              data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
            }
          </Pie>
        </PieChart>
        <h2> 400/1200</h2>
      </div>
        <p> placeholder </p>
      </div>
      <div className="form-entry">
            <form>
              <input></input>
            </form>
      </div>
    </div>
  );
}

export default App;
