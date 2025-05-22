import axios from "axios";
import { EToastType, useStore } from "./store";
import i18n from "@/locales";

export { useStore };

export async function testRequest(request: () => Promise<any>, options?: {onlyError?: boolean}): Promise<any> {
    const toastStore = useStore();

    try {
        const response = await request();
        if (!options?.onlyError) {
            toastStore.add({
                title: i18n.global.t("utils.toast.success"),
                message: response.message,
                type: EToastType.Success
            });
        }
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
