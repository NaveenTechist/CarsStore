import Header from "../Header";
import './index.css';
const ServicesRoute = () => {
    return (
        <>
        <Header />
        <div className="cart-component">
            <h1 className="empty-cart-heading">Present</h1>
            <h1 className="empty-cart-heading">No-Services</h1>
        </div>
        </>
    );
}
export default ServicesRoute;