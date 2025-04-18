import './index.css';
import Footer from './components/Footer'
import React, { useState } from "react"
import { useEffect } from "react"
import Nav from './components/Nav';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Home from "./pages/Home";
import Books from "./pages/Books"
import {books} from "./data"
import Cart from "./pages/Cart"
import BookInfo from './pages/BookInfo';

function App() {
  const [cart, setCart] = useState([]);

  function addToCart(book) {
    setCart([...cart, {...book, quantity: 1}])
  }

  function changeQuantity (book, quantity) {
     setCart (cart.map(item => {
      if (item.id === book.id) {
        return {
          ...item,
          quantity: +quantity,
        }
      }
      else {
        return item
      }
     }))
  }

  function removeItem(item) {
   setCart(cart.filter(book => book.id !== item.id))
  }

  function numberOfItems() {
    let counter = 0;
    cart.forEach(item => {
      counter += item.quantity
    })
    return counter;
  }

  useEffect (() => {
   console.log(cart);
  }, [cart]);

  return (
    <Router>
      <div className="App">
        <Nav numberOfItems={numberOfItems()} />
          <Route path="/" exact component={Home} /> {/* Use the 'component' prop directly */}
          <Route path="/books" exact render={() => <Books books={books} />} /> {/* Use 'render' with a function */}
          <Route path="/books/:id" render={() => <BookInfo books={books} />} /> {/* Use 'render' with a function */}
          <Route path="/cart" render={() => <Cart books={books} cart={cart} changeQuantity={changeQuantity} removeItem={removeItem} />} /> {/* Use 'render' with a function */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;