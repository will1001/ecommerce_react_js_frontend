import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItemById } from '../../actions/itemActions';
import styles from './styles.module.css'


const PhotoboxProduct = ({id})=>{
    const {items,loading} = useSelector((state)=>state.itemReducer)
    const dispatch = useDispatch();

    useEffect(()=>{
       
            dispatch(getItemById('api/productImg/',id))

    },[dispatch])

    const [imgHover,setImgHover] = useState(0)


    return (
        <div className={styles.container}>
            <div className={styles.smallImg}>
                {items.map((e,i)=>{
                    return(
                        <img key={i} onMouseEnter={()=>setImgHover(i)} src={e.url} alt={'small-img -'+i} />
                    )
                })}
            </div>
            <div className={styles.bigImg}>
                <img src={loading?'':items[imgHover]?.url} alt="big-img" />
            </div>
        </div>
    )
}

export default PhotoboxProduct;