import { defineStore } from "pinia";

export const useStore = defineStore({
    id: "state",
    actions: {
        modalClose() {
            this.modal = "";
            document.body.style.overflow = "auto";
        },
        modalOpen(name: string) {
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
