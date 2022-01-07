import{
    FILTER_PRICE,
    FILTER_RATING,
    FILTER_CONDITION,
    FILTER_PRICE_AND_RATING,
    FILTER_PRICE_AND_CONDITION,
    FILTER_RATING_AND_CONDITION,
    FILTER_ALL,
    RESET_FILTER
} from '../types/filterTypes'

import axios from "axios";


export const filterPrice = (minprice,maxprice)=> async (dispatch)=>{

    const config ={
        Headers:{
            'Content-Type' : 'application/json'
        }
    }
    
    let url;
    if(minprice && maxprice){
        url = `api/filter/price/${minprice}/${maxprice}/`
    }else if(minprice && maxprice === ''){
        url = `api/filter/price/min/${minprice}/`
    }else{
        url = `api/filter/price/max/${maxprice}/`
    }

    console.log(`${process.env.REACT_APP_API_URL}${url}`)

    await axios.get(`${process.env.REACT_APP_API_URL}${url}`,config).then((res)=>{
        dispatch({
            type: FILTER_PRICE,
            payload: res.data
        })
    })
}


export const filterRating = (rating)=> async (dispatch)=>{

    const config ={
        Headers:{
            'Content-Type' : 'application/json'
        }
    }
    

    await axios.get(`${process.env.REACT_APP_API_URL}api/filter/rating/${rating}/`,config).then((res)=>{
        dispatch({
            type: FILTER_RATING,
            payload: res.data
        })
    })
}


export const filterCondition = (condition)=> async (dispatch)=>{

    const config ={
        Headers:{
            'Content-Type' : 'application/json'
        }
    }
    

    await axios.get(`${process.env.REACT_APP_API_URL}api/filter/condition/${condition}/`,config).then((res)=>{
        dispatch({
            type: FILTER_CONDITION,
            payload: res.data
        })
    })
}





export const filterPriceAndRating = (minprice,maxprice,rating)=> async (dispatch)=>{

    const config ={
        Headers:{
            'Content-Type' : 'application/json'
        }
    }
    

    await axios.get(`${process.env.REACT_APP_API_URL}api/filter/price_and_rating/${minprice}/${maxprice}/${rating}/`,config).then((res)=>{
        dispatch({
            type: FILTER_PRICE_AND_RATING,
            payload: res.data
        })
    })
}


export const filterPriceAndCondition = (minprice,maxprice,condition)=> async (dispatch)=>{

    const config ={
        Headers:{
            'Content-Type' : 'application/json'
        }
    }
    

    await axios.get(`${process.env.REACT_APP_API_URL}api/filter/price_and_condition/${minprice}/${maxprice}/${condition}/`,config).then((res)=>{
        dispatch({
            type: FILTER_PRICE_AND_CONDITION,
            payload: res.data
        })
    })
}


export const filterRatingAndCondition = (rating,condition)=> async (dispatch)=>{

    const config ={
        Headers:{
            'Content-Type' : 'application/json'
        }
    }
    

    await axios.get(`${process.env.REACT_APP_API_URL}api/filter/rating_and_condition/${rating}/${condition}/`,config).then((res)=>{
        dispatch({
            type: FILTER_RATING_AND_CONDITION,
            payload: res.data
        })
    })
}


export const filterAll = (minprice,maxprice,rating,condition)=> async (dispatch)=>{

    const config ={
        Headers:{
            'Content-Type' : 'application/json'
        }
    }
    

    await axios.get(`${process.env.REACT_APP_API_URL}api/filter/${minprice}/${maxprice}/${rating}/${condition}/`,config).then((res)=>{
        dispatch({
            type: FILTER_ALL,
            payload: res.data
        })
    })
}

export const resetFilter = ()=> dispatch=>{
    dispatch({
      type: RESET_FILTER,
      payload: []
    });
}