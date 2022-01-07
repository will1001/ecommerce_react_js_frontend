import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../actions/authActions";
import Navbar from "../../components/Navbar/Navbar";


const Login = ()=>{
    const { isAuthenticated } = useSelector((state)=>state.authReducer)
    const dispatch = useDispatch();
    const [formData,setFormData] = useState({
        email:'',
        password:''
    })

    const {email,password} = formData;

    const onChange = e=>setFormData({...formData,[e.target.name]:e.target.value});

    const onClick = ()=>{
        dispatch(login(email,password))
    }

    useEffect(()=>{
        if(isAuthenticated){
           window.location.replace('/member')
        }
    },[dispatch,isAuthenticated])
    
    return (
        <div>
            <Navbar />
            <div>
                <input type="text" 
                name="email" 
                placeholder="Email" 
                value={email} 
                onChange={e=>onChange(e)} 
                required />
            </div>
            <div>
                <input type="password" 
                name="password" 
                placeholder="Password" 
                value={password} 
                onChange={e=>onChange(e)} 
                required />
            </div>
            <div>
                <button onClick={onClick}>Login</button>
            </div>
            <div>
                <h3>Not have account ?</h3>
                <Link to={'/signup'}>
                    <span>Register here</span>
                </Link>
            </div>
        </div>
    )
}

export default Login;