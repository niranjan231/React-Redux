

import axios from "axios";

const BASE_URL = "https://fakestoreapi.com";


export async function fetchProductData(data){
    return axios.get(`${BASE_URL}/products`)
}