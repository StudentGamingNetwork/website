import DotEnv from "dotenv";
import { Client, Intents } from "discord.js";

DotEnv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] });

const roleToAdd = "Joueur RL";
const userList = "Iwose#5772,ZACM0708#3562,Rrrr#4567,R0UJE#1152,Jouzibar#0002,OsamaBenLarmin#9158,Skyora#6475,WILZZOU#3500,Kuamyu#4946,farhaaz12#5844,@PasLàPourParler#0089,Parha#3536,latubedu29#5786,Walton#5238,Ekhalios_#5027,LycosRL#1790,Coumik#0882,Theotime#9679,Yol#2117,AlphaMelio#5740,DarkProd#9936,UnKiwi#4133,OhKeM#7795,Gooohaaan#7040,SWAT KILLER,Nicolas Tanguy#8921,Milli3#6509,Drab-Titiz#1599,HGO7873#4084,Nath#7751,! SkyMania#6011,MrMoutarde#4111,LeroyTV#5242,tanguy.tp #0905,Samiche#6677,Tak#1017,SRZ#4654,MANJIRØ.#1916,!\"ttv.wigintiz#6692,Smouf#1507,Mystixx Raph#7863,r0dvin#7673,Hyriz#8412,M4#5375,Mylow#9595,Kitag#9124,Scal#4961,Aratey#2797,Eflammes#5208,Drein#5356,Lawfyy#1167,G1NG3Rz#0210,iTaikoo#4257,AhriX#0542,Mackyu#6567,Alexstone#7753,Damky#9998,Maximus#3603,Côme#5037,Clemix#8167,SebSeb#5966,TITANToby#8678,Vicory69#6064,Connaboos#7625,Aldo Torleone#0667,OH MINOT!#9798,zayfox#4861,Lil#9744,kbniine#5752,El_muerte#7861,Sikhaa#8047,jiji45110#2859,TiokaRa#7871,Volt#7018,Baptiste#8539,iLoker#3588,DyTee#7675,PlyNoX#4166,ZYGM#2281,I00Preuve#8868,Batlleboss#0801,Dakz#0048,Sʜᴀᴜᴛᴏ#8273,Julien VIGNAU-ESPINE#5749,Kitetsu#0484,LEOOOLM#1284,Paul-Henri Gounot#0925,TokeyoS#6030,Sifrediiiiiiiii#2175,ReynerZ7#6193,Sanka#9313,Bastrayy#3079,Venox#7736,kgtrey1#1669,Timo#2357,Baptiste95#2532,Leow#6981,Vicocaïne#2978,ZeLt0rrr#2392,Martino#1202,nasso#4991,TO#5466,Dunt#9814,Sami693#5104,Helielzël #6387,willk24#4936,Tiphon#8013,HarleZe#1457,amaurysanchez#5331,Alexandre#7777,Kayino#7723,Alexandre.C⚡#6726,🔥Oxoto🔥#7802,LavaL#9240,Enok#6783,Avohk#5690,Haaji#6814,phissame #6196,Youssef#1661,Axel_#8309,Boudidat#0627,OverSlek#9991,Askidox#0212,Gagarin1961#2966,Rxgulus#4318,ToRii#4586,Nounours#7211,Angyal#1050,Nexoame#6220,S W A R M Z.#7241,Freezrogue (Mat)#2414,Darcos#2301,Clément#6466,terapyy#9444,#InCodeWeTrust#9191,TheTMJ#4764,Kigo#7871,N1mbus#2919,AsseloTV#1199,Chef Petit Pois#2335,YaPaY#1831,Antoine#9330,DEYMO#9063,Matiyo#6966,Boussole35#0308,thebighteam#9899,Cris#6882,Bastien#7436,lebreton#4979,ITeKFR#0009,Arthur. R#0208,Beexty#1810,Worid#5817,Acropiba#7467,elgondouino#1374,grizzur#3211,Arashi#8220,Taizu#3505,Moukous#6578,Eliott#6251,CyrilleAS#4760,Swiftnessing#5642,corentin#6638,Thoomasss#2647,Kekrendi#5392,Esalix#0681,Noé.Abcy#8344,Tonio Baltazar#6155,P2R#3277,clem#5717,Default#3396,apy#7422,Alex Red#9155,Drl#4997,Ryteigh#1701,sikkup#1952,Aking#4052,shiryudelapluie#3492,devilghost#7029,Soliwoh#4741,leomadz92#6408,SaltyUnicorn#9038,Mat la menace#9508,Peww#2429,natsuthelight#8930,Taymez#9192,Bastou#4529,Cora#7343,NPBPM#6946,La Cuve#7961,lagentcooper#7169,Balix#9685,Art the crack.#7802,Solidus#4541,Sijel#6605,Terence Guichard#4566,VictorMonParrain#3329,penta.#0005,Arkhan#2938,nAIMless#8812,Psyko0_#3773,Èsska#2616,Alex_#5089,REX.#6500,Ztabyx#5952,nathan#8738,Tim.#5550,Benjamin.#0556,LePo#9218,Azix#2432,yacer#2474,Mathias_rd#2464,Mous#4806,AnFyx#3873,Ο Hugo ο έξυπνος#0925,AD#4562,Rochise#0942,Florian / Wyde#5700,tmega91#4903,GOAG SkyeINC#5843,GamingComunity#7642,YuBii#8997,Kanami Etou#4746,alex_clem#6723,mia des forets#1080,Didelo#7927,Dracxeno#2749,Lil God#0728,Yanis#0916,Rymino#0189,maldin#6680,Look#1947,Viirtuae#3248,Mistrael#0267,Gaiben#5615,Gh0sT#8730,happly#8119,Skanarin#0877,iamforix#1833,sampopi#1251,Vadzou #5607,fabiensamj#4364,Curroch#6573,Tech#4895,Zadi#5951,Nat#1094,CorentinKern#5185,Darclo#1967,ElDozo#7667,HashimG#3977,R3ivax_#2925,AnthonyP#8123,Monster_IrRoXx #5720,Xeax#6241,Hart#3060,AvelRL#2287,Edouard#8616,josépougnette#2085,bastien58-17620#8301,BALOX#0356,Bastien#8264,JokerMaster#7647,ZeroG NootNoot#6953,Fromiel#9886,Adrien.krief#6548,Baptiste Morcel#8971,BaKa#1347,Arthur ⚔#6694,Moonfish™#1312,Romain C#8549,nthn#0417,KcodioSs#2300,Lucouscous#4415,20hugo#7482,Fritixx#8718,Feno#5391,Aze#7576,Bajł.#7042,Ptimouss#7368,SeyawZ#4652,Seigneur#2412,KoGaan#1016,Vee#2233,Frazy#3023,DEPMAX #4303,ThedridriX#5088,mash.#6582,zexceed#9631,corria#2101,Blumor#8600,TrqlNice#7028,gazzarii#4381,BT Lilas#2600,FreeZyLigHtNinG#2293,Lenine Black#1034,Wazaby#9526,ClownMangue#8534,Crytismo#6441,Titi77#0151,Zikam#9292,kubah#7436,,Nytro St;>rm#3641,WhyDoubleYou#1650,FreeZix#1057,NimixaM,Luunatic.#4002,La_Tulipe#0060,IceTeaCitronVer#2758,liteshxdoz#8753,JCSaucisse#1602,Lehyan#7499,Sliderinho#6662,see_saw#6111,Marc zanin#1013,🍯 𝙷𝚘𝚗𝚎𝚢 🍯#1360,Reduza#4279,Aberos#1196,paxel#3020,YowStaz#9888,Zeclown_#1933,PAtoPEsto#9615,Shaо#6362,SamSam#8147,Khindred#9322,Tarkov#3132,MenToz#8131,dina#5204,Le boss#0810,NivSin#7337,Silu#9665,Djmartino36#2518,mathieu.lct#5664,Nilexx#1901,Ψ NielsElit#1604,#TRISTAN8440,FlinkiiS#8801,LORD Ey_chiro#8263,Mister joke#2498,Black Chameau#0010,AzRo4d#5076,leop45 #7750,bgmax#2229,Vincent S#8461,Nithingale#7167,Huguinho#0789,warnadoo#8955,Kil ooo#1234,Enzoo#9950,JeaKss#7821,Denis33#9009,FélixLeBG#2667,saumaa#0197,Bakko#2855,しOŨĬら#6349,Kiwiwi_69100#2538,Aza#2683,Antho#4323,HayRoX#0295,Flyhox#1222,Lukys#9650,GonGabo#5096,Tanguy#5938,Woxifer#3602,didi1019#4389,Raewen#4966,Valentino7711#9650,Laenthis#6600,dydi02#9599,poboyGrizz#9890,Vic.L#2091,Hugoledozo#3084,G L M#9210,falk#2596,Sora#3698,Augustin#8348,Kenzo#2536,Hxncus#9660,VALIVALOO#0334,Néphalio#7495,Mattheo#9346,patdefrui#8793,Ice-hawk#3650,Hatsuke#4323,Mad#1689,Skynoxx#1008,GOOONEEE#1016,Pythan76#9270,Denkurai#3572,EnzoKilm#0003,╲⎝⧹╲⎝⧹ Husk ⧸⎠╱⧸⎠╱#4936,Smirn#2204,mutulus#4437,Granlou#9247,Julien#6003,JeanP#7090,Nassim Bouhassoun#4096,JeSuisIncognito#8301,Nassim ⭐#5460,Phoenix2Feu#7976,whou#5330,Minatsuki#6149,retoucui#5664,Yeti#0886,Elio#5043,ReZTeK,chbouli04#0264,Dirux#5045,Hugorsl#9535,Niout#3761,TomA#9629,Alex Ridisk#2564,ESTASIX#8131,il-castellano#8596,Louis\"#9416,quentinfeve#1721,Tschux#7304,ruuffo#4812,KaiserLayl#9403,nonozz#9457,Léo#1680,Aldaron#9230,Nɐʞᴉsʇoɹɯ#0069,Dax#7422,Germain#5488,mmmmcoco#5081,Kryolion#6282,KALIAN#9110,Lampaderise#5492,La Quille#6102,zamen_92#7912,ervem/hugo#3711,BrunoM#8759,braming#0323,KALØM#9989,Cendre#6617,La girouette#8254,nathan#8713,Sloiiac#5114,quentin_cts#6883,Sura#6918,Babasage#9939,Louis R#3455,Blazz#0518,AdriZer#8555,Ynèl#7388,Théo.#1940,Matéo#7075,Aade#6723,ﾶㄚらҜㄚ乙乙#6065,Nathan.A#9341,Lace_Rocket#4771,Kidax#7311,ZeTsuoo_Senpaii#6743,Verzys#1623,Xthe0X#4739,Kylian#1693,Harlock#3956,Guenks#7708,Eklips BZH,Gotenks1552#9798,TYCO#7176,Saykow17#5393,Nurz.#3432,Craptree1#4574,Gradou#5943,Le Marsien#4005,AyKox#6796,Loris#8982,Jreum#2232,Loan#1005,La pédale#7677,#Eros2294,Sohra#8994,AiziKo#8558,Alexandre Girard#5488,Shoumi22#7649,Youri#7789,Blazy#5887,GodSaveTheYol#7433".split(",");

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
