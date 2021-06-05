import ConfigModel, { IConfig } from "./model";

export async function createConfig(name: string, data: Record<string, any>): Promise<void> {
    await ConfigModel.create({ data, name });
}

export async function deleteConfig(name: string): Promise<void> {
    await ConfigModel.deleteOne({ name });
}

export async function doesConfigExist(name: string): Promise<boolean> {
    const config = await ConfigModel.find({ name }).exec();
    return config.length > 0;
}

export async function getConfigData(name: string): Promise<Record<string, any>> {
    const config = await ConfigModel.findOne({ name }).exec() as IConfig;
    return config.data;
}

export async function updateConfigData(name: string, data: Record<string, any>): Promise<void> {
    await ConfigModel.updateOne({ name }, { data }).exec();
}
