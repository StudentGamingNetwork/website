import ApiService from "@/services/api";
import Config from "@/services/config";

export async function create(): Promise<any> {
    const result = await ApiService.post("/partner/create", {});
    return result.data;
}

export function getLogoUrl(partner: { id: string; logo: string }): string {
    return `${ Config.backendUrl }/upload/partner/${ partner.id }/${ partner.logo }`;
}

export async function update(partner: Record<string, any>): Promise<any> {
    const result = await ApiService.post(`/partner/update`, partner);
    return result.data;
}

export async function get(slug: string): Promise<any> {
    const result = await ApiService.get(`/partner/get/${ slug }`);
    return result.data;
}

export async function remove(id: string): Promise<any> {
    const result = await ApiService.delete(`/partner/delete/${ id }`);
    return result.data;
}

export async function list(): Promise<any> {
    const result = await ApiService.get(`/partner/list`);
    return result.data;
}

export async function uploadLogo({ file }: { file: File }, id: string): Promise<any> {
    const formData = new FormData();
    formData.append("file", file);

    const result = await ApiService.post(`/partner/upload/logo/${ id }`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return result.data;
}
