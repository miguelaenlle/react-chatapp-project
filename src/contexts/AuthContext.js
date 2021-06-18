import React, {useContext, useState, useEffect} from "react"
import { auth } from '../firebase'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    function getUserEmail() {
        return auth.currentUser.email
    }
    function sendEmailValidationEmail() {
        console.log('Sending validation email')
        const actionCodeSettings = {

            url: '/'
        }
        return auth.currentUser.sendEmailVerification()
            .then(() => {
                console.log('Successfully sent email to', auth.currentUser.email)
                return ''
            })
            .catch((error) => {
                console.log('Error occured on email verification: ', error.message)

                return error.message
            })
    }
    function userIsEmailVerified() {
        return auth.currentUser.emailVerified
    }
    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
            .then(result => {
                return ''
            })
            .catch(error => {
                console.log("An error occured when resetting password", error.message)
                return error.message
            })
    }
    function signup(email, password) {
      return auth.createUserWithEmailAndPassword(email, password) 
        .then(result => {
            return ''
        })
        .catch(error => {
            console.log("An error occured when signing up for an account", error.message)
            return error.message
        })
    }
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
            .then(result => {
                return ''
            })
            .catch(error => {
                console.log("An error occured while logging in", error.message)
                return error.message
            })
    }
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          setCurrentUser(user)
          setLoading(false)
        })
    
        return unsubscribe
    }, [])
    
    const value = {
        currentUser,
        signup,
        login,
        resetPassword,
        sendEmailValidationEmail,
        userIsEmailVerified,
        getUserEmail
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}