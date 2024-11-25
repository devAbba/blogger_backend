import 'dotenv/config';

process.env.NODE_ENV = process.env.NODE_ENV || "development";

export const isDevelopment = process.env.NODE_ENV === "development";
export const isProduction = process.env.NODE_ENV === "production";

export const envs = {
    JWT_SECRET: process.env.JWT_SECRET,
}