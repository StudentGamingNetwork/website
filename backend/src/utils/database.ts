import { promises as pfs } from "node:fs";
import * as cs from "cross-spawn";
import { format, differenceInDays, parse } from "date-fns";
import { backupDir } from "@/utils/index";


const BACKUP_RETENTION_DAYS = 30;

export async function dumpDatabase() {
    const dumpDate = format(new Date(), "dd-MM-yyyy");
    cs.spawn("mongodump", ["--db", "sgnw", "--out", `${ backupDir }/${ dumpDate }`], { stdio: "inherit" });
}

export async function removeOldDumps() {
    const currentDate = new Date();

    const dirs = await pfs.readdir(backupDir,{ encoding: "utf-8" });
    dirs.forEach(async (dir) => {
        const dumpDate = parse(dir, "dd-MM-yyyy", new Date());
        const dayDifferences = differenceInDays(currentDate, dumpDate);
        if (dayDifferences >= BACKUP_RETENTION_DAYS) {
            
            await pfs.rm(`${ backupDir }${ dir }`, { recursive: true }); 
        }
    });
}
