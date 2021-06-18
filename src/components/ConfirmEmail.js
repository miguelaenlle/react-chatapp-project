import React, {useState, useEffect} from 'react'
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
        marginTop: 16,
        marginBottom: 20
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

export default function ConfirmEmail() {
    const classes = useStyles()

    const { userIsEmailVerified, sendEmailValidationEmail, getUserEmail } = useAuth()
    const [error, setError] = useState("")
    const [emailMessage, setEmailMessage] = useState('')
    const history = useHistory()
   
    useEffect(async () => {
        if (getUserEmail()) {
            console.log('Current email', getUserEmail())
            setEmailMessage(`An email was sent to ${getUserEmail()}`)
            const validationEmailMessage = await sendEmailValidationEmail();
            if (validationEmailMessage !== '') {
                setError(validationEmailMessage)
            } else {
                setEmailMessage(`An email was sent to ${getUserEmail()}`)
            }
        } else {
            history.push('/')
        }

      }, [])
    
    async function verifyUser(event) {
        if (userIsEmailVerified()) {
            history.push('/')
        } else {
            setError('Please click the link sent to your email.')
        }
    }

    
    return (
        <Container component = 'main' 
        maxWidth = 'xs'>
            
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                   <b>TelegramClone</b>
                </Typography>
                <Typography component="h1" variant="h6">
                   Confirm your email
                </Typography>
                {emailMessage && 
                <Typography component="h1" variant="subtitle1">
                   {emailMessage}
                </Typography>
                }
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submissionButton}    
                    onClick={() => {verifyUser()}}

                    >
                        Confirm Email
                </Button>
                
                {error && <Typography component="body" variant="subtitle1" color='error'>{error}</Typography>}
                <Grid container className={classes.bottomButtons}>
                    <Grid item xs> 
                      <Link href = "/signup" variant="body2"> Go back to signup </Link>
                    </Grid>
                    <Grid item>
                        <Button onClick={() => {sendEmailValidationEmail()}}> Resend email </Button>
                    </Grid>
                </Grid>
            </div>

        </Container>
                    
        
    )
}
