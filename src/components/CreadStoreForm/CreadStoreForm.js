import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.css'
import { createStore } from "../../actions/userActions";


let tokenParse = [];
const CreadStoreForm = ()=>{

    const { token } = useSelector((state)=>state.authReducer)

    const [name,setName] = useState('')
    const dispatch = useDispatch();

    const onSubmit = e=>{
        e.preventDefault();
        dispatch(createStore({
            'userId' : tokenParse?.id,
            'name' : name
        }))
    
    }

    useEffect(()=>{
        if(token !== null && token !== 'undefined'){
            tokenParse = JSON.parse(token);
        }
    },[dispatch])

    return (
        <div className={styles.container}>
            <form onSubmit={e=>onSubmit(e)} >
                <input type="text" name="name" placeholder='Store Name' value={name} onChange={e=>setName(e.target.value)} />
                <button type="Submit">Submit</button>

            </form>
        </div>
    )
}


export default CreadStoreForm;