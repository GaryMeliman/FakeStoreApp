/* eslint-disable prettier/prettier */
import axios from "axios";
import { FAKE_STORE_API_URL } from "../utils/const";
import { generateCustomError } from "../utils/utils";

export interface LoginRequest {
    username: string;
    password: string;
}

interface LoginResponse {
    token: string;
}

axios.interceptors.request.use(request => {
    console.log('Starting Request', request);
    return request;
});

axios.interceptors.response.use(response => {
    console.log('Response:', response);
    return response;
});

export const loginUser = async (user: LoginRequest): Promise<LoginResponse | undefined> => {
    try {
        const response = await axios.post(
            `${FAKE_STORE_API_URL}auth/login`, user);
        return response.data;
    } catch (error) {
        generateCustomError(error);
    }
}
