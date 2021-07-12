import { defineStore } from "pinia";

export const useStore = defineStore({
    id: "state",
    actions: {
        modalLogInClose() {
            this.modals.logIn = false;
        },
        modalLogInOpen() {
            this.modals.signUp = false;
            this.modals.logIn = true;
        },
        modalSignUpClose() {
            this.modals.signUp = false;
        },
        modalSignUpOpen() {
            this.modals.logIn = false;
            this.modals.signUp = true;
        }
    },
    state: () => ({
        modals: {
            logIn: false,
            signUp: false
        }
    })
});
