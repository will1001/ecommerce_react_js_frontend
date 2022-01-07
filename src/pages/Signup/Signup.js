
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../../actions/authActions";
import Navbar from "../../components/Navbar/Navbar";


const Signup = ()=>{
    const { isAuthenticated } = useSelector((state)=>state.authReducer)
    const dispatch = useDispatch();

    const [formData,setFormData] = useState({
        username:'',
        email:'',
        phone:'',
        address:'',
        password:'',
        confirm_password:'',
       
    })

    const {username,email,phone,address,password,confirm_password} = formData;

    const onChange = e=>setFormData({...formData,[e.target.name]:e.target.value});

    const onClick = (e)=>{
        e.preventDefault();
        dispatch(register({
            username: username,
            email: email,
            phone: phone,
            address: address,
            password: password,
        }))
    }

    useEffect(()=>{
        if(isAuthenticated){
           window.location.replace('/member')
        }
    },[dispatch,isAuthenticated])


    return (
        <div>
            <Navbar />
            <form onSubmit={e=>onClick(e)}>
                <div>
                    <input 
                    type="text" 
                    name="username" 
                    value={username}
                    placeholder="Username"
                    onChange={e=>onChange(e)}
                    required
                    />
                </div>
                <div>
                    <input 
                    type="text" 
                    name="email" 
                    value={email}
                    placeholder="Email"
                    onChange={e=>onChange(e)}
                    required
                    />
                </div>
                <div>
                    <input 
                    type="text" 
                    name="address" 
                    value={address}
                    placeholder="Address"
                    onChange={e=>onChange(e)}
                    required
                    />
                </div>
                <div>
                    <input 
                    type="number" 
                    name="phone" 
                    value={phone}
                    placeholder="Phone"
                    onChange={e=>onChange(e)}
                    required
                    />
                </div>
                <div>
                    <input 
                    type="password" 
                    name="password" 
                    value={password}
                    placeholder="Password"
                    onChange={e=>onChange(e)}
                    required
                    />
                </div>
                <div>
                    <input 
                    type="password" 
                    name="confirm_password" 
                    value={confirm_password}
                    placeholder="Confirm Password"
                    onChange={e=>onChange(e)}
                    required
                    />
                </div>
                <button>signup</button>
            </form>
            <div>
                <h3>Have account ?</h3>
                <Link to={'/login'}>
                    <span>Login here</span>
                </Link>
            </div>
        </div>
    )
}

export default Signup;