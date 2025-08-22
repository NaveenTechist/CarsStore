import { Component  } from "react";
import Header from "../Header";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import CarItems from "../CarItems";
import './index.css';
import Footer from "../Footer";
import {Element} from 'react-scroll';
import {Circles } from 'react-loader-spinner';

const cars = [
    { img: "https://imgs.search.brave.com/HfXlqEy-gFLwP_h9vhV1hwzkLd0TWWE1hKnYUJiwRWo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDkyNzg0/NDYuanBn", name: "Sports Car" },
    { img: "https://imgs.search.brave.com/6yxx4eelQO1htzRg0vi6ByT-nXy-XhEE90WAm1F5vUc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzQ0Lzhl/LzdhLzQ0OGU3YWQw/NmQxNjA2ZWFhYTg3/NTYxM2M3MjQxOWFj/LmpwZw", name: "Luxury Car" },
    { img: "https://imgs.search.brave.com/8MinlY7p1nRLFa-O0VOa8Xy4Ze7HbWTincfCz1DRh5I/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzk2L2Ni/L2Y2Lzk2Y2JmNjY0/YmQ0YzdiYzUxOGMx/NDkxNzIzY2ZiMDg0/LmpwZw", name: "Audi" },
    { img: "https://imgs.search.brave.com/hHydoeOB_RVth-PPsqU22PE4pIV_i_1cGZ3Fki2Tmwo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvbGFt/Ym9yZ2hpbmktY291/bnRhY2gtNGstbGFw/dG9wLWNhci1zaG15/OTRnOWNwbW0zempl/LmpwZw", name: "Audi" }
  ];

const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

const displayLoader =  {
  loader: "LOADER",
  success: "SUCCESS",
  failure: "FAILURE",
  initial: "INITIAL"
} 

class HomeRoute extends Component {
  state = {
    carsData: [],
    displayStatus: displayLoader.loader,
  }
  componentDidMount() {
    this.getCarsData()
  }
  getCarsData = async () => {
        const url = "https://carsstorebackend.onrender.com/cars-data"
        const response = await fetch(url)
        if(response.ok){
            const data = await response.json()
            
           this.setState({ carsData: data, displayStatus: displayLoader.success })  
        }else{
            this.setState({ displayStatus: displayLoader.failure })  
        }
  }

  retryFunction = () => {
    this.setState({ displayStatus: displayLoader.loader }, this.getCarsData);
  }

  loaderFunction = () => (
    <div className="loader-container">  
        <Circles
          strokeColor="#0077FF"
          strokeWidth="5"
          animationDuration="0.75"
          width="50"
          color="#0077FF"
          visible={true}
        />
    </div>  
  )

  failureFunction = () => (
    <div className="failure-container">  
        <img  src=" https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png" alt="failure view" className="failure-image" />
        <h1 className="failure-heading">Oops! Something Went Wrong</h1>
        <button className="retry-button" onClick={this.retryFunction}> Retry</button>
    </div>  
  )

  successFunction = () => {
    const { carsData } = this.state; 
   return(
    <ul className="car-items-list">
      {carsData.map(each  => (
        <CarItems 
        key={each.name} 
        each={each}  
        />
          ))}
      </ul>
  )
  }

  swichFuction = () => {
    const { displayStatus } = this.state; 
    switch (displayStatus) {
      case displayLoader.loader:
        return this.loaderFunction();
      case displayLoader.success:
        return this.successFunction();
      case displayLoader.failure:
        return this.failureFunction();
      default:
        return null;
    }
  }

  normalFunction = () => (
    <>
    <Header />
      <div className="home-container">    
          <div className="slider-main-container"> 
             <Slider {...settings} className="slider-container" dots={true} infinite={true} speed={500} slidesToShow={1} slidesToScroll={1}>
                {cars.map((car, index) => (
                  <div key={index}>
                    <img src={car.img}  className="carosel" alt={car.name} />
                  </div>
                    ))}
                </Slider>
            </div>
      <Element name="newCars" className="h-screen flex items-center justify-center bg-yellow-100  home-content" >
        <h1 className="home-heading">Your Dream Car, Your Lifestyle</h1>
        <p className="home-description">Explore our collection of luxury and sports cars.</p>
        <p className="home-description">Find your dream car today!</p>
      </Element>
        {this.swichFuction()}
      </div>
                     
    </>
  )

  

    render() {
        return (
            <>
             {this.normalFunction()}
                <Footer />
            </>
        )
    }
}
export default HomeRoute