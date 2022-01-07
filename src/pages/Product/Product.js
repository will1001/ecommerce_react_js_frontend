import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { emptyItem, getItemByCategory, getItems, searchItems } from "../../actions/itemActions";
import { filterAll, filterCondition, filterPrice, filterPriceAndCondition, filterPriceAndRating, filterRating, filterRatingAndCondition, resetFilter } from "../../actions/filterActions";
import Navbar from "../../components/Navbar/Navbar";
import ProductCard from "../../components/ProductBanner/ProductCard/ProductCard";
import { useEffect } from "react";
import styles from './styles.module.css'
import FilterBox from "../../components/FilterBox/FilterBox";
import ProductLayout from "../../components/ProductLayout/ProductLayout";

const Product = ()=>{
    const location = useLocation()
    const { category,keyword } = location.state
    const {items,loading} = useSelector((state)=>state.itemReducer)
    const { products } = useSelector((state)=>state.filterReducer)
    const dispatch = useDispatch();

    const applyFilter = (minprice,maxprice,rating,condition)=>{
        dispatch(emptyItem());

        if(
            minprice !== '' &&
            maxprice !== '' &&
            rating === '' &&
            condition === ''
        ){
            dispatch(filterPrice(minprice,maxprice));
        }else if(
            minprice !== '' &&
            maxprice === '' &&
            rating === '' &&
            condition === ''
        ){
            dispatch(filterPrice(minprice,maxprice));
        }else if(
            minprice === '' &&
            maxprice !== '' &&
            rating === '' &&
            condition === ''
        ){
            dispatch(filterPrice(minprice,maxprice));
        }else if(
            minprice === '' &&
            maxprice === '' &&
            rating !== '' &&
            condition === ''
        ){
            dispatch(filterRating(rating));
        }else if(
            minprice === '' &&
            maxprice === '' &&
            rating === '' &&
            condition !== ''
        ){
            dispatch(filterCondition(condition));
        }else if(
            minprice !== '' &&
            maxprice !== '' &&
            rating !== '' &&
            condition === ''
        ){
            dispatch(filterPriceAndRating(minprice,maxprice,rating));
        }else if(
            minprice !== '' &&
            maxprice !== '' &&
            rating === '' &&
            condition !== ''
        ){
            dispatch(filterPriceAndCondition(minprice,maxprice,condition));
        }else if(
            minprice === '' &&
            maxprice === '' &&
            rating !== '' &&
            condition !== ''
        ){
            dispatch(filterRatingAndCondition(rating,condition));
        }else if(
            minprice === '' &&
            maxprice !== '' &&
            rating !== '' &&
            condition !== ''
        ){
            dispatch(filterAll(0,maxprice,rating,condition));
        }else if(
            minprice !== '' &&
            maxprice === '' &&
            rating !== '' &&
            condition !== ''
        ){
            dispatch(filterAll(minprice,0,rating,condition));
        }else if(
            minprice === '' &&
            maxprice !== '' &&
            rating !== '' &&
            condition === ''
        ){
            dispatch(filterPriceAndRating(0,maxprice,rating));
        }else if(
            minprice !== '' &&
            maxprice === '' &&
            rating !== '' &&
            condition === ''
        ){
            dispatch(filterPriceAndRating(minprice,0,rating));
        }else if(
            minprice === '' &&
            maxprice !== '' &&
            rating === '' &&
            condition !== ''
        ){
            dispatch(filterPriceAndCondition(0,maxprice,condition));
        }else if(
            minprice !== '' &&
            maxprice === '' &&
            rating === '' &&
            condition !== ''
        ){
            dispatch(filterPriceAndCondition(minprice,0,condition));
        }else if(
            minprice !== '' &&
            maxprice !== '' &&
            rating !== '' &&
            condition !== ''
        ){
            dispatch(filterAll(minprice,maxprice,rating,condition));
        }else{
            dispatch(resetFilter());
            if(category === ""){
                dispatch(searchItems(keyword));
                if(keyword === ""){
                    dispatch(getItems('api/product'));
                }
            }else{
                dispatch(getItemByCategory(`api/product/find/category/${category}/`));
            }
        }
    }

    useEffect(()=>{
       if(category === ''){
           dispatch(searchItems(keyword));
           if(keyword === ''){
               dispatch(getItems('api/product/'))
           }
       }else{
        dispatch(getItemByCategory(category));
       }
    },[dispatch,category,keyword])

    let dataProduct;
    if(products.length === 0){
        dataProduct = items;
    }else if(products.length === 0 && items.length === 0){
        dataProduct = []
    }else{
        dataProduct = products;
    }

    return (
        <div>
            <Navbar />
            <div className={styles.body}>
                <FilterBox applyFilter={applyFilter} />
                <ProductLayout category={category} >
                    {loading?<h1>Loading . . .</h1>:dataProduct.length === 0?<h1>Product not found :(</h1>
                        :dataProduct.map((e,i)=>{
                            return(
                                <ProductCard
                                    key={i}
                                    item={e}
                                />
                            )
                        })
                    }
                </ProductLayout>
            </div>
        </div>
    )
}

export default Product;