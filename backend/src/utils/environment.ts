export const env = {
    BACKEND_PORT: process.env.BACKEND_PORT ?? "3000",
    CORS_ORIGIN: process.env.CORS_ORIGIN ?? "http://localhost:8080",
    DB_URI: process.env.DB_URI ?? "mongodb://localhost:27017/sgnw",
    ETHEREAL_PASS: process.env.ETHEREAL_PASS ?? "",
    ETHEREAL_USER: process.env.ETHEREAL_USER ?? "",
    GOOGLE_OAUTH_CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID ?? "",
    GOOGLE_OAUTH_CLIENT_SECRET: process.env.GOOGLE_OAUTH_CLIENT_SECRET ?? "",
    GOOGLE_OAUTH_REDIRECT_URL: process.env.GOOGLE_OAUTH_REDIRECT_URL ?? "http://localhost:8080",
    MJ_APIKEY_PRIVATE: process.env.MJ_APIKEY_PRIVATE ?? "",
    MJ_APIKEY_PUBLIC: process.env.MJ_APIKEY_PUBLIC ?? "",
    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL ?? "no-reply@localhost.fr",
    NO_REPLY_NAME: process.env.NO_REPLY_NAME ?? "No Reply",
    NODE_ENV: process.env.NODE_ENV ?? "development",
    OVERLAY_API: process.env.OVERLAY_API ?? "",
    TOORNAMENT_API: process.env.TOORNAMENT_API ?? "",
    TOORNAMENT_ID: process.env.TOORNAMENT_ID ?? "",
    TOORNAMENT_SECRET: process.env.TOORNAMENT_SECRET ?? ""
};
