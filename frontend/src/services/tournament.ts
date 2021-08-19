import ApiService from "@/services/api";
import Config from "@/services/config";

export enum ETournamentType {
    Coming = "coming",
    Current = "current",
    Past = "past"
}

export async function create(): Promise<any> {
    const result = await ApiService.post("/tournament/create", {});
    return result.data;
}

export function getLogoUrl(tournament: { id: string; logo: string }): string {
    return `${ Config.backendUrl }/upload/tournament/${ tournament.id }/${ tournament.logo }`;
}

export async function search(query: { limit: number; search: string; skip: number }): Promise<any> {
    const result = await ApiService.get("/tournament/search", { params: query });
    return result.data;
}

export async function update(tournament: Record<string, any>, id: string): Promise<any> {
    const result = await ApiService.post(`/tournament/update/${ id }`, tournament);
    return result.data;
}

export async function get(slug: string): Promise<any> {
    const result = await ApiService.get(`/tournament/get/${ slug }`);
    return result.data;
}

export async function remove(id: string): Promise<any> {
    const result = await ApiService.delete(`/tournament/delete/${ id }`);
    return result.data;
}

export async function list(type: ETournamentType): Promise<any> {
    const result = await ApiService.get(`/tournament/list/${ type }`);
    return result.data;
}

export async function uploadLogo({ file }: { file: File }, id: string): Promise<any> {
    const formData = new FormData();
    formData.append("file", file);

    const result = await ApiService.post(`/tournament/upload/logo/${ id }`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return result.data;
}
