import { FastifyInstance } from "fastify";
import UserHandler from "@/modules/user/handler";
import AssociationHandler from "@/modules/association/handler";
import AdminHandler from "@/modules/admin/handler";
import TournamentHandler from "@/modules/tournament/handler";
import TeamHandler from "@/modules/team/handler";
import PartnerHandler from "@/modules/partner/handler";
import OverlayHandler from "@/modules/overlay/handler";
import StageHandler from "@/modules/stage/handler";

export default async function (server: FastifyInstance): Promise<void> {
    await server.register(UserHandler, { prefix: "/user" });
    await server.register(AssociationHandler, { prefix: "/association" });
    await server.register(AdminHandler, { prefix: "/admin" });
    await server.register(TournamentHandler, { prefix: "/tournament" });
    await server.register(TeamHandler, { prefix: "/team" });
    await server.register(PartnerHandler, { prefix: "/partner" });
    await server.register(OverlayHandler, { prefix: "/overlay" });
    await server.register(StageHandler, { prefix: "/stage" });
}
