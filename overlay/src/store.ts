import { defineStore } from "pinia";

export type TDonation = {
    _id: string;
    author: string;
    message: string;
    date: string;
    amount: number;
}

const backendUrl = import.meta.env.VITE_BACKEND_HOST as string;

export const useDonationStore = defineStore({
    id: "donation",
    actions: {
        async updateList() {
            const request = await fetch(backendUrl + "/api/overlay/donation/list");
            const result = await request.json() as Array<TDonation>;

            for (const donation of result) {
                if (donation.date > this.lastDate) {
                    this.lastDate = donation.date;
                    this.list.push(donation);
                }
            }
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
        lastDate: "",
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
