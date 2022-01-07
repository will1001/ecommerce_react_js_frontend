import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { deleteFromCart, deleteItemFromCart, getItemsCart } from "../../actions/cartActions"
import Navbar from "../../components/Navbar/Navbar"
import styles from './styles.module.css'


let tokenParse = []
const CartView = ()=>{
    const location = useLocation()
    const { cartId } = location.state
    const {cartItem, cart} = useSelector((state)=>state.cartReducer)
    const {token} = useSelector((state)=>state.authReducer)
    const dispatch = useDispatch();

    const deleteItem = (id)=>{
        dispatch(deleteFromCart(tokenParse?.id,cart?.quantity));
        dispatch(deleteItemFromCart(id))
        window.location.replace('/cartView')
    }

    useEffect(()=>{
        if(token !== null && token !== 'undefined'){
            tokenParse = JSON.parse(token);
            dispatch(getItemsCart(cartId))
        }
    },[dispatch,token,cartId])

    return (
        <div>
            <Navbar />
            <div className={styles.container}>
                <h1>Your Cart Items</h1>
                {cartItem.map((e,i)=>{
                    return(
                        <div key={i} className={styles.cartProduct}>
                            <h1>{i+1}. </h1>
                            <img src={e.product_details.thumbnail} alt={"thumbnail-"+i} />
                            <div>
                                <h2>{e.product_details?.title}</h2>
                                <h3>${e.product_details.price}</h3>
                                <h5>X{e.quantity}</h5>
                                <button onClick={()=>{deleteItem(e.id)}}>Delete</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default CartView;