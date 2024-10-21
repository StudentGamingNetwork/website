import ApiService from "@/services/api";

export async function create(): Promise<any> {
    const result = await ApiService.get("/2fa/create");
    return result.data;
}

export async function remove(): Promise<any> {
    const result = await ApiService.delete("/2fa/remove");
    return result.data;
}

export async function verify(token: string): Promise<any> {
    const result = await ApiService.post("/2fa/verify", { token });
    return result.data;
}
