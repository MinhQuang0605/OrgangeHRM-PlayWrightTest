import dotenv from "dotenv";
dotenv.config()

export const env={
    BASE_URL: process.env.BASE_URL!,
    ADMIN_USER: process.env.ADMIN_USER!,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD!,
}
