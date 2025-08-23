import Header from "../Header";
import './index.css';
const ServicesRoute = () => {
    return (
        <>
        <Header />
        <div className="no-services-container">
            <img className="services-img" src="https://imgs.search.brave.com/rvttiob86uCgNI8rAbRMaVzSm6wydi4_qkgYIFIX2Z8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMDcv/NDA3LzEyOC9zbWFs/bC9tZWNoYW5pYy10/ZWNobmljaWFuLWZp/eGluZy1jYXItZW5n/aW5lLWZyZWUtdmVj/dG9yLmpwZw" alt="no services" />    
            <h1 className="empty-cart-heading">No-Services</h1>
        </div>
        </>
    );
}
export default ServicesRoute;