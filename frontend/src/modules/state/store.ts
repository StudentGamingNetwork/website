import { defineStore } from "pinia";
import { Toast, User } from "@/modules";
import { EToastType } from "@/modules/toast/store";


export const useStore = defineStore({
    id: "state",
    actions: {
        modalClose() {
            this.modal = "";
            document.body.style.overflow = "auto";
        },
        modalOpen(name: string) {
            const userStore = User.useStore();

            if (["login", "signup"].includes(name) && userStore._id) {

                const toastStore = Toast.useStore();
                toastStore.add({
                    title: "Déjà connecté",
                    message: "Vous êtes déjà connecté.",
                    type: EToastType.Warning
                });
                return;
            }

            this.modal = name;
            this.savedScroll = window.scrollY;
            document.body.style.overflow = "hidden";
        }
    },
    state: () => ({
        modal: "",
        savedScroll: 0
    })
});
