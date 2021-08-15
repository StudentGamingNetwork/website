import Config from "./config";
import ApiService from "@/services/api";

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

export async function update({ password, student, username }: { password: { new: string; old: string }; student: {name: string}; username: string }): Promise<any> {
    const result = await ApiService.post("/user/update", {
        password,
        student,
        username
    });
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
