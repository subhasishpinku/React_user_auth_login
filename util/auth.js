import axios from 'axios';

const API_KEY = 'AIzaSyCeEQuPqMv8-rYB4D7VvymMG7SL2hXzUzA'

async function authenticate(mode, email, password) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  
    const response = await axios.post(url, {
      email: email,
      password: password,
      returnSecureToken: true,
    });
    // console.log(response.data);

    const token = response.data.idToken;
    
    return token;
  }
  
  export async function createUser(email, password) {
   const token = await authenticate('signUp', email, password);
   return token;
  }
  
  export  function login(email, password) {
   return authenticate('signInWithPassword', email, password);
  }