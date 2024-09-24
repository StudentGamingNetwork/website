import { CronJob } from "cron";
import { dumpDatabase, removeOldDumps } from "@/utils/database";


export const dumpDatabaseJob = CronJob.from({
    start: false, 
    cronTime: "0 0 4 * * *",
    onComplete: null,
    onTick: dumpDatabase,
    timeZone: "Europe/Paris"
});

export const deleteOldDumpJob = CronJob.from({
    start: false, 
    cronTime: "0 30 4 * * *",
    onComplete: null,
    onTick: removeOldDumps,
    timeZone: "Europe/Paris"
});
