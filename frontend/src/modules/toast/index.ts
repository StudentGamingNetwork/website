import axios from "axios";
import { EToastType, useStore } from "./store";

export { useStore };

export async function testRequest(request: () => Promise<any>): Promise<any> {
    const toastStore = useStore();

    try {
        const response = await request();
        toastStore.add({
            title: "Succès",
            message: response.message,
            type: EToastType.Success
        });
        return response;
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
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
