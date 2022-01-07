import { useLocation } from "react-router-dom";
import BuyingBox from "../../components/BuyingBox/BuyingBox";
import DescriptionBoxProduct from "../../components/DescriptionBoxProduct/DescriptionBoxProduct";
import Navbar from "../../components/Navbar/Navbar";
import PhotoboxProduct from "../../components/PhotoboxProduct/PhotoboxProduct";

const DetailProduct = ()=>{
    const location = useLocation()
    const { item } = location.state

    return (
        <div>
            <Navbar />
            <div style={{display:'flex'}}>
                <PhotoboxProduct id={item?.id} />
                <DescriptionBoxProduct item={item} />
                <BuyingBox productId={item?.id} stock={item?.stock} />
            </div>
            <h1>DetailProduct</h1>
        </div>
    )
}

export default DetailProduct;