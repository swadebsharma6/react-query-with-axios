import AddProducts from "./components/AddProducts";
import ProductDetails from "./components/ProductDetails";
import ProductsList from "./components/ProductsList";


const App = () => {
  return (
    <div className="flex m-2">
    <AddProducts></AddProducts>
    <ProductsList></ProductsList>
    <ProductDetails id={5}></ProductDetails>
    </div>
  );
};

export default App;