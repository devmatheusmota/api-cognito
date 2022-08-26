"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class HomeController {
    constructor() {
        this.path = '/';
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    initRoutes() {
        this.router.get('/', this.home);
    }
    home(req, res) {
        return res.send('Sucess!');
    }
}
exports.default = HomeController;
//# sourceMappingURL=home.controller.js.map