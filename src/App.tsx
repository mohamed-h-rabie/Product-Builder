import "./App.css";
import Card from "./components/Card/Card";
// import { Button } from "./components/ui/button";
import { productList } from "./lib/fakeData";

function App() {
  const renderproductList = productList.map((product) => (
    <Card key={product.id} product={product} />
  ));
  return (
    <main className="container mx-auto">
      {/* <Button>Click me</Button> */}
      <div className="m-5 grid grid-cols-1 gap-2 rounded-md p-2 md:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {renderproductList}
      </div>
    </main>
  );
}

export default App;
