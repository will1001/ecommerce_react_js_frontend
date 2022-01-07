import { useDispatch, useSelector } from 'react-redux'
import styles from './styles.module.css'
import { getItems } from "../../actions/itemActions";
import { useEffect } from 'react';
import ProductCard from "./ProductCard/ProductCard";
import CategoryCard from './CategoryCard/CategoryCard';

const category = [
    {
        'id': 1,
        'photo' : 'https://words.shenn.id/wp-content/uploads/2021/11/rgb-laptop-gamepad.jpg',
        'category' : 'Games'
    },
    {
        'id': 2,
        'photo' : 'https://ecommerce.ccc2020.fr/wp-content/uploads/2020/10/electronic-gadgets.jpeg',
        'category' : 'Electronics'
    },
    {
        'id': 3,
        'photo' : 'https://img1.exportersindia.com/product_images/bc-full/2018/8/5852971/computer-laptop-accessories-1535448292-4238297.jpeg',
        'category' : 'Computer and Accesories'
    },
    {
        'id': 4,
        'photo' : 'http://3.bp.blogspot.com/-GhNtwYQfpMA/Vk01xBM-ViI/AAAAAAAAAHo/KCLBVn4vrVY/s640/clothing-fashion-t-shirt-mockup-01-o.jpg',
        'category' : 'Fashion'
    },
]



const ProductBanner = ()=>{

    const { items } = useSelector((state)=>state.itemReducer)

    const dispatch = useDispatch();

    useEffect(()=>{

        dispatch(getItems('api/product/'))

    },[dispatch])

    return (
        <div className={styles.container}>
            <div className={styles.new_product_container}>
                <h2>New Products</h2>
                <div className={styles.new_product}>
                    {items.slice(0,5).map((e,i)=>{
                        return(
                            <ProductCard
                            key={i}
                            item={e}
                            />
                        )
                    })}
                </div>
                <div className={styles.category_product_container}>
                   <h2>Shop By Category</h2>
                   <div className={styles.category_product}>
                   {category.slice(0,5).map((e,i)=>{
                        return(
                            <CategoryCard
                            key={i}
                            category={e.category}
                            photo={e.photo}
                            link={e.id}
                            />
                        )
                    })}
                   </div>
                </div>
            </div>
        </div>
    )
}

export default ProductBanner;