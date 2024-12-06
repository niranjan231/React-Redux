import axios from "axios";

const BASE_URL = "https://dummyjson.com";


export async function login(data){
    return axios.post(`${BASE_URL}/auth/login`, data);
}