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
            this.mail = "";
        },
        async init() {
            try {
                const userData = await UserService.ping();
                this.id = userData.id;
                this.username = userData.username;
                this.mail = userData.mail;
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
        mail: "",
        roles: [] as Array<string>,
        username: ""
    })
});
