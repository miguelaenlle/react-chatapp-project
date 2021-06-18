import React, {useState} from 'react'
import {TextField, Button, Container, Typography, Link, Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'
import {useAuth} from '../contexts/AuthContext'
import  {useHistory} from "react-router-dom"
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
export default function Login() {
    const classes = useStyles()

    const {login, userIsEmailVerified} = useAuth()
    
    const [error, setError] = useState("")
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })
    const history = useHistory()

    async function loginClicked(event) {
        event.preventDefault()
        setError('')
        const email = loginData.email
        const password = loginData.password
        
        const loginStatus = await login(email, password)     
        if (loginStatus === '') {
            console.log("User is email verified", userIsEmailVerified())
            if (userIsEmailVerified()) {
                history.push('/')
            } else {
                history.push('/confirm-signup')
            }
        } else {
            setError(loginStatus)
        }
            
    }

    const handleChange = (event) => {
        setLoginData({
            ...loginData,
            [event.target.name]: event.target.value
        })
    }
    
    return (
        <Container 
            component = 'main' 
            maxWidth = 'xs' 
            onSubmit={loginClicked}>
            
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                   <b>TelegramClone</b>
                </Typography>
                <Typography component="h1" variant="h6">
                   Log in
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
                    
                    <br />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submissionButton}
                        >
                            Log in
                    </Button>
                </form>
                
                {error && <Typography component="body" variant="subtitle1" color='error'>{error}</Typography>}
                <Grid container className={classes.bottomButtons}>
                    <Grid item xs> 
                      <Link href = "/forgot-password" variant="body2"> Forgot Password? </Link>
                    </Grid>
                    <Grid item>
                        <Link href = "/signup" variant="body2"> Make an account instead </Link>
                    </Grid>
                </Grid>
            </div>

        </Container>
                    
        
    )
}
