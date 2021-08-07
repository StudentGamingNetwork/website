import { defineStore } from "pinia";
import { Toast, User } from "@/modules";
import * as AssociationService from "@/services/association";

export const useStore = defineStore({
    id: "association",
    actions: {
        async create({ name, mail, school }: { name: string; mail: string; school: string }) {
            const response = await Toast.testRequest(async () => {
                return await AssociationService.create({ name, mail, school });
            });

            if (response?.success) {
                const userStore = User.useStore();
                await userStore.init();
            }
        },
        init(associationData: Record<string, any>) {
            this.$patch(associationData);
            this.school.studentsNumber = this.school.studentsNumber ? this.school.studentsNumber.toString() : "";
        },
        async update(association: Record<string, string>) {
            const response = await Toast.testRequest(async () => {
                return await AssociationService.update(association);
            });

            if (response?.success) {
                const userStore = User.useStore();
                await userStore.init();
            }
        },
        async uploadLogo(file: File) {
            const response = await Toast.testRequest(async () => {
                return await AssociationService.uploadLogo({ file });
            });

            if (response?.success) {
                this.logo = response.logo;
            }
        }
    },
    getters: {
        getLogoUrl(): string {
            return AssociationService.getLogoUrl({ id: this._id, logo: this.logo });
        }
    },
    state: () => ({
        _id: "",
        name: "",
        logo: "",
        mail: "",
        networks: {
            facebook: "",
            instagram: "",
            twitch: "",
            twitter: ""
        },
        school: {
            name: "",
            address: "",
            region: "",
            studentsNumber: "" as number | string,
            type: ""
        },
        tag: "",
        users: {
            members: [] as Array<string>,
            moderators: [] as Array<string>,
            owner: ""
        }
    })
});
