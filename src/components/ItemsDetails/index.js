import Header from "../Header";
import './index.css';
import {Circles } from 'react-loader-spinner';
import {useParams} from "react-router-dom"
import { useEffect , useState } from "react";
import { FaStar } from "react-icons/fa6";


const displayLoader =  {
  loader: "LOADER",
  success: "SUCCESS",
  failure: "FAILURE",
} 

const ItemsDetails = () => {
  const [specificCarsData, setSpecificData] = useState([])
  const[disLoader, setDisplayLoader] = useState(displayLoader.loader)
  const {id} = useParams()

  useEffect(() => {
    getCarsData()
  })

 const getCarsData = async () => {
        const url = `https://carsstorebackend.onrender.com/cars-data/${id}`
        const response = await fetch(url)
        if(response.ok){
            const data = await response.json()
           setSpecificData(data)
           setDisplayLoader(displayLoader.success)
        }else{
            
            setDisplayLoader(displayLoader.failure)
        }
  }

  const retryFunction = () => {
     getCarsData()
     setDisplayLoader(displayLoader.loader)
  }

  const loaderFunction = () => (
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

  const failureFunction = () => (
    <div className="failure-container">  
        <img  src=" https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png" alt="failure view" className="failure-image" />
        <h1 className="failure-heading">Oops! Something Went Wrong</h1>
        <button className="retry-button" onClick={retryFunction}> Retry</button>
    </div>  
  )

  const successFunction = () => {
   return(
    <div className="detail-container">
      <div className="detail-container-inside"> 
        <div>
            <img src={specificCarsData.imgUrl} alt={specificCarsData.name} className="details-img" />
        </div>
        <div className="info-container">
            <h1 className="detail-name">{specificCarsData.name}</h1>
            <p className="description">FEXXA 1:32 Scale Exclusive Alloy Metal Pull Back Die-cast Car Model with Sound Light Mini Auto Toy for Kids Metal Model Toy Car with Sound and Light? (Audi Q8 - White-1)</p>
            <p className="car-price detail-price">Price: <span>{specificCarsData.price} /-</span></p>
            <p className="car-rating rating-detail">{specificCarsData.rating} <FaStar className="star-icon" /> </p>
            <hr className="hr" />
            <div className="flex"> 
            <button type="button" className="add-cart-detail" >Add Cart</button>
            <button type="button" className="buy-now-detail" >Buy now</button>
            </div>
        </div>
        </div>
    </div>
  )
  }

  const swichFuction = () => {
    switch (disLoader) {
      case displayLoader.loader:
        return loaderFunction();
      case displayLoader.success:
        return successFunction();
      case displayLoader.failure:
        return failureFunction();
      default:
        return null;
    }
  }
        return (
            <>
            <Header />
             {swichFuction()}
            </>
        ) 
}
export default ItemsDetails