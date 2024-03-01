import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const AddProducts = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: 0,
    rating: 5,
    thumbnail: "",
  });

  const queryClient = useQueryClient();


  const mutation = useMutation({
    mutationFn: (newProduct)=> axios.post("http://localhost:3000/products", newProduct),
    onSuccess:()=>{
     
        queryClient.setQueryData(["random"], {value: "Some random data"})
        queryClient.invalidateQueries(["products"]);
    },
    // onMutate:(variables) =>{
    //   return {greeting: 'Say Hello'}
    // }

  })

  const handleSubmit = (event) => {
    event.preventDefault();
    const newProduct = {...product, id: crypto.randomUUID().toString()}
    mutation.mutate(newProduct);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.type === 'number' ? event.target.valueAsNumber : event.target.value;

    setProduct({
        ...product,
        [name]: value 
    })

  };

  if(mutation.isLoading){
    return  <span>Submitting......</span>
  }

  if(mutation.isError){
    return <span>Error: {mutation.error.message}</span>
  }

  return (
    <div className="m-2 p-2 bg-gray-200 w-1/5 h-1/2">
      <h2 className="text-2xl my-3">Add Products</h2>
    {mutation.isSuccess && <p>Product added !</p>}
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={product.title}
          onChange={handleChange}
          className="my-2 border p-2 rounded"
          placeholder="Enter Product Name"
        />
        <textarea
          type="text"
          name="description"
          value={product.description}
          onChange={handleChange}
          className="my-2 border p-2 rounded"
          placeholder="Enter Product Details"
        />
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          className="my-2 border p-2 rounded"
          placeholder="Enter Product Price"
        />
        <input
          type="text"
          name="thumbnail"
          value={product.thumbnail}
          onChange={handleChange}
          className="my-2 border p-2 rounded"
          placeholder="Enter Thumbnail"
        />

        <button
          type="submit"
          className="bg-black m-auto text-white text-xl p-1 rounded-md"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProducts;
