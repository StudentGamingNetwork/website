import { defineStore } from "pinia";

export type TDonation = {
    _id: string;
    author: string;
    message: string;
    date: string;
    amount: number;
}

export const useDonationStore = defineStore({
    id: "donation",
    actions: {
        updateList() {
        },
        getNextDonation() {
            return this.list.shift();
        }
    },
    getters: {
        hasDonations(state) {
            return !!state.list.length
        }
    },
    state: () => ({
        lastDate: null,
        list: [
            {
                _id: "a",
                author: "Herobrine",
                message: "Loading...",
                amount: 0,
                date: "0"
            },
            {
                _id: "b",
                author: "Herobrine",
                message: "Ready!",
                amount: 25,
                date: "1"
            }
        ] as Array<TDonation>
    })
});
