
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

    // console.log(product)

    return (
        <div className="w-1/2 ">
            <h2 className="text-3xl my-2">Product Details</h2>

            <div className='border bg-gray-200 p-1 text-md rounded flex flex-col'>
                <img 
                className='object-cover h-24 w-24 border rounded-full m-auto'
                src={product.thumbnail} alt="Image" />
                <p className='my-3'>{product.title}</p>
                <p className='my-3'>{product.description}</p>
                <p className='my-3'>Price: $ {product.price}</p>
                <p className='my-3'>Ratting: {product.rating}</p>
            </div>
        </div>
    );
};

export default ProductDetails;