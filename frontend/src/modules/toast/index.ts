import axios, { AxiosError } from "axios";
import { EToastType, useStore } from "./store";

export { useStore };

export async function testRequest(request: () => Promise<void>): Promise<any> {
    const toastStore = useStore();

    try {
        const response = await request();
        toastStore.add({
            title: "Success",
            message: "Success",
            type: EToastType.Success
        });
        return response;
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.response);
            toastStore.add({
                title: error.response?.data.error,
                message: error.response?.data.message,
                type: EToastType.Error
            });
        }
        else {
            throw error;
        }
    }
}
