import "./App.css";
import { FaCartArrowDown } from "react-icons/fa";
import { LoginApi } from "./Api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCard, clearData } from "./features/counter/counterSlice";
import Modal from "./Modal";
import { FaRegFontAwesomeLogoFull } from "react-icons/fa";

const Navbar = () => {
    const cartItems = useSelector((state) => state.counter.cart);
    const [show , setShow] = useState(false)
    const totalPrice = useSelector((state) => state.counter.totalPrice);
    const [data, setData] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        LoginApi()
            .then((res) => {
                // console.log(res.data);
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleModal=()=>{
        setShow(true)
    }
    const onClose=()=>{
        setShow(false)
    }
    return (
        <div>
            <nav style={{position:"sticky", top:"0", zIndex:"10000"}}>
                <h1 style={{fontSize:"130px"}}><FaRegFontAwesomeLogoFull />
                </h1>
                <h3>Total Price: {totalPrice}</h3> {/* Display the total price */}
                <div className="cart-container">
                    <span onClick={handleModal} className="cart-icon">
                        <FaCartArrowDown />
                        <div  className="notification-badge">{cartItems.length}</div>
                    </span>
                    <button style={{backgroundColor:"blue", color:"white", border:"none", marginLeft:"56px"}} onClick={() => dispatch(clearData())}>Clear Data</button>
                </div>
            </nav>
            {/* Card */}
            <div className="card-parent">
                {data.map((item) => (
                    <div className="card" style={{ width: "15rem" }} key={item.id}>
                        <img src={item.image} className="card-img-top" alt={item.title} />
                        <div className="card-body">
                            <h5 className="card-title">${item.price}</h5>
                            {/* <p className="card-text">{item.description}</p> */}
                            <button
                                onClick={() => dispatch(addToCard(item))}
                                className="btn btn-primary"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {
                show && <Modal onClose={onClose}/>
            }
        </div>
    );
};

export default Navbar;
