import styles from './styles.module.css'
import { Link, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  useEffect, useState} from "react";
import { getCart } from "../../actions/cartActions";

let tokenParse = [];
let tokenReady = false;

const Navbar = ()=>{
    const {cart,loading} = useSelector((state)=>state.cartReducer)
    const {token} = useSelector((state)=>state.authReducer)

    const dispatch = useDispatch();

    const [keyword,setKeyword] = useState("")

    const navigate = useNavigate();


    const search = (e,actionKey)=>{
        if(actionKey === 'pressed enter'){
            if(e.keyCode === 13){
                navigate('/product',{state:{keyword:keyword,category:''}});
            }
        }else{
            navigate('/product',{state:{keyword:keyword,category:''}});
        }
    }
   

    useEffect(()=>{
        if(token !== null && token !== 'undefined'){
            tokenParse = JSON.parse(token);
            tokenReady = (token !== null && token !== 'undefined')
            dispatch(getCart(tokenParse?.id))
        }
    },[dispatch,token])

    return (
        <div className={styles.container}>
            <Link to={'/'}>
                <div className={styles.logo}>
                    <img src="https://img2.pngdownload.id/20180519/jjs/kisspng-e-commerce-logo-electronic-business-5b00d2d0918d84.2335269315267806245962.jpg" alt="logo" />
                </div>
            </Link>
            <div className={styles.search}>
                    <input onKeyDown={e=>search(e,"pressed enter")} type="text" name="search" value={keyword}
                    onChange={e=>setKeyword(e.target.value)}
                    />
                    <img onClick={e=>search(e,"")} src="https://cdn0.iconfinder.com/data/icons/very-basic-2-android-l-lollipop-icon-pack/24/search-512.png" alt="search-icon" />
            </div>
            <div className={styles.cart_container}>
                <Link to={'/login'} style={{textDecoration:'none',color:'black'}}>
                    <div className={styles.login_signup}>
                        {tokenReady?<img src="https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png" alt="user-icon" />:<span>Login</span>}
                    </div>
                </Link>
                <div className={styles.cart}>
                    <Link to={'/cartView'} state={{cartId:cart?.id}}>
                        <img src="https://www.freeiconspng.com/thumbs/cart-icon/basket-cart-icon-27.png" alt="cart-icon" />
                    </Link>
                    {!loading?tokenReady?cart?.quantity !== 0?
                    <div className={styles.buble}>
                        <span>{cart?.quantity}</span>
                    </div>:<span></span>:<span></span>:<span>Loading . . .</span>}
                </div>
            </div>
        </div>
    )
}

export default Navbar;