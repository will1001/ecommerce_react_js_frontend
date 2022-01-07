import{
    GET_ITEMS,
    SEARCH_ITEMS,
    GET_ITEM_BY_CATEGORY,
    GET_ITEMS_BY_ID,
    GET_PRODUCT_IMAGES,
    ADD_ITEM,
    UPDATE_ITEM,
    DELETE_ITEM,
    ITEMS_LOADING,
    EMPTY_ITEMS
} from '../types/itemTypes'

import axios from "axios";


export const getItems = (url)=> async (dispatch)=>{


    dispatch({
        type: ITEMS_LOADING
    })

    
    const config ={
        Headers:{
            'Content-Type' : 'application/json'
        }
    }
    
  

    await axios.get(`${process.env.REACT_APP_API_URL}${url}`,config).then((res)=>{
        dispatch({
            type: GET_ITEMS,
            payload: res.data
        })
    })
}


export const searchItems = (keyword)=> async (dispatch)=>{

    const config ={
        Headers:{
            'Content-Type' : 'application/json'
        }
    }
    
  

    await axios.get(`${process.env.REACT_APP_API_URL}api/product/find?search=${keyword}`,config).then((res)=>{
        dispatch({
            type: SEARCH_ITEMS,
            payload: res.data
        })
    })
}

export const getItemById = (url,id)=> async (dispatch)=>{

    const config ={
        Headers:{
            'Content-Type' : 'application/json'
        }
    }
    
  

    await axios.get(`${process.env.REACT_APP_API_URL}${url}${id}/`,config).then((res)=>{
        dispatch({
            type: GET_ITEMS_BY_ID,
            payload: res.data
        })
    })
}


export const getProductImages = (id)=> async (dispatch)=>{

    const config ={
        Headers:{
            'Content-Type' : 'application/json'
        }
    }
    
  

    await axios.get(`${process.env.REACT_APP_API_URL}api/productImg/${id}/`,config).then((res)=>{
        dispatch({
            type: GET_PRODUCT_IMAGES,
            payload: res.data
        })
    })
}


export const getItemByCategory = (category)=> async (dispatch)=>{

    const config ={
        Headers:{
            'Content-Type' : 'application/json'
        }
    }
    
  

    await axios.get(`${process.env.REACT_APP_API_URL}api/product/find/${category}/`,config).then((res)=>{
        dispatch({
            type: GET_ITEM_BY_CATEGORY,
            payload: res.data
        })
    })
}

export const addItem = (item,file)=> async (dispatch)=>{

    const config ={
        Headers:{
            'Content-Type' : 'application/json'
        }
    }
    

    if(!file){
        //placeholder if file image null
        item.thumbnail = 'https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg';

        await axios.post(`${process.env.REACT_APP_API_URL}api/product/`,item,config).then((res)=>{
            dispatch({
                type: ADD_ITEM,
                payload: res.data
            })
        })
    }else{
        let fileData = new FormData();
        fileData.append('imgFile',file)

        await axios.post(`${process.env.REACT_APP_API_URL}api/uploadFile/`,fileData,config).then(async(res)=>{
           
            if(res.status == 201){
                item.thumbnail = res.data.imgFile;
                await axios.post(`${process.env.REACT_APP_API_URL}api/product/`,item,config).then((res)=>{
           
                    dispatch({
                        type: ADD_ITEM,
                        payload: res.data
                    })

                })
            }
        })
    }
   
}


export const deleteItem = (id, filename)=> async (dispatch)=>{

    const config ={
        Headers:{
            'Content-Type' : 'application/json'
        }
    }
    
  

    await axios.delete(`${process.env.REACT_APP_API_URL}api/product/${id}/`,config).then(async(res)=>{

        await axios.get(`${process.env.REACT_APP_API_URL}api/deleteFile/${filename}/`,config).then((res2)=>{
            
            dispatch({
                type: DELETE_ITEM,
                payload: res.data
            })

        })

    })
}


export const updateItem = (id, item, file)=> async (dispatch)=>{

    const config ={
        Headers:{
            'Content-Type' : 'application/json'
        }
    }
    
  
    if(!file){
        await axios.put(`${process.env.REACT_APP_API_URL}api/product/${id}/`,item,config).then((res)=>{
            dispatch({
                type: UPDATE_ITEM,
                payload: res.data
            })
        })
    }else{
        let filedata = new FormData();
        filedata.append('imgFile',file)

        await axios.post(`${process.env.REACT_APP_API_URL}api/uploadFile/`,filedata,config).then(async(res)=>{
           if(res.status === 201){
               const fileNameBefore = item.thumbnail.split("/").at(-1);
               item.thumbnail = res.data.imgFile

               await axios.put(`${process.env.REACT_APP_API_URL}api/product/${id}/`,item,config).then(async(res2)=>{
                await axios.get(`${process.env.REACT_APP_API_URL}api/deleteFile/${fileNameBefore}/`,config).then((res3)=>{
                    dispatch({
                        type: UPDATE_ITEM,
                        payload: res.data
                    })
                })
             })
           }
        })
    }
    
}


export const emptyItem = ()=> async (dispatch)=>{
    dispatch({
        type: EMPTY_ITEMS
    })

}
