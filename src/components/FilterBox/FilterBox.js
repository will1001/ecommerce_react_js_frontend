
import { useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import styles from './styles.module.css'

let tokenParse = []

const FilterBox = ({applyFilter})=>{

    const [price,setPrice] = useState({
        minprice : '',
        maxprice : ''
    })
    
    const { minprice, maxprice } = price;
    const [rating,setRating] = useState('');
    const [condition,setCondition] = useState('');

    const handlePrice = e=>setPrice({...price,[e.target.name]:e.target.value});

    const handleRating = (rate)=>{
        setRating(rate);
    }

    const handleCondition = (cond)=>setCondition(cond);

    const resetFilter = ()=>{
        setPrice({
            minprice:'',
            maxprice:''
        })
        setRating('');
        setCondition('');
        applyFilter('','','','');
    }

    return (
        <div className={styles.container}>
            <h3>Price</h3>
            <input type="number" name="minprice" placeholder='Min Price' onChange={e=>handlePrice(e)} value={minprice} />
            <input type="number" name="maxprice" placeholder='Max Price' onChange={e=>handlePrice(e)} value={maxprice} />
            <h3>Avg. Customer Review</h3>
            <div onClick={()=>handleRating(100)} className={rating === 100?styles.ratingStarSelected:styles.ratingStar}>
                <Rating readonly={true} ratingValue={100} size={20} /><span>& up</span>
            </div>
            <div onClick={()=>handleRating(80)} className={rating === 80?styles.ratingStarSelected:styles.ratingStar}>
                <Rating readonly={true} ratingValue={80} size={20} /><span>& up</span>
            </div>
            <div onClick={()=>handleRating(60)} className={rating === 60?styles.ratingStarSelected:styles.ratingStar}>
                <Rating readonly={true} ratingValue={60} size={20} /><span>& up</span>
            </div>
            <div onClick={()=>handleRating(40)} className={rating === 40?styles.ratingStarSelected:styles.ratingStar}>
                <Rating readonly={true} ratingValue={40} size={20} /><span>& up</span>
            </div>
            <div onClick={()=>handleRating(20)} className={rating === 20?styles.ratingStarSelected:styles.ratingStar}>
                <Rating readonly={true} ratingValue={20} size={20} /><span>& up</span>
            </div>
            <h3>Condition</h3>
            <div onClick={()=>handleCondition('New')} style={{fontWeight:condition == 'New'?'bold':400}}>
               New 
            </div>
            <div onClick={()=>handleCondition('Renewed')} style={{fontWeight:condition == 'Renewed'?'bold':400}}>
               Renewed 
            </div>
            <div onClick={()=>handleCondition('Used')} style={{fontWeight:condition == 'Used'?'bold':400}}>
               Used 
            </div>
            <button onClick={()=>applyFilter(minprice,maxprice,rating,condition)}>Apply Filter</button>
            <button onClick={resetFilter}>Reset Filter</button>
        </div>
    )
}

export default FilterBox;