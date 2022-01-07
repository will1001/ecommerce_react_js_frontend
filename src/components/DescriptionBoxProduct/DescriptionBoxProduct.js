
import { Rating } from 'react-simple-star-rating';
import styles from './styles.module.css'


const DescriptionBoxProduct = ({item})=>{


    return (
        <div className={styles.container}>
            <h1>{item.title}</h1>
            <h5>{item.category}</h5>
            <Rating readonly={true} ratingValue={item.rating} size={20} />
            <h5>${item.price}</h5>
            <p>{item.description}</p>
        </div>
    )
}

export default DescriptionBoxProduct;