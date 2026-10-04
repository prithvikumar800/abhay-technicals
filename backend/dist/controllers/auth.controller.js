"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const response_js_1 = require("../utils/response.js");
class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    requestOtp = async (req, res, next) => {
        try {
            const { phone } = req.body;
            const result = await this.authService.requestOtp(phone);
            (0, response_js_1.sendSuccess)(res, result, 'OTP dispatched successfully');
        }
        catch (err) {
            next(err);
        }
    };
    verifyOtp = async (req, res, next) => {
        try {
            const { phone, otp, name, businessName } = req.body;
            const result = await this.authService.verifyOtp(phone, otp, name, businessName);
            (0, response_js_1.sendSuccess)(res, result, 'Authentication successful', 200);
        }
        catch (err) {
            next(err);
        }
    };
    refreshToken = async (req, res, next) => {
        try {
            const { refreshToken } = req.body;
            const result = await this.authService.refreshAccessToken(refreshToken);
            (0, response_js_1.sendSuccess)(res, result, 'Token refreshed successfully');
        }
        catch (err) {
            next(err);
        }
    };
    logout = async (req, res, next) => {
        try {
            const { refreshToken } = req.body;
            if (refreshToken) {
                await this.authService.logout(refreshToken);
            }
            (0, response_js_1.sendSuccess)(res, { loggedOut: true }, 'Successfully logged out');
        }
        catch (err) {
            next(err);
        }
    };
    getProfile = async (req, res, next) => {
        try {
            (0, response_js_1.sendSuccess)(res, { user: req.user }, 'Current user profile');
        }
        catch (err) {
            next(err);
        }
    };
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map