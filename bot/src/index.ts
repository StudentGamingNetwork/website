import DotEnv from "dotenv";
import { Client, Intents } from "discord.js";

DotEnv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] });

const roleToAdd = "Joueur RL";
const userList = "".split(",");

client.on("ready", async () => {
    console.log(`Logged in as ${ client.user?.tag }!`);

    const guild = await client.guilds.fetch(process.env.GUILD_ID as string);
    const members = await guild.members.fetch();
    const roles = await guild.roles.fetch();

    const role = roles.find((role) => role.name === roleToAdd);

    for (const member of members) {
        const user = member[1].user;

        if (!userList.includes(user.tag)) {
            continue;
        }

        const hasRole = !!member[1].roles.cache.find((role) => role.name === roleToAdd);

        if (hasRole) {
            const index = userList.indexOf(user.tag);
            if (index !== -1) {
                userList.splice(index, 1);
            }
            continue;
        }

        await member[1].roles.add(role?.id as string);

        console.log(user.tag);
    }

    console.log("Done!");
    console.log(JSON.stringify(userList));
});

client.login(process.env.CLIENT_TOKEN).then(() => {
    console.log("Connected");
});
