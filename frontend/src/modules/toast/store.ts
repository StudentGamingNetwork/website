import { defineStore } from "pinia";
import { v4 as uuidV4 } from "uuid";

const TOAST_TIME = 10 * 1000;

export enum EToastType {
    Success = "success",
    Info = "info",
    Warning = "warning",
    Error = "error"
}

export type TToast = {
    id: string;
    title: string;
    close: () => void;
    message: string;
    type: EToastType;
}

export const useStore = defineStore("toast",{
    actions: {
        add({ title, message, type }: { title: string; message: string; type: EToastType }) {
            if (!this.activated && type === EToastType.Success) {
                return;
            }
            const id = uuidV4();
            this.toasts[id] = {
                id,
                title,
                close: () => {
                    delete this.toasts[id];
                },
                message,
                type
            };
            setTimeout(() => {
                delete this.toasts[id];
            }, TOAST_TIME);
        }
    },
    state: () => ({
        activated: true,
        toasts: {} as Record<string, TToast>
    })
});
