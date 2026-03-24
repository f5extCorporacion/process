import express from "express";
import {
    registerInstitucion,
    loginInstitucion,
    Reenvio,
} from "../controller/institucion.controller.js";
import { validateGlobal } from "../validators/ValidatorGolobal.js";
import { crearPlan } from "../controller/plan.controller.js";
import { TypeMidleware } from "../validators/propiedades.js";
import { resetPassword, verifyCodeCuenta } from "../NotificacionEmail/Notification.Reset.js";

const router = express.Router();

// ====================================
// RUTAS DE INSTITUCIONES
// =============================================
router.get("/loginhotget", (req, res) => {
    res.json({
        message: "Log get",
        version: "1.0.0",

    });
});
/**
 * @swagger
 * /auth/instituciones/register:
 *   post:
 *     summary: Registrar institución
 *     tags: [Instituciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombreInstitucion
 *               - tipo
 *               - telefonocorp
 *               - direccion
 *               - nombreAdministrador
 *               - email
 *               - password
 *               - celularadmin
 *               - pais
 *             properties:
 *               nombreInstitucion:
 *                 type: string
 *              
 *               tipo:
 *                 type: string
 *                 
 *               telefonocorp:
 *                 type: string
 *                
 * 
 *               direccion:
 *                 type: string
 *                 
 * 
 *               nombreAdministrador:
 *                 type: string
 * 
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               celularadmin:
 *                 type: string
 *               pais:
 *                 type: string
 *     responses:
 *       200:
 *         description: Institución creada correctamente
 *       400:
 *         description: Error de validación
 */
//Registro
router.post("/instituciones/register", validateGlobal(TypeMidleware[1].nombre), registerInstitucion);  // ✅ Ahora es /instituciones/register
/**
 * @swagger
 * /auth/institucion/send-otp:
 *   post:
 *     summary: Verificar cuenta con código OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               code:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cuenta verificada
 */
router.post("/institucion/send-otp", verifyCodeCuenta)//verifica cuenta y activa
/**
 * @swagger
 * /auth/institucion/Resent:
 *   post:
 *     summary: Reenviar código de verificación
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Código reenviado
 */
router.post("/institucion/Resent", Reenvio) //Reenvia code (n veces)
/**
 * @swagger
 * /auth/instituciones/login:
 *   post:
 *     summary: Login de institución
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso
 *       401:
 *         description: Credenciales incorrectas
 */
//Login Normal
router.post("/instituciones/login", loginInstitucion);
/**
 * @swagger
 * /auth/instituciones/ResetFinal:
 *   post:
 *     summary: Resetear contraseña
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               code:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password actualizado
 */
// Cambio final Password
router.post("/instituciones/ResetFinal", resetPassword)
/**
 * @swagger
 * /auth/crearplan:
 *   post:
 *     summary: Crear plan
 *     tags: [Plan]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               codigo:
 *                 type: string
 *               price:
 *                 type: number
 *               currency:
 *                 type: string
 *               interval:
 *                 type: string
 *     responses:
 *       200:
 *         description: Plan creado
 */
//crear plan
router.post("/crearplan", validateGlobal(TypeMidleware[0].nombre), crearPlan);




export default router; 
