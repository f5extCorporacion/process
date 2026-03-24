import swaggerJsdoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";

// 🔥 necesario en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔥 detectar entorno (local o Vercel)
const PORT = process.env.PORT || 4000;

const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : `http://localhost:${PORT}`;

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Auth Service",
            version: "1.0.0",
            description: "API completa de autenticación e instituciones",
        },

        servers: [
            {
                url: baseUrl,
                description: "Servidor actual",
            },
        ],

        // 🔥 organización por módulos
        tags: [
            {
                name: "Auth",
                description: "Autenticación de usuarios",
            },
            {
                name: "Instituciones",
                description: "Gestión de instituciones",
            },
            {
                name: "Plan",
                description: "Gestión de planes",
            },
        ],
    },

    // 🔥 busca todos los endpoints
    apis: [path.join(__dirname, "../routes/*.js")],
};

export const swaggerSpec = swaggerJsdoc(options);
