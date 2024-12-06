import "../App.css";
import { FaCartArrowDown } from "react-icons/fa";
import { fetchProductData } from "../Service/Api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCard, clearData } from "../features/counter/counterSlice";
import Modal from "../Component/Modal";

const Navbar = () => {
    const cartItems = useSelector((state) => state.counter.cart);
    const totalPrice = useSelector((state) => state.counter.totalPrice);
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const [products, setProducts] = useState([]);
    const [displayProducts, setDisplayProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const res = await fetchProductData();
                setProducts(res.data);
                setDisplayProducts(res.data);
                setCategories(["all", ...new Set(res.data.map((item) => item.category))]);
                console.log("Products loaded successfully");
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        loadProducts();
    }, []);

    useEffect(() => {
        let filtered = products;
        if (selectedCategory !== "all") {
            filtered = products.filter((item) => item.category === selectedCategory);
        }
        if (searchQuery) {
            filtered = filtered.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        if (sortOrder === "asc") {
            filtered.sort((a, b) => a.price - b.price);
        } else {
            filtered.sort((a, b) => b.price - a.price);
        }
        setDisplayProducts(filtered);
        setCurrentPage(1);
    }, [selectedCategory, searchQuery, sortOrder, products]);

    const handleModal = () => setShow(true);
    const onClose = () => setShow(false);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = displayProducts.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div>
            <nav className="navbar">
                <h1 className="logo">🛒 My Shop</h1>
                <h3>Total Price: ${totalPrice}</h3>
                <div className="cart-container">
                    <span onClick={handleModal} className="cart-icon">
                        <FaCartArrowDown />
                        <div className="notification-badge">{cartItems.length}</div>
                    </span>
                    <button className="clear-btn" onClick={() => dispatch(clearData())}>Clear Cart</button>
                </div>
            </nav>

            <div className="filter-container">
                <label>Category:</label>
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            <div className="card-parent">
                {currentItems.map((item) => (
                    <div className="card" key={item.id}>
                        <img src={item.image} alt={item.title} className="card-img" />
                        <div className="card-body">
                            <h5>${item.price}</h5>
                            <button onClick={() => dispatch(addToCard(item))} className="btn btn-primary">Add to Cart</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pagination">
                <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Previous</button>
                <span> Page {currentPage} of {Math.ceil(displayProducts.length / itemsPerPage)} </span>
                <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(displayProducts.length / itemsPerPage)))} disabled={currentPage === Math.ceil(displayProducts.length / itemsPerPage)}>Next</button>
            </div>

            {show && <Modal onClose={onClose} />}
        </div>
    );
};

export default Navbar;
