import { CronJob } from "cron";
import { dumpDatabase, removeOldDumps } from "@/utils/database";


export const dumpDatabaseJob = CronJob.from({
    cronTime: "0 0 4 * * *",
    onComplete: null,
    onTick: dumpDatabase,
    timeZone: "Europe/Paris"
});
dumpDatabaseJob.start();

export const deleteOldDumpJob = CronJob.from({
    cronTime: "0 30 4 * * *",
    onComplete: null,
    onTick: removeOldDumps,
    timeZone: "Europe/Paris"
});
deleteOldDumpJob.start();
