import React, { useEffect, useState } from "react";
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

const promise = loadStripe(process.env.STRIPE_PUBLIC_KEY)
                          
function App() {
  return (
    <div className="app">
      <Footer />
    </div>
  );
}
