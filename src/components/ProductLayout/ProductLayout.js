
import styles from './styles.module.css'


const ProductLayout = ({children,category})=>{
   

    return (
       <div>
           <h1>{category}</h1>
           <div className={styles.container}>
                {children}
            </div>
       </div>
    )
}

export default ProductLayout;