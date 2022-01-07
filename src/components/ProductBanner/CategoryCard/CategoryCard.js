
import styles from './styles.module.css'
import { Link } from "react-router-dom";


const CategoryCard = ({category,photo,link})=>{

    return (
        <div className={styles.container}>
         <h5>{category}</h5>
         <img src={photo} alt={photo}/>
        <div>
            <Link to={'/product'}
            state={{category:category}}
            >
            see more
            </Link>
        </div>
        </div>
    )
}

export default CategoryCard;