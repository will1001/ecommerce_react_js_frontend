import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom";
import { getProductImages } from "../../actions/itemActions";
import styles from './styles.module.css'

const PreviewImages = ()=>{
    const location = useLocation()
    const { productId } = location.state
    const dispatch = useDispatch();
    const {productImgs,loading} = useSelector((state)=>state.itemReducer)
    const [imgFiles,setImgFiles] = useState([])
    const [loadingView,setLoadingView] = useState(false)

    const uploadImg = ()=>{
        setLoadingView(true);

        const config = {
            Headers:{
                'Content-type' :'application/json'
            }
        }

        let i = 0;

        while (i< imgFiles.length) {
            let formData = new FormData();
            formData.append('imgFile',imgFiles[i])
            setTimeout(async () => {
                await axios.post(`${process.env.REACT_APP_API_URL}api/uploadFile/`,formData,config).then(async(res)=>{

                    if(res.status === 201){
                        const url = res.data.imgFile;
                        const data = {
                            'productId': productId,
                            'url': url
                        }
                        await axios.post(`${process.env.REACT_APP_API_URL}api/productImg/`,data,config)
                    }
                })
            }, 1000);
            i++;
        }

        setTimeout(() => {
            window.location.replace('/previewImages')
        }, 5500);
    }

  

    useEffect(()=>{
       
        dispatch(getProductImages(productId))
    },[dispatch,productId])

    const fileLimit = e=>{
        if(Array.from(e.target.files).length > 5){
            alert('cannot upload file more than 5');
            e.preventDefault();
            e.target.value = null
            return;

        }

        let files = e.target.files;
        
        if(FileReader && files && files.length){
            setImgFiles(files);
        }
    }

    const deleteImg = async(id,fileurl)=>{
        setLoadingView(true);

        const config = {
            Headers:{
                'Content-type' :'application/json'
            }
        }

        const filenameBefore = fileurl.split('.').at(-1);

        await axios.delete(`${process.env.REACT_APP_API_URL}api/productImg/`,config).then(async(res)=>{
            await axios.get(`${process.env.REACT_APP_API_URL}api/deleteFile/${filenameBefore}`,config).then((res2)=>{

                setTimeout(() => {
                    setLoadingView(false);
                    window.location.replace('/previewImages')
                }, 1000);
            })
        })

    }
    return (
        <div className={styles.container}>
            <h1>Preview Images</h1>
            <div className={styles.imgContainer}>
                {loading?<span></span>:productImgs.map((e,i)=>{
                    return(
                        <div key={i}>
                            <img src={e.url} alt={i} />
                            <div>
                                <button onClick={()=>{deleteImg(e.id,e.url)}} >Delete</button>
                            </div>
                        </div>
                    )
                })}
            </div>
            <br/>
            <br/>
            {productImgs.length === 5?
            <span></span>:
            <div>
                <p>Add Images (min = 1, max = 5) : </p>
                <input 
                    type="file" 
                    accept="image/png, image/jpg, image/jpeg" 
                    multiple
                    onChange={e=>fileLimit(e)}
                />
                <button onClick={uploadImg}>Upload</button>

                <h1>{loadingView?'Loading . . .':''}</h1>
            </div>
            }
        </div>
    )
}

export default PreviewImages;