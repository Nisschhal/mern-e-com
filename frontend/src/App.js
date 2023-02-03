import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
function App() {
  return (
    <>
      <Header></Header>
      <main className="py-3">
        <Container>
          <h1>Welcome to ProShop</h1>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart/:id?" element={<CartScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer></Footer>
    </>
  );
}

export default App;
