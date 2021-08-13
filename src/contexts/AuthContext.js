import { auth } from '../firebase';
import React , {useContext , useEffect , useState} from 'react';
import { useHistory } from 'react-router';

const authContext = React.createContext();

// make a function for export our entire context

export const useAuth = () => useContext(authContext)


export const AuthProvider = ({children})=>{
     const [loading, setloading] = useState(true);
     const [user, setuser] =  useState(null);
     const history = useHistory();

     useEffect(()=>{
         // this below function provide a user data
         auth.onAuthStateChanged((user)=>{    
               setuser(user);
               setloading(false);

              if(user) history.push('/chats');
         })
     },[user , history]);

     const value = { user }

     return (
         <authContext.Provider  value={value}>
           {!loading && children}
         </authContext.Provider>
     )
}