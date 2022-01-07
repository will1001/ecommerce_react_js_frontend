
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Rating } from 'react-simple-star-rating';
import { addItemToCart, addToCart, getCart } from '../../actions/cartActions';
import styles from './styles.module.css'

let tokenParse = []

const BuyingBox = ({productId,stock})=>{
    const {cart,loadingCartItem, loadingCart } = useSelector((state)=>state.cartReducer)
    const {token} = useSelector((state)=>state.authReducer)
    const dispatch = useDispatch();

    useEffect(()=>{
        if(token !== null && token !== 'undefined'){
            tokenParse = JSON.parse(token);
            dispatch(getCart(tokenParse?.id))
        }
    },[dispatch,token])
   

    const addCart = (cartData,productId)=>{

        dispatch(addToCart(tokenParse?.id,cartData?.quantity));
        dispatch(addItemToCart(cartData?.id,productId));
    }



    return (
        <div className={styles.container}>
            <div className={styles.qty}>
                <div>
                    <span>Stock : {stock}</span>
                </div>
                <span>Qty : </span>
                <input type="number" name="qty" max={stock} min={1} />
            </div>
            {loadingCartItem?<div>loading . . .</div>:<div onClick={()=>{addCart(cart,productId)}} className={styles.button}>Add to Cart</div>}
            <div className={styles.button}>
                Buy Now
            </div>
        </div>
    )
}

export default BuyingBox;