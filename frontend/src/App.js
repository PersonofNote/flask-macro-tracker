import React, { PureComponent } from 'react';
import UserList from './components/UserList';
import { createStore } from 'redux';
import {
  PieChart, Pie, Legend, Tooltip, Sector, Cell,
} from 'recharts';
import './App.css';

const defaultState = { checked: false };
const reducer = function(state = defaultState, action) {
  switch (action.type) {
    case 'TOGGLE':
      return {...state, checked: !state.checked};
  }
  return state;
};
const store = createStore(reducer);

function App() {
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
      <div style={{
          display: `flex`,
          flexDirection: `column`
      }}>
        <PieChart width={250} height={245}>
          <Pie
            data={data}
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
      TEST
      <UserList/>
    </div>
  );
}

export default App;
