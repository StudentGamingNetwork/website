import { defineStore } from "pinia";
import { cloneDeep, omit } from "lodash";
import * as UserService from "@/services/user";
import { Toast, Association } from "@/modules";
import { ERoles } from "@/services/user";

export const useStore = defineStore({
    id: "user",
    actions: {
        async disconnect() {
            await Toast.testRequest(async () => {
                return await UserService.disconnect();
            });

            this.$reset();
        },
        hasRoles(roles: Array<ERoles>): boolean {
            if (this.roles.includes(ERoles.Admin)) {
                return true;
            }

            for (const role of roles) {
                if (!this.roles.includes(role)) {
                    return false;
                }
            }

            return true;
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
                    this.association = response.association._id;
                }
                else {
                    associationStore.$reset();
                }
            }
        },
        async update(update: { password?: { new: string; old: string }; student?: { name: string }; username?: string }) {
            const response = await Toast.testRequest(async () => {
                return await UserService.update(update);
            });

            if (response?.success && update.username) {
                this.username = update.username;
                this.student.name = update.student?.name || "";
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
            return this.roles.includes(ERoles.Member) && this.roles.includes(ERoles.Federation);
        },
        hasPartnersRight(): boolean {
            if (this.isAdmin) {
                return true;
            }
            return this.roles.includes(ERoles.Member) && this.roles.includes(ERoles.Partnership);
        },
        hasTournamentRight(): boolean {
            if (this.isAdmin) {
                return true;
            }
            return this.roles.includes(ERoles.Member) && this.roles.includes(ERoles.Tournament);
        },
        isAdmin(): boolean {
            return this.roles.includes(ERoles.Admin);
        },
        isMember(): boolean {
            if (this.isAdmin) {
                return true;
            }
            return this.roles.includes(ERoles.Member);
        }
    },
    state: () => ({
        _id: "",
        association: "",
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
