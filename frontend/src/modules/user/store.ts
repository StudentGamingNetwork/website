import { defineStore } from "pinia";
import axios from "axios";
import { cloneDeep, omit } from "lodash";
import * as UserService from "@/services/user";
import { Toast, Association } from "@/modules";

export const useStore = defineStore({
    id: "user",
    actions: {
        async disconnect() {
            await Toast.testRequest(async () => {
                return await UserService.disconnect();
            });

            this.$reset();
        },
        async init() {
            if (!document.cookie) {
                return;
            }

            const response = await Toast.testRequest(async () => {
                return await UserService.ping();
            }, { onlyError: true });


            if (response?._id) {
                this.$patch(omit(response, "association"));
                const associationStore = Association.useStore();

                if (response.association) {
                    associationStore.init(response.association);
                }
                else {
                    associationStore.$reset();
                }
            }
        },
        async update({
            password,
            student,
            username
        }: { password: { new: string; old: string }; student: { name: string }; username: string }) {
            const response = await Toast.testRequest(async () => {
                return await UserService.update({ password, student, username });
            });

            if (response?.success) {
                this.username = username;
                this.student.name = student.name;
            }
        },
        async updatePlatforms(platforms: { discord: string }) {
            const response = await Toast.testRequest(async () => {
                return await UserService.updatePlatforms(platforms);
            });

            if (response?.success) {
                this.platforms = cloneDeep(platforms);
            }
        },
        async uploadAvatar(file: File) {
            const response = await Toast.testRequest(async () => {
                return await UserService.uploadAvatar({ file });
            });

            if (response?.success) {
                this.avatar = response.avatar;
            }
        },
        async uploadCertificate(file: File) {
            const response = await Toast.testRequest(async () => {
                return await UserService.uploadCertificate({ file });
            });

            if (response?.success) {
                await this.init();
            }
        }
    },
    getters: {
        getAvatarUrl(): string {
            return UserService.getAvatarUrl({ id: this._id, avatar: this.avatar });
        },
        getCertificateUrl(): string {
            return UserService.getCertificateUrl({ id: this._id, certificate: this.student.certificate });
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
        _id: "",
        avatar: "",
        mail: "",
        platforms: {
            discord: ""
        },
        roles: [] as Array<string>,
        student: {
            name: "",
            certificate: "",
            schoolName: "",
            status: "undefined"
        },
        username: ""
    })
});
