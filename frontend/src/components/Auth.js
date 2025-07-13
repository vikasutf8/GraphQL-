import React from 'react';
import './auth.css';
import axios from 'axios';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(false); // Default to Register if not explicitly login
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate(); // Initialize useNavigate

    const toggleButton = () => {
        setIsLogin(prevIsLogin => !prevIsLogin); // Use functional update for state
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const currentEmail = emailRef.current.value;
        const currentPassword = passwordRef.current.value;

        if (!currentEmail || !currentPassword) {
            console.log('Email or password cannot be empty.');
            return;
        }

        console.log('Attempting to send:', { email: currentEmail, password: currentPassword, isLoginMode: isLogin });

        let requestBody;

        if (isLogin) {
            requestBody = {
                query: `
                    query {
                        login(email: "${currentEmail}", password: "${currentPassword}") {
                            userId
                            token
                            tokenExpiry
                        }
                    }   
                `
            };
        } else { // Register mode
            requestBody = {
                query: `
                    mutation {
                        createUser(userInput: {
                            email: "${currentEmail}",
                            password: "${currentPassword}"
                        }) {
                            _id
                            email
                        }
                    }
                `
            };
        }

        try {
            const response = await axios.post('http://localhost:3000/graphql', requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            console.log('Backend response:', response.data);

            if (isLogin) {
                // Handle Login Response
                if (response.data.data && response.data.data.login) {
                    const { userId, token, tokenExpiry } = response.data.data.login;
                    console.log('Logged in successfully:', { userId, token, tokenExpiry });
                    // Store token, userId, expiry (e.g., in localStorage or Context)
                    // Then navigate
                    navigate('/'); // Redirect to /events page
                } else if (response.data.errors) {
                    console.error('GraphQL Login Errors:', response.data.errors);
                    // Display error to user (e.g., invalid credentials)
                }
            } else {
                // Handle Register Response
                if (response.data.data && response.data.data.createUser) {
                    console.log('User registered successfully:', response.data.data.createUser);
                    // Optionally log in the user directly after registration,
                    // or switch to login mode and prompt them to log in.
                    // For now, let's just redirect assuming success.
                    navigate('/events'); // Redirect to /events page after registration
                    // Or you might want to setIsLogin(true) to show login form for newly registered user.
                } else if (response.data.errors) {
                    console.error('GraphQL Registration Errors:', response.data.errors);
                    // Display error to user (e.g., email already exists)
                }
            }
        } catch (error) {
            console.error('Network or server error:', error);
            if (error.response) {
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
                console.error('Error response headers:', error.response.headers);
            } else if (error.request) {
                console.error('Error request:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
            // Display a generic error message to the user
        }
    };

    return (
        <form className='auth-form' onSubmit={submitHandler}>
            <div className='form-control'>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" placeholder="Enter your email" required ref={emailRef} />
            </div>
            <div className='form-control'>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder="Enter your password" required ref={passwordRef} />
            </div>
            <div>
                <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
                <button type="button" onClick={toggleButton}>Switch to {isLogin ? 'Register' : 'Login'}</button>
            </div>
        </form>
    );
}

export default Auth;