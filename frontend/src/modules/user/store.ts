import { defineStore } from "pinia";
import axios from "axios";
import * as UserService from "@/services/user";
import * as AssociationService from "@/services/association";
import { Toast } from "@/modules";

export const useStore = defineStore({
    id: "user",
    actions: {
        async createAssociation({ name, mail, school }: { name: string; mail: string; school: string }) {
            const response = await Toast.testRequest(async () => {
                return await AssociationService.create({ name, mail, school });
            });

            if (response?.success) {
                this.association = response.id;
            }
        },
        async disconnect() {
            await Toast.testRequest(async () => {
                return await UserService.disconnect();
            });

            this.$reset();
        },
        async init() {
            try {
                const userData = await UserService.ping();
                this.id = userData._id;
                this.username = userData.username;
                this.mail = userData.mail;
                this.roles = userData.roles;
                this.avatar = userData.avatar;
                this.name = userData.name;
                this.association = userData.association;
            }
            catch (error) {
                if (!axios.isAxiosError(error)) {
                    throw error;
                }
            }
        },
        async update({ name, password, username }: { name: string; password: { new: string; old: string }; username: string }) {
            const response = await Toast.testRequest(async () => {
                return await UserService.update({ name, password, username });
            });

            if (response?.success) {
                this.username = username;
                this.name = name;
            }
        },
        async uploadAvatar(file: File) {
            const response = await Toast.testRequest(async () => {
                return await UserService.uploadAvatar({ file });
            });

            if (response?.success) {
                this.avatar = response.avatar;
            }
        }
    },
    getters: {
        getAvatarUrl(): string{
            return UserService.getAvatarUrl({ id: this.id, avatar: this.avatar });
        },
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
        },
        isMember(): boolean {
            if (this.isAdmin) {
                return true;
            }
            return this.roles.includes("member");
        }
    },
    state: () => ({
        id: "",
        name: "",
        association: "",
        avatar: "",
        mail: "",
        roles: [] as Array<string>,
        username: ""
    })
});
