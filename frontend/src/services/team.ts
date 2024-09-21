import ApiService from "@/services/api";
import Config from "@/services/config";

export async function create(tournamentSlug: string): Promise<any> {
    const result = await ApiService.post(`/team/create/${ tournamentSlug }`, {});
    return result.data;
}

export async function update(team: Record<string, any>): Promise<any> {
    const result = await ApiService.post(`/team/update`, team);
    return result.data;
}

export async function get(tournamentSlug: string): Promise<any> {
    const result = await ApiService.get(`/team/get/${ tournamentSlug }`);
    return result.data;
}

export function getLogoUrl(team: { id: string; logo: string }): string {
    return `${ Config.backendUrl }/upload/team/${ team.id }/${ team.logo }`;
}

export async function details(tournamentSlug: string, teamId?: string): Promise<any> {
    const result = await ApiService.post(`/team/details`, { _id: teamId, slug: tournamentSlug });
    return result.data;
}

export async function join(tournamentSlug: string, invitationCode: string): Promise<any> {
    const result = await ApiService.post(`/team/join/${ tournamentSlug }`, { invitationCode });
    return result.data;
}

export async function remove(tournamentSlug: string): Promise<any> {
    const result = await ApiService.delete(`/team/delete/${ tournamentSlug }`);
    return result.data;
}

export async function searchSchools(tournamentSlug: string, searchString: string): Promise<any> {
    const result = await ApiService.get(`/team/schools/${ tournamentSlug }/all/${ searchString }`);
    return result.data;
}

export async function uploadLogo({ file }: { file: File }, id: string): Promise<any> {
    const formData = new FormData();
    formData.append("file", file);

    const result = await ApiService.post(`/team/${ id }/upload/logo`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return result.data;
}
