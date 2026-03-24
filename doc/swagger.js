import swaggerJsdoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";

// 🔥 necesario en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Auth Service",
            version: "1.0.0",
            description: "Documentación de mi API",
        },
        servers: [],
    },

    // 🔥 RUTA ABSOLUTA (SOLUCIONA TU ERROR)
    apis: [path.join(__dirname, "../routes/*.js")],
};

export const swaggerSpec = swaggerJsdoc(options);