import { Link } from 'react-router-dom';
import styles from './styles.module.css'


const StoreInfoPanel = ({store,loading})=>{

    return (
        <div className={styles.container}>
            <h1>{loading?'Loading . . .':store[0]?.name}</h1>
            <Link to={'/seller_product_list'}
            state={{storeId:store[0]?.id}}
            >
                <button>Add Product</button>
            </Link>
        </div>
    )
}

export default StoreInfoPanel;