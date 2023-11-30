import React, {useRef, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Alert} from "@mui/material";
import {CustomError} from "../model/CustomError";
import {registerUser} from "./registerApi";
import Callback from "pusher-js/types/src/core/events/callback";



function Register() {
    const [error, setError] = useState({} as CustomError);
    const refPassword = useRef<HTMLInputElement>(null) ;
    const refPasswordConf = useRef<HTMLInputElement>(null);
    const [errorMessage, setErrorMessage] = useState('');
    const refFrom = useRef<HTMLFormElement>(null);


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        registerUser({user_id: -1, email : data.get('email') as string, username:  data.get('login') as string, password: data.get('password') as string},
            (result: Callback) => {
                console.log('Registration successful: ', result);
                window.location.href = '/login';
            },
            (loginError: CustomError) => {
                console.error('Registration error: ', loginError);
                setError(loginError);
            });
    };

    const handleSubmitError = () => {
        // prevenet submit if passwords do not match

        if (refPassword.current?.value !== refPasswordConf.current?.value) {
            setErrorMessage('Passwords do not match!') ;
        } else {
            setErrorMessage('');
            console.log('Password:', refPassword.current?.value);
        }
    };


    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}  ref={refFrom}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="login"
                        label="Login"
                        name="login"
                        autoComplete="login"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        inputRef={refPassword}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmpassword"
                        label="confirmpassworld"
                        type="password"
                        id="confirmpassword"
                        onInput={handleSubmitError}
                        inputRef={refPasswordConf}
                        />
                    {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                </Box>

            </Box>
            { error.message &&
                <Alert severity="error">{error.message}</Alert>
            }
        </Container>
    );
}

export default Register;
