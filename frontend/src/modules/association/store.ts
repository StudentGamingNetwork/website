import { defineStore } from "pinia";
import { Toast } from "@/modules";
import * as AssociationService from "@/services/association";
import * as UserService from "@/services/user";

export const useStore = defineStore({
    id: "association",
    actions: {
        async create({ name, mail, school }: { name: string; mail: string; school: string }) {
            const response = await Toast.testRequest(async () => {
                return await AssociationService.create({ name, mail, school });
            });

            if (response?.success) {
                this.$patch(response.association);
            }
        },
        init(associationData: Record<string, any>) {
            this.$patch(associationData);
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
            studentsNumber: 0,
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
