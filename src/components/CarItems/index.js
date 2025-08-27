import { FaStar } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import './index.css';
import CommonContext from '../../CommonContext/common';

const CarItems = props =>{
const { each } = props;
const { imgUrl, name, price, id } = each;
return( 
 <CommonContext.Consumer>
    {value => { 
        const { addCartListItem } = value;
        const onClickAddCart = () => {
            addCartListItem(each);
        }   
    return( 
        <> 
    <div className="li-items">
        <div>
            <Link to={`/cars-data/${id}`}> 
            <img src={imgUrl} alt={name} className="car-image" />
            <div className="car-details">
                <div>
                    <h2 className="car-name">{name}</h2>
                    <p className="car-price">Price: <span>{price} /-</span></p>
                </div>
                <p className="car-rating">{each.rating} <FaStar className="star-icon" /> </p>
            </div>
            </Link>
            <div>
                <button type="button" className="car-button" onClick={onClickAddCart} >Add Cart</button>
            </div>
        </div>
    </div>
    </>
    )
    }}
    </CommonContext.Consumer>
)

}
export default CarItems;