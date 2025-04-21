import { domen } from "../index.js";
import axiosInterceptor from "./AxiosInterceptor.js";

export default function apiCall(url, method, data) {
    let item = localStorage.getItem("token");
    return axiosInterceptor({
        baseURL: domen,
        url,
        method: method,
        data,
        headers: {
            "token": item,
        },
    })
}