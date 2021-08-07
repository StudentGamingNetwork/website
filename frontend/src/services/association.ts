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

export async function search(query: { limit: number; search: string; skip: number }): Promise<any> {
    const result = await ApiService.get("/association/search", { params: query });
    return result.data;
}

export function getRegionName(region: string): string {
    const regionNames = {
        ara: "Auvergne-Rhone-Alpes",
        geb: "Grand Est / Bourgogne-Franche-Comté",
        hdf: "Hauts-de-France",
        idf: "Ile-de-France",
        nac: "Nouvelle-Aquitaine / Centre-Val-de-Loire",
        nbp: "Normandie / Bretagne / Pays-de-la-Loire",
        none: "Aucune région",
        opc: "Occitanie / PACA / Corse"
    } as Record<string, string>;

    return regionNames[region];
}
