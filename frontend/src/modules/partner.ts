import { merge } from "lodash";

export type TPartner = {
    _id: string;
    name: string;
    description: string;
    logo: string;
    networks: {
        facebook: string;
        twitter: string;
        website: string;
    };
    public: boolean;
}


export function makeObject(partner: Partial<TPartner>): TPartner {
    const basicPartner = {
        _id: "",
        name: "",
        description: "",
        logo: "",
        networks: {
            facebook: "",
            twitter: "",
            website: ""
        },
        public: ""
    };

    return merge(basicPartner, partner);
}
