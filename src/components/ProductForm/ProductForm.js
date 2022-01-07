import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Rating } from 'react-simple-star-rating';
import { addItem, updateItem } from '../../actions/itemActions';
import styles from './styles.module.css'

const categoryData = [
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

const ProductForm = ({storeId,actiontype,editForm,cancel})=>{

    const {loading} = useSelector((state)=>state.itemReducer)
    const dispatch = useDispatch();
    const [formData,setFormData] = useState({
        title:'',
        description:'',
        category:'',
        price:'',
        thumbnail:'',
        stock:'',
        condition:''
    })

    const [rating,setRating] = useState(0);
    const [thumbnailImgFile,setThumbnailImgFile] = useState(null);
    const [thumbnailImgPreviewURL,setThumbnailImgPreviewURL] = useState('');

    const {title,description,category,price,thumbnail,stock,condition} = formData;

    const onChange = e=>setFormData({...formData,[e.target.name]:e.target.value});
    const handleRatig = (rate)=>{
        setRating(rate)
    }


    const onImageChange = e=>{
        let files = e.target.files;
        console.log(e.target.files)
        

        if(FileReader && files && files.length){
            const previewURL = URL.createObjectURL(files[0]);
            setThumbnailImgPreviewURL(previewURL);
            setThumbnailImgFile(files[0])
        }
    }

    const onSubmit = e =>{
        e.preventDefault();
        
        if(!loading){

            const data = {
                'storeId':storeId,
                'title':title,
                'description':description,
                'category':category,
                'price':price,
                'thumbnail':thumbnail,
                'stock':stock,
                'condition':condition,
                'rating': rating
            }

            if(actiontype === 'Add'){

                dispatch(addItem(data,thumbnailImgFile));
            }else{
                dispatch(updateItem(editForm.id,data,thumbnailImgFile))
            }
            setTimeout(() => {
                window.location.replace('/seller_product_list')
            }, 1000);
        }
    }

    useEffect(()=>{
       if(Object.keys(editForm).length !== 0){
           setFormData(editForm);
           setRating(editForm.rating);
       }
    },[dispatch,editForm])

    return (
        <div className={styles.container}>
            <form onSubmit={e=>onSubmit(e)}>
                    <div>
                        <div>
                            <strong>Name :</strong>
                        </div>
                        <input type="text" name="title" placeholder='Product Name' value={title}
                            onChange={e=>onChange(e)}
                            required
                        />
                    </div>
                    <div>
                        <div>
                            <strong>Description :</strong>
                        </div>
                        <textarea rows={5} name='description' placeholder='Description' value={description}
                            onChange={e=>onChange(e)}
                            required
                        ></textarea>
                    </div>
                    <div>
                        <div>
                            <strong>Category :</strong>
                        </div>
                       <select value={category} name='category' onChange={e=>onChange(e)} required>
                           <option value="" disabled>Category</option>
                           {categoryData.map((e,i)=>{
                               return(
                                <option value={e.category} >{e.category}</option>
                               )
                           })}
                       </select>
                    </div>
                    <div>
                        <div>
                            <strong>Price :</strong>
                        </div>
                        <input type="number" name="price" placeholder='Price' value={price}
                            onChange={e=>onChange(e)}
                            required
                        />
                    </div>
                    <div>
                        <div>
                            <strong>Thumbnail :</strong>
                        </div>
                       <div>
                        {thumbnail || thumbnailImgPreviewURL ? 
                            <img src={thumbnailImgPreviewURL? thumbnailImgPreviewURL: thumbnail} alt="thumbnail-preview"
                                width={200} height={200}
                            />:
                            <span></span>
                            }
                       </div>
                       <div>
                        <input type="file" name="thumbail" placeholder='Thumbnail'
                                onChange={e=>onImageChange(e)}
                            />
                       </div>
                    </div>
                    <div>
                        <div>
                            <strong>Stock :</strong>
                        </div>
                        <input type="number" name="stock" placeholder='Stock' value={stock}
                            onChange={e=>onChange(e)}
                            required
                        />
                    </div>
                    <div>
                        <div>
                            <strong>Condition :</strong>
                        </div>
                        <select value={condition} name='condition' onChange={e=>onChange(e)} required>
                           <option value="" disabled>Condition</option>
                           <option value="New" >New</option>
                           <option value="Renewed" >Renewed</option>
                           <option value="Used" >Used</option>
                       </select>
                    </div>
                    <div>
                        <div>
                            <strong>Rating :</strong>
                        </div>
                       <Rating onClick={handleRatig} ratingValue={rating} size={20} />
                    </div>
                        <button onClick={cancel}>Cancel</button>
                        <button>Submit</button>
            </form>
        </div>
    )
}

export default ProductForm;