import React, {useRef, useState} from 'react'
import {TextField, Button, Container, Typography, Link, Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'
import {useAuth} from '../contexts/AuthContext'
import { useHistory } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
    card: {
        width: 500,
        justifyContent: "center"
    },
    form : {
        width: '100%',
        marginBottom: 20
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    submissionButton: {
        marginTop: 16
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        color: 'black'
    },
    bottomButtons: {
        marginTop: 10
    }
}))

export default function Signup() {
    const classes = useStyles()

    const { signup } = useAuth()
    const [error, setError] = useState("")
    const [signupData, setSignupData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })
    const history = useHistory()

    async function signupClicked(event) {
        event.preventDefault()
        setError('')
        const email = signupData.email
        const password = signupData.password
        const confirmPassword = signupData.confirmPassword
        console.log("Signup data", signupData)
        console.log("Email", email, "Password", password, "Confirm password", confirmPassword)

        let isValid = true

        if (email === '' || password === '' || confirmPassword === '') {
            setError("Please fill all fields.")
            isValid = false
        } else {
            if (password.length < 8) {
                setError('Password must be 8+ characters long')
                isValid = false
            } else if (password.length > 20) {
                setError('Password must be less than 20 characters long')
                isValid = false
            } else if (password !== confirmPassword) {
                setError('Passwords do not match')
            }
            var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (!email.match(mailformat)) {
                setError('Email is incorrectly formatted')
                isValid = false
            }
            if (isValid) {
                try {
                    await signup(email, password)
                    
                } catch {
                    setError('Failed to sign you up')
                }
            }


            
                
        }
    }

    const handleChange = (event) => {
        setSignupData({
            ...signupData,
            [event.target.name]: event.target.value
        })
    }
    
    return (
        <Container component = 'main' 
        maxWidth = 'xs' 
        onSubmit={signupClicked}>
            
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                   <b>TelegramClone</b>
                </Typography>
                <Typography component="h1" variant="h6">
                   Sign up
                </Typography>
                <form noValidate className={classes.form}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={handleChange}
                        autoFocus
                    />
                    <br />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        name="password"
                        autoComplete="password"
                        onChange={handleChange}
                        autoFocus
                    />
                    <br />  
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="confirmPassword"
                        label="Confirm Password"
                        name="confirmPassword"
                        onChange={handleChange}
                        autoFocus
                    />
                    <br />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submissionButton}
                        >
                            Sign up
                    </Button>
                </form>
                
                {error && <Typography component="body" variant="subtitle1" color='error'>{error}</Typography>}
                <Grid container className={classes.bottomButtons}>
                    <Grid item xs> 
                      <Link href = "#" variant="body2"> Forgot Password? </Link>
                    </Grid>
                    <Grid item>
                        <Link href = "#" variant="body2"> Log into an account instead </Link>
                    </Grid>
                </Grid>
            </div>

        </Container>
                    
        
    )
}
