import {createContext, useState, useState} from 'react';

export const AuthContext = createContext({
    token: '',
    isAuthenticated: false,
    authenticate: () => {},
    logout: () => {}

});

function AuthContextProvider({children}){
    const [authToken, setAuthToken] = useState();

    function authenticate(){
        
    }
  return <AuthContext.Provider>{children}</AuthContext.Provider>
}

export default AuthContextProvider;
