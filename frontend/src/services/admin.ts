import ApiService from "@/services/api";

export async function userSearch(query: { limit: number; search: string; skip: number }): Promise<any> {
    const result = await ApiService.get("/admin/user/search", { params: query });
    return result.data;
}

export async function userCertificate(body: { _id?: string; status?: string }): Promise<any> {
    const result = await ApiService.post("/admin/user/certificate", body);
    return result.data;
}

export async function associationSearch(query: { limit: number; search: string; skip: number }): Promise<any> {
    const result = await ApiService.get("/admin/association/search", { params: query });
    return result.data;
}

export async function associationUpdate(update: {_id: string; isValidated?: boolean; region?: string }): Promise<any> {
    const result = await ApiService.post("/admin/association/update", update);
    return result.data;
}
