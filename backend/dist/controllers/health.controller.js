"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkHealth = checkHealth;
const response_js_1 = require("../utils/response.js");
function checkHealth(_req, res) {
    const healthData = {
        status: 'healthy',
        service: 'abhay-technicals-api',
        uptimeSeconds: Math.floor(process.uptime()),
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
    };
    (0, response_js_1.sendSuccess)(res, healthData, 'Service is operational', 200);
}
//# sourceMappingURL=health.controller.js.map