import React from 'react'
import "./Home.css"
import Product from './Product'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <Carousel showArrows={true} showThumbs={false} autoPlay={true} interval={3000} infiniteLoop={true}>
            <div>
                <img 
                    className="home__image"
                    src="/banner3.jpg"
                    alt="banner1"
                />
            </div>
            <div>
                <img 
                    className="home__image"
                    src="https://m.media-amazon.com/images/I/71CtV-IknvL._SX3000_.jpg"
                    alt="banner2"
                />
            </div>
            <div>
                <img 
                    className="home__image"
                    src="/banner1.jpg"
                    alt="banner3"
                />
            </div>
            <div>
                <img 
                    className="home__image"
                    src="/banner2.jpg"
                    alt="banner4"
                />
            </div>
        </Carousel>


        <div className='home__row'>
            <Product 
                id = '12321341'
                title='Apple AirTag 4 Pack' 
                price={89.99} 
                image="https://m.media-amazon.com/images/I/71gY9E+cTaS._AC_SX679_.jpg"
                rating = {5}
            />
            <Product 
                id = '39513742'
                title='COSRX Snail Mucin 96% Power Repairing Essence 3.38 fl.oz, 100ml, Hydrating Serum for Face with Snail Secretion Filtrate for Dull and Damaged Skin' 
                price={13.26} 
                image="https://m.media-amazon.com/images/I/51IF5kpotSL._SX466_.jpg"
                rating = {4}
            />
            
        </div>

        <div className='home__row'>
            <Product 
                id = '28371624'
                title='WHOLE FOODS MARKET 4 Star Chocolate Mousse Cake 3 inch' 
                price={29.99} 
                image="https://m.media-amazon.com/images/I/61hnPoo+rKL._SX679_.jpg"
                rating = {4}
            />
            <Product 
                id = '55938442'
                title='Certified Refurbished Ring Stick Up Cam Battery HD security camera with custom privacy controls, Simple setup, Works with Alexa' 
                price={54.99} 
                image="https://m.media-amazon.com/images/I/41Hc4IGGzdL._SY450_.jpg"
                rating = {4}
            />
            <Product 
                id = '67849302'
                title='Y2K Crochet Crop Top See Through Hollow Out Sweater Pullover Long Sleeve Knit Color Block Casual Streetwear' 
                price={23.99} 
                image="https://m.media-amazon.com/images/I/71YPc4GGxrL._AC_UX569_.jpg"
                rating = {3}
            />
        </div>

        <div className='home__row'>
            <Product 
                id = '99238472'
                title='yeedi vac x Robot Vacuum - Ultra-Slim Design, Powerful 3000Pa Suction, Carpet Detection, Smart Mapping - Ideal for Carpet, Hard Floor Cleaning, Pets - Alexa Compatible, Wi-Fi Connected' 
                price={169.98} 
                image="https://m.media-amazon.com/images/I/61i-GuR9qKS._AC_SX569_.jpg"
                rating = {4}
            />
        </div>
    </div>
    </div>
  )
}

export default Home
