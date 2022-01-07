import{
    GET_CART,
    ADD_TO_CART,
    DELETE_FROM_CART,
    CART_LOADING,
    GET_ITEMS_CART,
    ADD_ITEM_TO_CART,
    DELETE_ITEM_FROM_CART,
    CART_ITEM_LOADING
} from '../types/cartTypes'

import axios from "axios";


export const getCart = (id)=> async (dispatch)=>{
    dispatch({type: CART_LOADING });

    const config ={
        Headers:{
            'Content-Type' : 'application/json'
        }
    }

    await axios.get(`${process.env.REACT_APP_API_URL}api/cart/${id}/`,config).then((res)=>{
        dispatch({
            type: GET_CART,
            payload: res.data
        })
    })
}


export const addToCart = (id,quantity)=> async (dispatch)=>{
    dispatch({type: CART_LOADING });

    const config ={
        Headers:{
            'Content-Type' : 'application/json'
        }
    }

    await axios.put(`${process.env.REACT_APP_API_URL}api/cart/${id}/`,{"userId": id, "quantity" : quantity + 1},config).then((res)=>{
        dispatch({
            type: ADD_TO_CART,
            payload: res.data
        })
    })
}


export const deleteFromCart = (id,quantity)=> async (dispatch)=>{
    dispatch({type: CART_LOADING });

    const config ={
        Headers:{
            'Content-Type' : 'application/json'
        }
    }

    await axios.put(`${process.env.REACT_APP_API_URL}api/cart/${id}/`,{"userId": id, "quantity" : quantity - 1},config).then((res)=>{
        dispatch({
            type: DELETE_FROM_CART,
            payload: res.data
        })
    })
}


export const getItemsCart = (cartId)=> async (dispatch)=>{
    dispatch({type: CART_ITEM_LOADING });

    const config ={
        Headers:{
            'Content-Type' : 'application/json'
        }
    }

    await axios.get(`${process.env.REACT_APP_API_URL}api/showItemsCart/${cartId}/`,config).then((res)=>{
        dispatch({
            type: GET_ITEMS_CART,
            payload: res.data
        })
    })
}


export const addItemToCart = (cartId, productId)=> async (dispatch)=>{

    const config ={
        Headers:{
            'Content-Type' : 'application/json'
        }
    }

    await axios.get(`${process.env.REACT_APP_API_URL}api/cartItemDetectSameItem/${cartId}/${productId}/`,config).then(async(res)=>{
       
        if(res.data.length === 0){
            await axios.post(`${process.env.REACT_APP_API_URL}api/cartItem/`,{"cartId" : cartId, "productId": productId, "quantity": 1},config).then((res2)=>{
                dispatch({
                    type: ADD_ITEM_TO_CART,
                    payload: res.data
                })
            })
        }else{
            await axios.put(`${process.env.REACT_APP_API_URL}api/cartItem/id/${res.data[0]?.id}/`,{"cartId" : cartId, "productId": productId, "quantity": res.data[0]?.quantity + 1},config)
        }


    })
}

export const deleteItemFromCart = (id)=> async (dispatch)=>{

    const config ={
        Headers:{
            'Content-Type' : 'application/json'
        }
    }

    await axios.delete(`${process.env.REACT_APP_API_URL}api/cartItem/id/${id}/`,config).then((res)=>{
        dispatch({
            type: DELETE_ITEM_FROM_CART,
        })
    })
}