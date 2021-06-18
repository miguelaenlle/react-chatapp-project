import firebase from 'firebase'
import firebaseConfig from './util/config'
import 'firebase/auth'

const app = firebase.initializeApp(firebaseConfig)
export const auth = app.auth()
export default app;