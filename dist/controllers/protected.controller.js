"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
class ProtectedController {
    constructor() {
        this.path = '/protected';
        this.router = (0, express_1.Router)();
        this.AuthMiddleware = new auth_middleware_1.default();
        this.initRoutes();
    }
    initRoutes() {
        this.router.use(this.AuthMiddleware.verifyToken);
        this.router.get('/secret', this.home);
    }
    home(req, res) {
        return res.send('The secret is cupcakes');
    }
}
exports.default = ProtectedController;
//# sourceMappingURL=protected.controller.js.map