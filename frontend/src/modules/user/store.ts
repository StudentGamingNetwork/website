import { defineStore } from "pinia";
import axios from "axios";
import * as UserService from "@/services/user";

export const useStore = defineStore({
    id: "user",
    actions: {
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
