import styles from './styles.module.css'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../actions/authActions";
import { getStore, getUser } from "../../actions/userActions";
import Navbar from '../../components/Navbar/Navbar';
import StoreInfoPanel from '../../components/StoreInfoPanel/StoreInfoPanel';
import CreadStoreForm from '../../components/CreadStoreForm/CreadStoreForm';



let tokenParse = [];
let tokenReady = false
const MemberPages = ()=>{
    const { token } = useSelector((state)=>state.authReducer)
    const { user, store, isLoading } = useSelector((state)=>state.userReducer)

    const dispatch = useDispatch();
    const [showForm,setShowForm] = useState(false);
    const [storeCreated,setStoreCreated] = useState(false);

    const onClick=()=>{
        dispatch(logout());
        window.location.replace('/')
    }

    useEffect(()=>{
        if(token !== null && token !== 'undefined'){
            tokenParse = JSON.parse(token);
            tokenReady = (token !== null && token !== 'undefined')
            dispatch(getUser(tokenParse?.id));
            dispatch(getStore(tokenParse?.id));
        }

        if(!isLoading){
            if(store?.length !== 0){
                setStoreCreated(true);
            }
        }

    },[dispatch,isLoading,store])

    return (
       <>
            <Navbar />
            <div className={styles.container}>
                <h1>Hi {user?.username}</h1>
                <div>
                    <ul>
                        <li>Username : {isLoading?'Loading . . .':user?.username}</li>
                        <li>Email : {isLoading?'Loading . . .':user?.email}</li>
                        <li>Phone : {isLoading?'Loading . . .':user?.phone}</li>
                        <li>Address : {isLoading?'Loading . . .':user?.address}</li>
                    </ul>
                </div>
            </div>
            <div>
                <h5>{storeCreated?'Your Store':'Become a seller'}</h5>
                {storeCreated?<span></span>:showForm?<div></div>:<button onClick={()=>setShowForm(true)}>Create Store</button>}
                {storeCreated?<StoreInfoPanel store={store} loading={isLoading} />:showForm?<CreadStoreForm />:<span></span>}
            </div>
            <div>
                <br />
                <br />
                <br />
                <button onClick={onClick}>Logout</button>
            </div>
       </>
    )
}

export default MemberPages;