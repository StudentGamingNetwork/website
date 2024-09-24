export const env = {
    BACKEND_PORT: process.env.BACKEND_PORT ?? "3000",
    CORS_ORIGIN: process.env.CORS_ORIGIN ?? "http://localhost:8080",
    DB_URI: process.env.DB_URI ?? "mongodb://localhost:27017/sgnw",
    ETHEREAL_PASS: process.env.ETHEREAL_PASS ?? "",
    ETHEREAL_USER: process.env.ETHEREAL_USER ?? "",
    MJ_APIKEY_PRIVATE: process.env.MJ_APIKEY_PRIVATE ?? "",
    MJ_APIKEY_PUBLIC: process.env.MJ_APIKEY_PUBLIC ?? "",
    NO_REPLY_EMAIL: "\"SGN Website\" <no-reply@sgnw.fr>",
    NODE_ENV: process.env.NODE_ENV ?? "development",
    OVERLAY_API: process.env.OVERLAY_API ?? "",
    TOORNAMENT_API: process.env.TOORNAMENT_API ?? "",
    TOORNAMENT_ID: process.env.TOORNAMENT_ID ?? "",
    TOORNAMENT_SECRET: process.env.TOORNAMENT_SECRET ?? ""
};
