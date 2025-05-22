import { defineStore } from "pinia";
import { Toast, User } from "@/modules";
import { EToastType } from "@/modules/toast/store";
import i18n from "@/locales";


export const useStore = defineStore({
    id: "state",
    actions: {
        modalClose() {
            this.modal = "";
            document.body.style.overflow = "auto";
        },
        modalOpen(name: string) {
            const userStore = User.useStore();

            if (["login", "signup", "twoFactorAuth"].includes(name) && userStore._id) {

                const toastStore = Toast.useStore();
                toastStore.add({
                    title: i18n.global.t("utils.toast.alreadyConnected.title"),
                    message: i18n.global.t("utils.toast.alreadyConnected.message"),
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
