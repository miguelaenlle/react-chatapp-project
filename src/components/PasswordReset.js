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
    },
    successMessage: {
        color: "#52b202",
        marginBottom: 20
    },
    errorMessage: {
        marginBottom: 20
    }


}))

export default function PasswordReset() {
    const classes = useStyles()

    const {resetPassword} = useAuth()
    // TODO: Set pwd reset function
    const [error, setError] = useState("")
    const [emailToSendTo, setEmailToSendTo] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const history = useHistory()

    async function loginClicked(event) {
        event.preventDefault()
        setError('')
        setSuccessMessage('')
        
        const passwordResetStatus = await resetPassword(emailToSendTo)     
        if (passwordResetStatus === '') {
            setSuccessMessage(`A reset email was sent to ${emailToSendTo}. Check your inbox for further instructions.`)
        } else {
            setError(passwordResetStatus)
        }
            
    }

    const handleChange = (event) => {
        setEmailToSendTo(
            event.target.value
        )
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
                   Reset password
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
                    
                    <br />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submissionButton}
                        >
                            Reset email
                    </Button>
                </form>
                
                {error && 
                <Typography 
                    component="body" 
                    variant="subtitle1"
                    className={classes.errorMessage}
                    color='error'>
                        {error}
                 </Typography>}
                {successMessage && 
                <Typography 
                    component="body"
                    variant="subtitle1" 
                    className={classes.successMessage}
                    color='initial'>
                        
                        {successMessage}
                </Typography>}
                
                <Link href = "/login" variant="body2">Go back to login </Link>
                  
            </div>

        </Container>
                    
        
    )
}
