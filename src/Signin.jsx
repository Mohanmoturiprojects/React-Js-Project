import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Login() {
    const navigate = useNavigate(); // Initialize useNavigate
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [mobile, setMobile] = useState('');

    const resetForm = () => {
        setUsername('');
        setPassword('');
        setEmail('');
        setGender('');
        setMobile('');
        setError('');
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Both fields are required');
            return;
        }
        if (username === 'mohan' && password === 'mohan@123') {
            alert('Login successful!');
            setError('');
            navigate('/home'); // Navigate to home page
        } else {
            setError('Invalid credentials');
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();
        if (!username || !email || !password || !gender || !mobile) {
            setError('All fields are required');
            return;
        }
        alert('Registration successful!');
        resetForm();
        setIsRegistering(false);
    };

    const handleForgotPassword = () => {
        alert('Redirecting to forgot password page...');
    };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h2>{isRegistering ? 'Register' : 'Login'} Page</h2>

      <form
        onSubmit={isRegistering ? handleRegister : handleLogin}
        style={{ display: 'flex', flexDirection: 'column', width: '300px' }}
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginBottom: '10px', padding: '10px' }}
        />

        {isRegistering && (
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ marginBottom: '10px', padding: '10px' }}
            />
          </>
        )}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: '10px', padding: '10px' }}
        />

        {isRegistering && (
          <>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              style={{ marginBottom: '10px', padding: '10px' }}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <input
              type="text"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              style={{ marginBottom: '10px', padding: '10px' }}
            />
          </>
        )}

        {error && (
          <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>
        )}

        <button type="submit" style={{ padding: '10px', cursor: 'pointer' }}>
          {isRegistering ? 'Register' : 'Login'}
        </button>
      </form>

      {!isRegistering && (
        <button
          onClick={handleForgotPassword}
          style={{
            marginTop: '15px',
            background: 'none',
            border: 'none',
            color: 'blue',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          Forgot Password?
        </button>
      )}

      <button
        onClick={() => {
          setIsRegistering(!isRegistering);
          setError('');
          resetForm();
        }}
        style={{
          marginTop: '15px',
          background: 'none',
          border: 'none',
          color: 'green',
          cursor: 'pointer',
          textDecoration: 'underline',
        }}
      >
        {isRegistering ? 'Already have an account? Login' : 'New user? Register'}
      </button>
    </div>
  );
}

export default Login;
