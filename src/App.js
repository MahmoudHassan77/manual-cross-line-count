import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import './App.css';

function App() {
  const [step, setStep] = useState('form'); // 'form' or 'tracking'
  const [storeName, setStoreName] = useState('');
  const [numberOfLines, setNumberOfLines] = useState('');
  const [lineNames, setLineNames] = useState([]);
  const [records, setRecords] = useState([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('crosslineData');
    if (savedData) {
      const data = JSON.parse(savedData);
      setStoreName(data.storeName || '');
      setLineNames(data.lineNames || []);
      setRecords(data.records || []);
      if (data.storeName && data.lineNames && data.lineNames.length > 0) {
        setStep('tracking');
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (storeName || lineNames.length > 0 || records.length > 0) {
      localStorage.setItem('crosslineData', JSON.stringify({
        storeName,
        lineNames,
        records
      }));
    }
  }, [storeName, lineNames, records]);

  const handleNumberOfLinesChange = (e) => {
    const num = parseInt(e.target.value) || 0;
    setNumberOfLines(e.target.value);
    
    // Initialize line names array
    const newLineNames = Array(num).fill('').map((_, index) => 
      lineNames[index] || ''
    );
    setLineNames(newLineNames);
  };

  const handleLineNameChange = (index, value) => {
    const newLineNames = [...lineNames];
    newLineNames[index] = value;
    setLineNames(newLineNames);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (storeName && lineNames.every(name => name.trim() !== '')) {
      setStep('tracking');
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleButtonClick = (lineName, type) => {
   const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const datetime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`; // YYYY-MM-DD HH:MM:SS
    
    const newRecord = {
      lineName,
      type, // 'In' or 'Out'
      datetime,
      timestamp: now.getTime() // For sorting
    };
    
    setRecords([...records, newRecord]);
  };

  const exportRecords = () => {
    // Prepare data for export
    const data = records.map(record => ({
      'Line Name': record.lineName,
      'Type': record.type,
      'DateTime': record.datetime || `${record.date} ${record.time}` // Support both old and new format
    }));
    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Records');

    // Download
    XLSX.writeFile(wb, `${storeName}_Records_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const exportSummary = () => {
    // Calculate totals for each line
    const summary = {};
    
    lineNames.forEach(lineName => {
      summary[lineName] = { In: 0, Out: 0 };
    });

    records.forEach(record => {
      if (summary[record.lineName]) {
        summary[record.lineName][record.type]++;
      }
    });

    // Prepare data for export
    const data = Object.keys(summary).map(lineName => ({
      'Line Name': lineName,
      'Total In': summary[lineName].In,
      'Total Out': summary[lineName].Out,
      'Net Count': summary[lineName].In - summary[lineName].Out
    }));

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Summary');

    // Download
    XLSX.writeFile(wb, `${storeName}_Summary_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset? This will clear all data.')) {
      setStoreName('');
      setNumberOfLines('');
      setLineNames([]);
      setRecords([]);
      setStep('form');
      localStorage.removeItem('crosslineData');
    }
  };

  const getSummaryForLine = (lineName) => {
    const inCount = records.filter(r => r.lineName === lineName && r.type === 'In').length;
    const outCount = records.filter(r => r.lineName === lineName && r.type === 'Out').length;
    return { in: inCount, out: outCount, net: inCount - outCount };
  };

  if (step === 'form') {
    return (
      <div className="App">
        <div className="container">
          <h1>Manual Cross Line Count</h1>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="storeName">Store Name:</label>
              <input
                type="text"
                id="storeName"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                placeholder="Enter store name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="numberOfLines">Number of Lines:</label>
              <input
                type="number"
                id="numberOfLines"
                value={numberOfLines}
                onChange={handleNumberOfLinesChange}
                placeholder="Enter number of lines"
                min="1"
                required
              />
            </div>

            {lineNames.length > 0 && (
              <div className="form-group">
                <label>Line Names:</label>
                {lineNames.map((name, index) => (
                  <input
                    key={index}
                    type="text"
                    value={name}
                    onChange={(e) => handleLineNameChange(index, e.target.value)}
                    placeholder={`Line ${index + 1} name`}
                    required
                    className="line-input"
                  />
                ))}
              </div>
            )}

            <button type="submit" className="btn btn-primary">
              Start Tracking
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <h1>{storeName}</h1>
          <button onClick={handleReset} className="btn btn-secondary btn-small">
            Reset
          </button>
        </div>

        <div className="lines-container">
          {lineNames.map((lineName, index) => {
            const summary = getSummaryForLine(lineName);
            return (
              <div key={index} className="line-card">
                <h3 className="line-name">{lineName}</h3>
                <div className="summary">
                  <span className="summary-item in">In: {summary.in}</span>
                  <span className="summary-item out">Out: {summary.out}</span>
                  <span className="summary-item net">Net: {summary.net}</span>
                </div>
                <div className="button-group">
                  <button
                    onClick={() => handleButtonClick(lineName, 'In')}
                    className="btn btn-in"
                  >
                    IN
                  </button>
                  <button
                    onClick={() => handleButtonClick(lineName, 'Out')}
                    className="btn btn-out"
                  >
                    OUT
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="export-section">
          <h3>Export Data</h3>
          <div className="export-buttons">
            <button
              onClick={exportRecords}
              className="btn btn-export"
              disabled={records.length === 0}
            >
              📊 Download Records
            </button>
            <button
              onClick={exportSummary}
              className="btn btn-export"
              disabled={records.length === 0}
            >
              📈 Download Summary
            </button>
          </div>
          <p className="record-count">Total Records: {records.length}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
