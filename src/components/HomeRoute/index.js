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
  noResults: "NO-RESULTS"
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

  noResultsFunction = () => (
    <div className="no-results-container">    
        <img  src="https://imgs.search.brave.com/W3XPV75vG6Al-6_XlgPL8Gc9tdSOc8UdbSgC8gf_dME/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG5p/Lmljb25zY291dC5j/b20vaWxsdXN0cmF0/aW9uL3ByZW1pdW0v/dGh1bWIvZmlsZS1u/b3QtZm91bmQtaWxs/dXN0cmF0aW9uLWRv/d25sb2FkLWluLXN2/Zy1wbmctZ2lmLWZv/cm1hdHMtLWVtcHR5/LXN0YXRlLW5vLXJl/c3VsdHMtcmVzdWx0/LWVycm9yLXN0YXRl/cy1wYWNrLWRlc2ln/bi1kZXZlbG9wbWVu/dC1pbGx1c3RyYXRp/b25zLTMzNjM5MjAu/cG5nP2Y9d2VicA" alt="no results" className="no-results-image" />
        <h1 className="no-results-heading">No Search Results Found</h1>
        <p className="no-results-para">Try different keywords or remove search filters</p>    
    </div>  
  )

  swichFuction = () => {
    const { displayStatus } = this.state; 
    switch (displayStatus) {
      case displayLoader.loader:
        return this.loaderFunction();
      case displayLoader.success:
        return this.successFunction();
      case displayLoader.failure:
        return this.failureFunction();
      case displayLoader.noResults:
        return this.noResultsFunction();
      default:
        return null;
    }
  }

    searchItemsFunction = (event) => {
      const { carsData } = this.state;
      console.log(event);
      if(event === ""){
        this.setState({ displayStatus: displayLoader.loader }, this.getCarsData);
        return;
      }
      const filteredCars = carsData.filter(car =>
        car.name.toLowerCase().includes(event.toLowerCase())
      );  
      if(filteredCars.length === 0){
        this.setState({ displayStatus: displayLoader.noResults, carsData: filteredCars });
        return;
      } 
      this.setState({ carsData: filteredCars });
    }

  normalFunction = () => (
    <>
    <Header searchItemsFunction={this.searchItemsFunction} />
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
      <Element name="newCars" className="newCars h-screen flex items-center justify-center bg-yellow-100  home-content" >
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