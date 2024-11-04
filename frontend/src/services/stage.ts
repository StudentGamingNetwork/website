import ApiService from "@/services/api";


export async function update(stage: Record<string, any>): Promise<any> {
    const result = await ApiService.post(`/stage/update`, stage);
    return result.data;
}

export async function get(tournamentSlug: string): Promise<any> {
    const result = await ApiService.get(`/stage/get/${ tournamentSlug }`);
    return result.data;
}

export async function details(tournamentSlug: string, stageId?: string): Promise<any> {
    const result = await ApiService.post(`/stage/details`, { _id: stageId, slug: tournamentSlug });
    return result.data;
}
