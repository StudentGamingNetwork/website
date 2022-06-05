import DotEnv from "dotenv";
import { Client, Intents, TextChannel } from "discord.js";

DotEnv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES] });

const guildId = "902322913879916554";
const roleToAdd = "Joueur Echec";
const channelToSend = "bot-role";
const roleMessage = `Tu as maintenant le rôle "Joueur Echec", bienvenue dans le tournoi !`;
const userList = "".split(",");

client.on("ready", async () => {
    console.log(`Logged in as ${ client.user?.tag }!`);

    const guild = await client.guilds.fetch(guildId);
    const members = await guild.members.fetch();
    const roles = await guild.roles.fetch();
    const channels = await guild.channels.fetch();

    const role = roles.find((role) => role.name === roleToAdd);
    const channel = channels.find((channel) => channel.name === channelToSend) as TextChannel;

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
        await channel.send(`${ user.toString() } - ${ roleMessage }`);

        console.log(user.tag);
    }

    console.log("Done!");
    console.log(JSON.stringify(userList));
});

client.login(process.env.CLIENT_TOKEN).then(() => {
    console.log("Connected");
});
