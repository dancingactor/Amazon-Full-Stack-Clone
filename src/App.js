import React, { useEffect } from "react";
import './App.css';
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import Payment from "./Payment";
import Orders from "./Orders";
import Footer from "./Footer";
import { auth } from "./firebase"
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

const promise = loadStripe("pk_test_51QGJeeKKzevSXRf7IgFTp9ejrA9LDSSS7JrFuV0rSTnPsiOCiy6E7sD9lXX6d7eCZ4fXzoBVq0045fIZYCvsnmHT00j9ctqWQi")
                          

function App() {
  const [, dispatch] = useStateValue();

  useEffect(()=>{ //like if statement
    // will only run once when the app component loads
    auth.onAuthStateChanged(authUser=>{
      console.log('The User is >>>', authUser)
      if (authUser){
        // the user just logged in 
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        // the user is logged out
        dispatch({
        type: 'SET_USER', 
        user: null
        })
      }
    })
  }, [dispatch])


  return (
    <Router>
      <div className="app">
        <Routes>
        <Route path="/orders" element={<React.Fragment> 
            <Header />
            <Orders />
          </React.Fragment>} />
          <Route path="/login" element={<React.Fragment> 
            <Login />
          </React.Fragment>} />
          <Route path="/checkout" element={<React.Fragment> 
            <Header />
            <Checkout />
          </React.Fragment>} />
          <Route path="/payment" element={<React.Fragment> 
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </React.Fragment>} />
          <Route path="/" element={<React.Fragment> 
            <Header />
            <Home />
            <Footer />
          </React.Fragment>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
