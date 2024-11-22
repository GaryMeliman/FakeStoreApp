/* eslint-disable prettier/prettier */
import axios from "axios";
import { FAKE_STORE_API_URL } from "../utils/const";
import { generateCustomError } from "../utils/utils";

export interface ProductResponse {
    id: number,
    title: string,
    price: number,
    category: string,
    description: string,
    image: string
    rating: {
        rate: number;
        count: number;
    }
}

axios.interceptors.request.use(request => {
    console.log('Starting Request', request);
    return request;
});

axios.interceptors.response.use(response => {
    console.log('Response:', response);
    return response;
});

export const getAllProducts = async (): Promise<ProductResponse[] | undefined> => {
    try {
        const response = await axios.get(`${FAKE_STORE_API_URL}products`);
        return response.data;
    } catch (error) {
        generateCustomError(error);
    }
}

