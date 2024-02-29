
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
const retrieveProduct = async({queryKey})=>{
    const response =  await axios.get(`http://localhost:3000/${queryKey[0]}/${queryKey[1]}`);
    return  response.data
}

const ProductDetails = ({id}) => {

    const {data: product, error, isLoading} = useQuery({
        queryKey: ["products", id],
        queryFn: retrieveProduct
    });

    if(isLoading){
        return  <div>Fetching Products ..............</div>
    }
    if(error){
        return  <div>An error occurred :{error.message}</div>
    }

    console.log(product)

    return (
        <div className="my-5">
            <h2 className="text-3xl my-2">Product Details</h2>
        </div>
    );
};

export default ProductDetails;