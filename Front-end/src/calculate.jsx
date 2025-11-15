import React, { useState } from 'react';

const Calculate = () => {
  const [data, setData] = useState([]);
  const [result, setResult] = useState(null);
  const [comparisonValue, setComparisonValue] = useState('');
  const [comparisonResult, setComparisonResult] = useState('');

  const handleDataChange = (e) => {
    const newData = e.target.value;
    setData(JSON.parse(newData));
  };

  const calculateMin = () => {
    const min = Math.min(...data.map(item => item.value));
    const minItem = data.find(item => item.value === min);
    setResult(`Minimum Value: ${JSON.stringify(minItem)}`);
  };

  const calculateMax = () => {
    const max = Math.max(...data.map(item => item.value));
    const maxItem = data.find(item => item.value === max);
    setResult(`Maximum Value: ${JSON.stringify(maxItem)}`);
  };

  const calculateTotal = () => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    setResult(`Total Value: ${total}`);
  };

  const handleComparisonChange = (e) => {
    setComparisonValue(Number(e.target.value));
  };

  const compareValues = (operator) => {
    const comparisonResults = data.filter(item => {
      switch (operator) {
        case 'greater':
          return item.value > comparisonValue;
        case 'less':
          return item.value < comparisonValue;
        case 'equal':
          return item.value === comparisonValue;
        default:
          return false;
      }
    });
    setComparisonResult(`Values ${operator === 'greater' ? 'greater' : operator === 'less' ? 'less' : 'equal'} than ${comparisonValue}: ${JSON.stringify(comparisonResults)}`);
  };

  return (
    <div className="calculate-container">
      <h2>Calculate from JSON Data</h2>
      <textarea onChange={handleDataChange} placeholder="Enter data in JSON format" />
      
      <div className="calculations">
        <button onClick={calculateMin}>Calculate Min</button>
        <button onClick={calculateMax}>Calculate Max</button>
        <button onClick={calculateTotal}>Calculate Total</button>
      </div>

      {result && <div className="result">{result}</div>}

      <div className="comparison">
        <input type="number" onChange={handleComparisonChange} placeholder="Enter comparison value" />
        <button onClick={() => compareValues('greater')}>Greater Than</button>
        <button onClick={() => compareValues('less')}>Less Than</button>
        <button onClick={() => compareValues('equal')}>Equal To</button>
      </div>

      {comparisonResult && <div className="comparison-result">{comparisonResult}</div>}
    </div>
  );
};

export default Calculate;
