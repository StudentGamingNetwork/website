import ApiService from "@/services/api";

export async function create({ name, mail, school }: { name: string; mail: string; school: string }): Promise<any> {
    const result = await ApiService.post("/association/create", { name, mail, school });
    return result.data;
}
