import React from 'react'
import Signup from './Signup'
import { AuthProvider } from "../contexts/AuthContext"

import "./App.css"
function App() {
  return (
    <AuthProvider>
      <div>
        <Signup />
      </div>
    </AuthProvider>
  );
}

export default App;
