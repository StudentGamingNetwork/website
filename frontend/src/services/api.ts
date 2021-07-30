import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export default {
    baseUrl: "",
    async delete (route: string, config?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
        const url = this.baseUrl + route;
        return await Axios.delete(url, config);
    },
    async get (route: string, config?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
        const url = this.baseUrl + route;
        return await Axios.get(url, config);
    },
    init (baseUrl: string): void {
        this.baseUrl = baseUrl;
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
