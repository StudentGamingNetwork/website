import { defineStore } from "pinia";
import axios from "axios";
import * as UserService from "@/services/user";
import { Toast } from "@/modules";

export const useStore = defineStore({
    id: "user",
    actions: {
        async disconnect() {
            await Toast.testRequest(async () => {
                return await UserService.disconnect();
            });

            this.id = "";
            this.username = "";
        },
        async init() {
            try {
                const userData = await UserService.ping();
                this.id = userData.id;
                this.username = userData.username;
            }
            catch (error) {
                if (!axios.isAxiosError(error)) {
                    throw error;
                }
            }
        }
    },
    state: () => ({
        id: "",
        roles: [] as Array<string>,
        username: ""
    })
});
