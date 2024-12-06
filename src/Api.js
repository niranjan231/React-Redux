

import axios from "axios";

const BASE_URL = "https://fakestoreapi.com";


export async function LoginApi(data){
    return axios.get(`${BASE_URL}/products`)
}