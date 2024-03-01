import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
const retrieveProducts = async({queryKey})=>{
    
    const response =  await axios.get(`http://localhost:3000/products?_page=${queryKey[1].page}&_per_page=6`);
    return  response.data
}

const ProductsList = () => {
    const [page, setPage] = useState(1);
    const {data:products, error, isLoading } = useQuery({
        queryKey: ['products', {page}],
        queryFn: retrieveProducts,
    });
  

    if(isLoading){
        return  <div>Fetching Products ..............</div>
    }
    if(error){
        return  <div>An error occurred :{error.message}</div>
    }

    return (
        <div className='flex flex-col justify-center items-center w-3/5'>
            <h2 className='text-3xl my-5'>Product List</h2>
            <ul className='flex flex-wrap justify-center items-center'>
                {products.data &&
                    products.data.map(product => (
                        <li key={product.id}
                        className='flex flex-col items-center mb-2 border rounded-lg'
                        >
                            <img className='object-cover h-64 w-96 rounded-md' src={product.thumbnail} alt={product.thumbnail} />

                            <p className='text-xl font-bold my-3'>{product.title}</p>
                        </li>
                    ))
                }
            </ul>
            <div className='flex'>
            {
                products.prev && (
                    <button
                    className='p-1 mx-1 bg-gray-400 border cursor-pointer rounded-sm'
                    onClick={() => setPage(products.next)}
                    >
                    Prev
                    </button>
                )
              }
              {
                products.next && (
                    <button
                    className='p-1 mx-1 bg-gray-400 border cursor-pointer rounded-sm'
                    onClick={() => setPage(products.next)}
                    >
                    Next
                    </button>
                )
              }
            </div>
        </div>
    );
};

export default ProductsList;