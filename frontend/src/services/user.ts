import ApiService from "@/services/api";

export async function login({ mail, password }: { mail: string; password: string }) {
    const result = await ApiService.post("/user/login", { mail, password }) as {data: any};
    return result.data;
}

export async function signup({ mail, password }: { mail: string; password: string }) {
    const result = await ApiService.post("/user/signup", { mail, password }) as {data: any};
    return result.data;
}
