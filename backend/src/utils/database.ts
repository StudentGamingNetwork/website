import { promises as pfs } from "node:fs";
import * as cs from "cross-spawn";

const BACKUP_RETENTION_DAYS = 30;

export async function dumpDatabase() {
    const dumpDate = new Date().toLocaleDateString("fr-fr",{ day: "2-digit", month: "2-digit", year: "numeric" }).replaceAll("/", "-");
    const folderName = `../dumps/${ dumpDate }`;
    await pfs.mkdir(folderName, { recursive: true });

    const child = cs.spawn("mongodump", ["--db", "sgnw", "--out", `../dumps/${ dumpDate }`], { stdio: "inherit" });
}

export async function removeOldDumps() {
    const currentDate = new Date();
    const folderName = "../dumps/";

    const dirs = await pfs.readdir(folderName,{ encoding: "utf-8" });
    dirs.forEach(async (dir) => {
        const [day, month, year] = dir.split("-").map(Number);
        const dumpDate = new Date(year, month - 1, day);
        const Difference_In_Days = Math.floor((currentDate.getTime() - dumpDate.getTime()) / (1000 * 3600 * 24));

        if (Difference_In_Days > BACKUP_RETENTION_DAYS) {
            pfs.rm(`${ folderName }/${ dir }`, { recursive: true }); 
        }
    });
}
