import { TUser } from "@/modules/user";

export type TAssociation = {
    _id: string;
    name: string;
    federation: {
        region: string;
    };
    logo: string;
    mail: string;
    networks?: {
        facebook: string;
        instagram: string;
        twitch: string;
        twitter: string;
    };
    school: {
        name: string;
        address: string;
        studentsNumber: number | string;
    };
    settings?: {
        invitationCode: string;
        slug: string;
    };
    tag: string;
    users: {
        members: Array<TUser>;
        owner: TUser;
    };
}
