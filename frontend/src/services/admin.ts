import ApiService from "@/services/api";
import { ERoles } from "@/services/user";

export async function userSearch(query: { limit: number; search: string; skip: number }): Promise<any> {
    const result = await ApiService.get("/admin/user/search", { params: query });
    return result.data;
}

export async function userCertificate(update: { _id?: string; message?: string, status?: string }): Promise<any> {
    const result = await ApiService.post("/admin/user/certificate", update);
    return result.data;
}

export async function userGet(user: { _id?: string }): Promise<any> {
    const result = await ApiService.get(`/admin/user/${ user._id }`);
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

export async function teamList(tournamentSlug: string, management: string): Promise<any> {
    const result = await ApiService.get(`/team/list/${ tournamentSlug }/${ management }`);
    return result.data;
}

export async function teamManage(update: {_id: string; validated?: boolean }): Promise<any> {
    const result = await ApiService.post("/team/manage", update);
    return result.data;
}

export async function teamExport(team: {_id: string}): Promise<any> {
    const result = await ApiService.post("/team/export", team);
    return result.data;
}

export async function userUpdate(update: {_id: string; role: {name: ERoles; modification: "add" | "remove"}}): Promise<any> {
    const result = await ApiService.post("/admin/user/update", update);
    return result.data;
}
