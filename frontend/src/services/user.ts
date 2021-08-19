import Config from "./config";
import ApiService from "@/services/api";

export enum ERoles {
    Admin = "admin",
    Office = "office", // Bureau
    Council = "council", // Conseil/Respos
    Member = "member", // Membres SGN
    Tournament = "tournament",
    Federation = "federation",
    Partnership = "partnership"
}

export async function login({ mail, password }: { mail: string; password: string }): Promise<any> {
    const result = await ApiService.post("/user/login", { mail, password });
    return result.data;
}

export async function signup({ mail, password }: { mail: string; password: string }): Promise<any> {
    const result = await ApiService.post("/user/signup", { mail, password });
    return result.data;
}

export async function ping(): Promise<any> {
    const result = await ApiService.get("/user/ping");
    return result.data;
}

export async function disconnect(): Promise<any> {
    const result = await ApiService.get("/user/disconnect");
    return result.data;
}

export async function uploadAvatar({ file }: { file: File }): Promise<any> {
    const formData = new FormData();
    formData.append("file", file);

    const result = await ApiService.post("/user/upload/avatar", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return result.data;
}

export async function uploadCertificate({ file }: { file: File }): Promise<any> {
    const formData = new FormData();
    formData.append("file", file);

    const result = await ApiService.post("/user/upload/certificate", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return result.data;
}

export async function update (update: { password?: { new: string; old: string }; student?: {name: string}; username?: string }): Promise<any> {
    const result = await ApiService.post("/user/update", update);
    return result.data;
}

export async function updatePlatforms(platforms: Record<string, string>): Promise<any> {
    const result = await ApiService.post("/user/updatePlatforms", {
        platforms
    });
    return result.data;
}

export function getAvatarUrl(user: { id: string; avatar: string }): string {
    return `${ Config.backendUrl }/upload/user/${ user.id }/${ user.avatar }`;
}


export function getCertificateUrl(user: { id: string; certificate: string }): string {
    return `${ Config.backendUrl }/upload/user/${ user.id }/${ user.certificate }`;
}
