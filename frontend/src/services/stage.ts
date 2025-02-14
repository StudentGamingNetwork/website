import { TStage } from "@/modules/stage";
import ApiService from "@/services/api";


export async function update(stage: TStage, id: string): Promise<any> {
    const result = await ApiService.post(`/stage/update/${ id }`, stage);
    return result.data;
}

export async function get(id: string): Promise<any> {
    const result = await ApiService.get(`/stage/get/${ id }`);
    return result.data;
}

export async function list(tournamentSlug: string): Promise<any> {
    const result = await ApiService.get(`/stage/list/${ tournamentSlug }`);
    return result.data;
}

export async function details(tournamentSlug: string, stageId: string): Promise<any> {
    const result = await ApiService.post(`/stage/details`, { _id: stageId, slug: tournamentSlug });
    return result.data;
}

export async function create(tournamentSlug: string): Promise<any> {
    const result = await ApiService.post("/stage/create", { slug: tournamentSlug });
    return result.data;
}


export async function remove(id: string): Promise<any> {
    const result = await ApiService.delete(`/stage/delete/${ id }`);
    return result.data;
}
