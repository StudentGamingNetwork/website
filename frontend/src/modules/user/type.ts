import { ERoles } from "@/services/user";

export type TUser = {
    _id: string;
    avatar: string;
    mail: string;
    platforms: {
        discord: string;
    };
    student: {
        name: string;
        certificate: string;
        rejectReason: string;
        schoolName: string;
        status: string;
    };
    username: string;
};

export type TCompleteUser = TUser & {
    association: {
        _id: string;
        school: {
            name: string;
        };
        settings: {
            slug: string;
        };
        tag: string;
    };
    roles: Array<ERoles>;
}
