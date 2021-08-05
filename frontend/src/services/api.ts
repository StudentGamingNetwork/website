import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Config from "./config";

Axios.defaults.withCredentials = true;

export default {
    baseUrl: `${ Config.backendUrl }/api`,
    async delete (route: string, config?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
        const url = this.baseUrl + route;
        return await Axios.delete(url, config);
    },
    async get (route: string, config?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
        const url = this.baseUrl + route;
        return await Axios.get(url, config);
    },
    async post (route: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
        const url = this.baseUrl + route;
        return await Axios.post(url, data, config);
    },
    async put (route: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
        const url = this.baseUrl + route;
        return await Axios.put(url, data, config);
    }
};
