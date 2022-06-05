import DotEnv from "dotenv";
import { Client, GuildMember, Intents } from "discord.js";

DotEnv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] });

const guildId = "350028728165990411";

function shuffleArray<T>(originalArray: Array<T>) {
    const array = [...originalArray];
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

const savedNickNames: Record<string, string | null> = { "[ESSEC] Dayan#1948": "Dayan","Aankara#1214": "Yann / Aankara, Yu-Gi-Oh fanboy","Absolute#8686": "Damien / Absolute","Akagami#0089": "Sacha / Akagami","Anguibok#8604": "Megane / Angui","Ankeriias#5161": "Perrine / Ankeriias","AntoineAlp#0898": "Antoine / AntoineAlp","Antology#4260": "Thomas / Antology","Ariom#8738": "Maxou / Ariom","Bender#2285": null,"B3llAime#7226": "Florian / B3llAime","Bernabx#1291": "Morgan / Bernabx","Blunderer#7410": "Théo / Blunderer","CAS scRout#6160": "[BARK] Louis / CAS scRout","Clemzer / Int_Eastwood#9947": "Clément / Hadoklemzer","Crazy Genius#4725": "Esteban / Crazy Genius🎙","Cryler#8338": "Guillaume / Cryler","Daerio#2768": "Ruben / Daerio","Darth#6117": "Luc / Darth","Dem#9822": "Florent Julien - Dem","Deployer#7374": "[BARK] Benjamin / Deployer","Djed-artail#0605": "Eliott / Djed","Antoine#6688": "Antoine / Emi De Pynh","Edouard Mangel#2792": "Edouard / Edouardmphoto","El Hell#9057": "Laélien / El Hell","Eltrath#5237": "Aurélien / Eltrath","Emerodh#7809": "Florian / Emerodh","Fadel Miaou#2319": "Fadel / Fadel Miaou","Falcon#3543": "Corentin / Falcon","Flingouin#7777": null,"Gachimaster#1204": "Mathis / Gachimaster","GannaLuffy#0547": "Steven/GannaLuffy","ElBlackytos#8489": "Alane / ElBlackytos","Gooohaaan#7040": "Romain / Gohan", "Gwendalavir#1212": "Julie | Gwendalavir", "Hairost#5177": "Aymerick / Hairost","Hartimus#8447": "Gatien / Hartimus","Herobrine#6480": "Hugo / Herobrine","Horéüs#9179": "Nicolas / Horéüs","Hugo#5211": "Hugo / Hugo","Isillys#3027": "Quentin / Isillys","Jaal#3951": "Lucas / Jaal","Jarathoustra#1189": "Jules / Jara","Jarekson#5730": "Céleste / Jarekson","Jennysis#6235": "Valentine / Jennysis","Joe Oeil Coton#4182": "Jules / Joe Oeil Coton","Kaizen#9955": "Samuel/Kaizen","Kaydess#0001": "Andrea","Kronenn#0939": "Denis / Kronenn","Kubuuo#5855": "Blaise / Kubuuo","Kunashii#4492": "Léa / Kunashii","Lawyers#2650": "Thomas / Lawyers","LAZZLOS#6110": "Léo.L / LAZZLOS","Lelariva#9754": "Benjamin / Lelariva","Likrom#6046": "Sébastien / Likrom","LocalNerdyBrat#1212": "Alice / LocalNerdyBrat","Lunara#8601": "Roxane / Lunara","Lysphea#6997": "Emilie / Millonde","Mags#6174": "{Z4DL0RD} Mags","Manzaro#4731": "Gaëtan / Manzaro","Marco#7191": null,"MarkZeroDeux#3924": "Mark / MarkZeroDeux","Maxilag#0281": "Guillaume / Maxilag","Maydayyy#3877": "Mehdi / Maydayyy","Mylow#9595": "Milo / Mylow","Nabius#2180": "Raphaël / Nabius","Nakfen#0127": "Jules / Nakfen","Nalfeinn#8363": "Jules / Nalfeinn","naska#0880": "Richard | naska","Natabilis#2492": null,"NetLan#0213": "Valentin / NetLan","Nicky#3725": "Nicky","Nicolas#2519": "Nicolas / Yet Another Day","Nigirith#4418": "Fanny / Nigirith","nirox#1663": "Maël / nirox","Nox#4684": "Akalix / Nox","pastoral#6138": "François / Pastoral","Paulo Le Bulot#8373": null,"Pilou#0030": "Pilou / zE_n0Ob","pisces#6833": "Maëlle /Pisces","PoutreVide JeSuisVide#8990": null,"prothotype#5312": "ProthoLag","Pyra#0027": "Tristan / Pyra","R4gn0r0ck#8941": "Paul / R4gn0r0ck","Red nG.K.#0642": "Etienne / RnGK","Rhulken#2377": "Luke / Rhulken","RireCestMarrant#5400": null,"Romiche#3245": "Romain / Romiche","routip#7989": "Kévin / pittour","Rude#8435": "Victor / Rude","Sacha [Zeckartt]#5285": "Sacha / Zeckartt","Sangarm#6194": "Léo / Sangarm","Serayas#6980": "Mathieu / Serayas","TontonCharlie#7503":"Charles / TontonCharlie","Shira#1704": null,"Shokõ#5957": "Julie/PrincessChoco","Silv#9137": "François/Silv","Skayl#1605": "Jean / Skayl","Slyph#0161": "Flo / Slyph","space armor#7204": "Thierry / space","SPlitMG#4379": "Morgan / SPlit","Twelve#6439":"Gauthier / Douze","Striker#4506": null,"Sushaki#0943": "Maëva / Caille","ThePrawn#4480":"Garance / ThePrawn","Théo/Keya#2517": "Théo / Keya","Toinou#5474": "Antoine / Toinou","Turrican#7924": "Léo / Turrican","tyuiok#1153": "Nicolas/tyuiok","Vaikus#3613": "Clément / Vaikus","Vinz#6038": null,"VMIX#8745": null,"w4rb0#7321": "MEGA DEMON/w4rb0","Zapier#0625": null,"Wat#1005": "Jean / Watbest","Zerotick#0398":"Guillaume / Zerotick","Wilky#8637": "Vincent / Wilky","xatounet#1315": "Thomas/Xatounet","YuinoBloody#1292": "Julie / Yuino Bloody","Zeylio#1471": "Anselme / Zeylio","Zira#9472": "Bender" };


client.on("ready", async () => {
    console.log(`Logged in as ${ client.user?.tag }!`);

    const guild = await client.guilds.fetch(guildId);
    const members = await guild.members.fetch();
    const membersByTag = {} as Record<string, GuildMember>;



    for (const member of members) {
        const gMember = member[1];
        const user = gMember.user;

        membersByTag[user.tag] = gMember;
        //savedNickNames[user.tag] = gMember.nickname;
    }
    //console.log(JSON.stringify(savedNickNames));

    const membersArray = Object.keys(savedNickNames);
    const shuffledArray = shuffleArray(membersArray);

    for (let idMember = 0; idMember < membersArray.length; idMember++) {
        console.log(membersArray[idMember], "=>", shuffledArray[idMember]);

        const from = membersByTag[membersArray[idMember]];
        //const to = membersByTag[shuffledArray[idMember]];

        try {
            await from.setNickname(savedNickNames[membersArray[idMember]]);
        }
        catch (e) {
            console.log("failed...");
        }
    }

    console.log("Done!");
});

client.login(process.env.CLIENT_TOKEN_BENDER).then(() => {
    console.log("Connected");
});
