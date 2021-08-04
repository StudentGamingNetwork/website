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
            this.roles = [];
        },
        async init() {
            try {
                const userData = await UserService.ping();
                this.id = userData.id;
                this.username = userData.username;
                this.mail = userData.mail;
                this.roles = userData.roles;
            }
            catch (error) {
                if (!axios.isAxiosError(error)) {
                    throw error;
                }
            }
        }
    },
    getters: {
        hasFederationRight(): boolean {
            if (this.isAdmin) {
                return true;
            }
            return this.roles.includes("member") && this.roles.includes("federation");
        },
        hasPartnersRight(): boolean {
            if (this.isAdmin) {
                return true;
            }
            return this.roles.includes("member") && this.roles.includes("partnership");
        },
        hasTournamentRight(): boolean {
            if (this.isAdmin) {
                return true;
            }
            return this.roles.includes("member") && this.roles.includes("tournament");
        },
        isAdmin(): boolean {
            return this.roles.includes("admin");
        }
    },
    state: () => ({
        id: "",
        mail: "",
        roles: [] as Array<string>,
        username: ""
    })
});
