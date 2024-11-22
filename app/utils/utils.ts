/* eslint-disable prettier/prettier */
import axios from "axios";
import { INVALID_CREDENTIALS } from "./const";
import { CustomError } from "./models";

export const generateCustomError = (error: unknown) => {
    console.log(error);
    if (axios.isAxiosError(error) && error.response) {
        const data = error.response.data;
        if (data === "username or password is incorrect") {
            throw new CustomError(INVALID_CREDENTIALS.title, INVALID_CREDENTIALS.details);
        }
    } else {
        throw new CustomError("Ha ocurrido un error inesperado", "Por favor inténtelo mas tarde");
    }
}

export const roundToNearestHalf = (number: number) => {
    const decimal = number % 1;
    if (decimal < 0.25) {
        return Math.floor(number);
    } else if (decimal >= 0.25 && decimal < 0.75) {
        return Math.floor(number) + 0.5;
    } else {
        return Math.ceil(number);
    }
}