export type TUser = {
    _id: string;
    avatar: string;
    mail: string;
    platforms: {
        discord: string;
    };
    student: {
        name: string;
        schoolName: string;
        status: string;
    };
    username: string;
};

export type TCompleteUser = TUser & {
    association: {
        school: {
            name: string;
        };
        tag: string;
    };
}
