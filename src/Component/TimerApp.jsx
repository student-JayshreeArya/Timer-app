import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "../index.css";

const TimerApp = () => {
  const [number, setNumber] = useState('');
  const [countdown, setCountdown] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setMsg('Countdown finished!');
      setTimeout(()=>{window.location.reload()},2000)
    }

    return () => clearTimeout(timer);
    
  }, [countdown]);

  const startTimer = () => {
    if (validateInput(number)) {
      setCountdown(Math.floor(number));
      setMsg('');
      setError('');
      setIsTimerRunning(true);
      setNumber('');
    }
  };

  const stopTimer = () => {
    clearTimeout();
    setIsTimerRunning(false);
    setCountdown('');
    setMsg('');
    setError('');
    setNumber('');
  };

  const validateInput = (input) => {
    //input.includes('.') 
    if (input === '' || isNaN(input) || input < 0) {
      setError('Please enter a positive integer');
      return false;
    } else if (input > 20) {
      setError('Number should not be greater than 20');
      return false;
    } else if (input === '0') {
      setError('Number should not be zero');
      return false;
    }
    return true;
  };

  return (
    <div className='container'>
      <div className="box">
        <h2>Timer App</h2>
        <div className='textfield'>
          <TextField
            fullWidth
            type="number"
            value={number}
            onChange={(event) => setNumber(event.target.value)}
            error={error !== ''}
            helperText={error}
            label="Enter Number"
            disabled={isTimerRunning}
          />
        </div>
        <div className='button'>
          {!isTimerRunning && countdown === '' && (
            <Button
              fullWidth
              variant="contained"
              onClick={startTimer}
              disabled={isTimerRunning}
              style={{ marginBottom: '10px' }}
            >
              Start Timer
            </Button>
          )}
          {isTimerRunning && (
            <Button
              fullWidth
              variant="contained"
              onClick={stopTimer}
              className="stop-button"
              style={{ marginBottom: '10px' }}
            >
              Stop Timer
            </Button>
          )}
        </div>
        <div className="timer">
          {countdown}
          {msg && countdown === 0 && <p>{msg}</p>}
        </div>
      </div>
    </div>
  );
};

export default TimerApp;
