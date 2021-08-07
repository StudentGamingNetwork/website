import ApiService from "@/services/api";
import Config from "@/services/config";

export async function create({ name, mail, school }: { name: string; mail: string; school: string }): Promise<any> {
    const result = await ApiService.post("/association/create", { name, mail, school });
    return result.data;
}

export async function uploadLogo({ file }: { file: File }): Promise<any> {
    const formData = new FormData();
    formData.append("file", file);

    const result = await ApiService.post("/association/upload/logo", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return result.data;
}

export function getLogoUrl(association: { id: string; logo: string }): string {
    return `${ Config.backendUrl }/upload/association/${ association.id }/${ association.logo }`;
}
