import ProductDetails from "./components/ProductDetails";
import ProductsList from "./components/ProductsList";


const App = () => {
  return (
    <div className="flex m-2">
    <ProductsList></ProductsList>
    <ProductDetails id={1}></ProductDetails>
    </div>
  );
};

export default App;