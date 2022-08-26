"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const cognito_service_1 = __importDefault(require("../services/cognito.service"));
class AuthController {
    constructor() {
        this.path = '/auth';
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    initRoutes() {
        this.router.post('/signup', this.validateBody('signUp'), this.signUp);
        this.router.post('/signin', this.validateBody('signIn'), this.signIn);
        this.router.post('/verify', this.validateBody('verify'), this.verify);
    }
    signUp(req, res) {
        const result = (0, express_validator_1.validationResult)(req);
        if (!result.isEmpty()) {
            return res.status(422).json({ errors: result.array() });
        }
        const { username, password, email, name, family_name, birthdate } = req.body;
        const userAttr = [];
        userAttr.push({ Name: 'email', Value: email });
        userAttr.push({ Name: 'name', Value: name });
        userAttr.push({ Name: 'family_name', Value: family_name });
        userAttr.push({ Name: 'birthdate', Value: birthdate });
        console.log('Signup body is valid');
        const cognito = new cognito_service_1.default();
        const user = cognito
            .signUpUser(username, password, userAttr)
            .then((sucess) => {
            if (sucess) {
                res.status(200).end();
            }
            else {
                res.status(500).end();
            }
        });
    }
    signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (0, express_validator_1.validationResult)(req);
            if (!result.isEmpty()) {
                return res.status(422).json({ errors: result.array() });
            }
            const { username, password } = req.body;
            const cognito = new cognito_service_1.default();
            const user = yield cognito.signInUser(username, password).then((sucess) => {
                if (sucess) {
                    res.status(200).end();
                }
                else {
                    res.status(500).end();
                }
            });
        });
    }
    verify(req, res) {
        const result = (0, express_validator_1.validationResult)(req);
        if (!result.isEmpty()) {
            return res.status(422).json({ errors: result.array() });
        }
        const { username, code } = req.body;
        const cognito = new cognito_service_1.default();
        cognito.verifyAccount(username, code).then((sucess) => {
            if (sucess) {
                return res.status(200).json({ message: 'Verification completed.' });
            }
            else {
                return res.status(500).json({ message: 'Something went wrong.' });
            }
        });
    }
    validateBody(type) {
        switch (type) {
            case 'signUp':
                return [
                    (0, express_validator_1.body)('username').notEmpty().isLength({ min: 6 }),
                    (0, express_validator_1.body)('email').notEmpty().normalizeEmail().isEmail(),
                    (0, express_validator_1.body)('password').isString().isLength({ min: 8 }),
                    (0, express_validator_1.body)('birthdate').exists().isISO8601(),
                    (0, express_validator_1.body)('name').notEmpty().isString(),
                    (0, express_validator_1.body)('family_name').notEmpty().isString(),
                ];
            case 'signIn':
                return [
                    (0, express_validator_1.body)('username').notEmpty().isLength({ min: 6 }),
                    (0, express_validator_1.body)('password').isString().isLength({ min: 8 }),
                ];
            case 'verify':
                return [
                    (0, express_validator_1.body)('username').notEmpty().isLength({ min: 6 }),
                    (0, express_validator_1.body)('code').isString().isLength({ min: 6, max: 6 }),
                ];
        }
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map