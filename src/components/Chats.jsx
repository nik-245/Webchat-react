import React , {useRef , useState , useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import {ChatEngine} from 'react-chat-engine';
import { auth } from '../firebase';
import {useAuth} from '../contexts/AuthContext'
import axios from 'axios';
import Loder from './Loder';

//put all private key into envirment variable

const Chats = () => {
    const history = useHistory();
    const {user} = useAuth();
    const [loading, setLoading] = useState(true);

    const handleLogout = async ()=>{
        await auth.signOut();
        history.push('/');
    }
 
    const getFile = async (url)=>{
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data] , "userPhoto.jpg" , {type : 'image/jpeg'})
    }
    
    useEffect(()=>{
         if (!user) {
             history.push('/');
             return;
         }
         axios.get('https://api.chatengine.io/users/me',{
             headers : {
                "project-id": "dac532f4-1bd5-402a-8538-82f3f8ecfc55",
                "user-name" : user.email ,
                "user-secret":user.uid,
             }
         })
         .then(()=>{
            setLoading(false);    
         })
         .catch(()=>{
             let formdata = new FormData();
             formdata.append('email',user.email);
             formdata.append('username',user.email);
             formdata.append('secret',user.uid);
            
              getFile(user.photoURL)
              .then((avatar)=>{
                 formdata.append('avatar' , avatar , avatar.name);

                 axios.post('https://api.chatengine.io/users/', formdata ,{
                     headers :{ "private-key" : process.env.REACT_CHAT_ENGINE_KEY }
                 })
                 .then(()=>{setLoading(false)})
                 .catch((error)=> console.log(error))
              })
         })
     }, [user , history]);

     if(!user || loading)  return <Loder/>;    
     
     return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    Webchat
                </div>
                <div onClick={handleLogout} className="logout-tab">
                    Logout
                </div>
            </div>
                
                <ChatEngine 
                   hight="calc(100vh-66px)"
                   projectID="dac532f4-1bd5-402a-8538-82f3f8ecfc55"
                   userName={user.email}
                   userSecret={user.uid}  
                />
        </div>
    )
}

export default Chats;
