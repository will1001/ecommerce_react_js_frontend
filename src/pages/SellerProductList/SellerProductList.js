import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getItemById, deleteItem } from "../../actions/itemActions";
import Navbar from "../../components/Navbar/Navbar";
import styles from './styles.module.css'
import ProductForm from "../../components/ProductForm/ProductForm";
import { Rating } from 'react-simple-star-rating';


const SellerProductList = ()=>{
    const location = useLocation()
    const { storeId } = location.state
    const dispatch = useDispatch();
    const {items,loading} = useSelector((state)=>state.itemReducer)
    const [showForm,setShowForm] = useState(false);
    const [actionForm,setActionForm] = useState(false);
    const [editForm,setEditForm] = useState({});


    useEffect(()=>{
        dispatch(getItemById('api/product/seller/',storeId))
    },[dispatch,storeId])

    const showFormPanel = (action,dataProduct)=>{
        setActionForm(action);
        setShowForm(false);
        setTimeout(() => {
            setShowForm(true);
        }, 500);

        setEditForm(dataProduct);
    }

    const deleteProduct = (id,thumbnail)=>{
        if(window.confirm('Delete the item ?')){
            const filename = thumbnail.split('/').at(-1);

            dispatch(deleteItem(id,filename));
            window.location.replace('/seller_product_list');
        }
    }

    const cancel = ()=>{
        setShowForm(false);
    }

    return (
        <div>
            <Navbar />
            <div className={styles.body}>
                <h1>Product List</h1>

                <div className={styles.addButton}>
                    {showForm?<span></span>:<button onClick={()=>showFormPanel('Add',{})}>Add Product</button>}
                </div>

                {showForm ? 
                <ProductForm 
                    cancel={()=>{cancel()}}
                    storeId={storeId}
                    actiontype={actionForm}
                    editForm={editForm}
                />:
                <span></span>}
                
                {showForm?<span></span>:
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Thumbnail</th>
                            <th>Preview Images</th>
                            <th>Stock</th>
                            <th>Condition</th>
                            <th>Rating</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading?
                        <tr>
                            <td>Loading  . . . </td>
                        </tr>:
                        items.map((e,i)=>{
                            return (
                                <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>{`${e.title.toString().length <= 25 ? e.title:e.title.substring(0,25)+' . . . '}`}</td>
                                    <td>{`${e.description.toString().length <= 25 ? e.description:e.description.substring(0,25)+' . . . '}`}</td>
                                    <td>{e.category}</td>
                                    <td>${e.price}</td>
                                    <td><a href={e.thumbnail}>see</a></td>
                                    <td><Link to={'/previewImages'} state={{productId:e.id}} >see</Link></td>
                                    <td>{e.stock}</td>
                                    <td>{e.condition}</td>
                                    <td><Rating readonly={true} ratingValue={e.rating} size={20} /></td>
                                    <td className={styles.actionButton}>
                                        <img onClick={()=>{showFormPanel("Edit",e);}} src="https://cdn.iconscout.com/icon/free/png-256/edit-2653317-2202989.png" alt="edit-icon" />
                                        <img onClick={()=>{deleteProduct(e.id,e.thumbnail)}} src="http://cdn.onlinewebfonts.com/svg/img_216917.png" alt="delete-icon" />
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
                }
            </div>
        </div>
    )
}

export default SellerProductList;