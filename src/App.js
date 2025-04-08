import './index.css';
import Discounted from './components/Discounted'
import Explore from './components/Explore'
import Footer from './components/Footer'
import React, { useState } from "react"
import Landing from './components/Landing';
import Nav from './components/Nav';
import Highlights from './components/Highlights'
import Featured from './components/Featured'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Home from "./pages/Home";
import Books from "./pages/Books"
import {books} from "./data"
import Cart from "./pages/Cart"

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

  useEffet (() => {
   console.log(cart);
  }, [cart]);
 
return 
  <Router>
  <div className="App">
    <Nav numberOfItems={numberOfItems()} />
    <Route path="/" exact component={Home} />
    <Route path="/books" exact render={<Books books={books} />} />
    <Route path="/books/:id" render={() => <BookInfo books={books} />} />
    <Route path="/cart" render={() => <Cart books={books} cart={cart} change quantity={changeQuantity} removeItem={removeItem} />} />
    <Footer />
    </div>
  </Router>

}

export default App;