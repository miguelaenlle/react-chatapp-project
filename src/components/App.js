import './App.css';

import React from 'react'
import Signup from './Signup'
import Login from './Login'
import ConfirmEmail from './ConfirmEmail'
import PasswordReset from './PasswordReset'
import { AuthProvider } from "../contexts/AuthContext"
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <Route path="/signup" component={Signup}/> 
          <Route path="/confirm-signup" component={ConfirmEmail}/>
          <Route path="/login" component={Login}/> 
          <Route path="/forgot-password" component={PasswordReset}/> 
          
        </AuthProvider>
      </Router>
    </MuiThemeProvider>
    
  );
}

export default App;
