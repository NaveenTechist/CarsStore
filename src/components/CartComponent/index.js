import Header from "../Header";
import './index.css';
import CommonContext from '../../CommonContext/common';
import { MdDelete } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
const CartComponent = () => {
    return(
    <CommonContext.Consumer>
        {value => { 
            const { cartList, deleteCartListItem } = value;
            console.log(cartList);

            const totalFunction = () => {
                let total = 0;
                cartList.forEach(each => {
                    total += each.price; // Assuming review is the price
                });
                return total;
            }
            const onClickRemoveBtn = (id) => {
                console.log(id);
                deleteCartListItem(id);
            }
    return (
        <>
        <Header />
        {cartList.length > 0 ? (
            <div className="cart-component">
                <div className="cart-heading"> 
                    <h1 className="">My Cart</h1>
                </div>
                <ul className="cart-ul">
                    {cartList.map(each => (
                        <li key={each.id} className="cart-li">
                            <div className="cart-items">
                                <img src={each.imgUrl} alt={each.name} className="cart-image" />
                                <div> 
                                <h2 className="cart-item-name">{each.name}</h2>
                                <p className="car-rating">Price: <span>{each.price}/-</span></p>
                                <p className="car-rating">Rating: {each.rating} <FaStar className="star-icon" /> </p>
                                
                                </div>
                            </div>
                            <div> 
                            <button className="remove-button" onClick={() => onClickRemoveBtn(each.id)}><MdDelete className="cart-delete" /></button>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="cart-total">
                    <p>Total: {totalFunction()} /- </p>
                </div>
            </div>
        )  :
        <div className="no-cart-component">
            <img src="https://cdn-icons-png.flaticon.com/128/1380/1380641.png" alt="Empty Cart" className="empty-cart-image" />
            <h1 className="empty-cart-heading">Your Cart is Empty</h1>
        </div>
        }
        </>
    );
    }}
    </CommonContext.Consumer>
    )
}
export default CartComponent;