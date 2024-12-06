import React from "react";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { removeCart, ICounter, DecrementCounter } from "../features/counter/counterSlice";

const Modal = ({ onClose }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.counter.cart);

    return (
        <div style={styles.modal}>
            <div style={styles.modalContent}>
                <h2 style={styles.header}>Your Cart</h2>
                <div style={styles.cartItems}>
                    {user.map((data) => (
                        <div
                            key={data.id}
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "10px",
                            }}
                        >
                            <img
                                style={{ width: "85px", height: "85px" }}
                                src={data.image}
                                alt=""
                            />
                            <button
                                style={styles.incrementButton}
                                onClick={() => dispatch(ICounter(data))}
                            >
                                +
                            </button>
                            <p>{data.quantity}</p>
                            <button onClick={() => dispatch(DecrementCounter(data))} style={styles.decrementButton}>-</button>
                            <span>Price: {data.price}</span>
                            <button
                                onClick={() => dispatch(removeCart(data))}
                                style={styles.removeButton}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
                <button onClick={onClose} style={styles.closeButton}>
                    Close
                </button>
            </div>
        </div>
    );
};

const styles = {
    modal: {
        position: "fixed",
        top: 0,
        right: 0,
        height: "100vh",
        width: "300px",
        backgroundColor: "#f9f9f9",
        boxShadow: "-2px 0 5px rgba(0, 0, 0, 0.3)",
        zIndex: 1000,
        padding: "20px",
        display: "flex",
        flexDirection: "column",
    },
    modalContent: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
    },
    header: {
        marginBottom: "20px",
        fontSize: "20px",
        fontWeight: "bold",
        textAlign: "center",
    },
    cartItems: {
        flex: 1,
        overflowY: "auto",
    },
    incrementButton: {
        color: "white",
        backgroundColor: "green",
        border: "none",
        height: "40px",
        width: "50px",
        cursor: "pointer",
    },
    decrementButton: {
        color: "white",
        backgroundColor: "green",
        border: "none",
        height: "40px",
        width: "50px",
        cursor: "pointer",
    },
    removeButton: {
        color: "white",
        backgroundColor: "red",
        border: "none",
        height: "40px",
        cursor: "pointer",
    },
    closeButton: {
        marginTop: "20px",
        padding: "10px 20px",
        backgroundColor: "red",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        alignSelf: "center",
    },
};


export default Modal;
