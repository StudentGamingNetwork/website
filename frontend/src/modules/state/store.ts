import { defineStore } from "pinia";

export const useStore = defineStore({
    id: "state",
    actions: {
        modalClose() {
            this.modal = "";
        },
        modalOpen(name: string) {
            this.modal = name;
        }
    },
    state: () => ({
        modal: ""
    })
});
