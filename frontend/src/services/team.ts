import ApiService from "@/services/api";

export async function create(tournamentSlug: string): Promise<any> {
    const result = await ApiService.post(`/team/create/${ tournamentSlug }`, {});
    return result.data;
}

export async function update(team: Record<string, any>, id: string): Promise<any> {
    const result = await ApiService.post(`/team/update/${ id }`, team);
    return result.data;
}

export async function get(tournamentSlug: string): Promise<any> {
    const result = await ApiService.get(`/team/get/${ tournamentSlug }`);
    return result.data;
}

export async function remove(id: string): Promise<any> {
    const result = await ApiService.delete(`/team/delete/${ id }`);
    return result.data;
}
