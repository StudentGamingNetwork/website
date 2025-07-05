import { escapeRegExp } from "lodash-es";
import UserModel, { IUserDocument } from "@/modules/user/model";

export async function userSearch({ limit, search, skip }: { limit: number; search?: string; skip: number }): Promise<Array<IUserDocument>> {

    const findParameters = {} as Record<string, any>;

    if (search) {
        const searchRegex = new RegExp(escapeRegExp(search), "gi");

        findParameters.$or = [
            { "student.name": searchRegex },
            { "username": searchRegex },
            { "mail": searchRegex },
            { "platforms.discord": searchRegex }
        ];
    }

    return UserModel.find(findParameters)
        .sort({ "_id": -1 })
        .skip(skip)
        .limit(limit)
        .populate("association")
        .exec();
}

export async function userSearchTotal({ search }: { search?: string }) {

    const findParameters = {} as Record<string, any>;

    if (search) {
        const searchRegex = new RegExp(escapeRegExp(search), "gi");

        findParameters.$or = [
            { "student.name": searchRegex },
            { "username": searchRegex },
            { "mail": searchRegex },
            { "platforms.discord": searchRegex }
        ];
    }

    return UserModel.find(findParameters).countDocuments().exec();
}
