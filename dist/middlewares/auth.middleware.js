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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwk_to_pem_1 = __importDefault(require("jwk-to-pem"));
const axios_1 = __importDefault(require("axios"));
let pems = {};
class AuthMiddleware {
    constructor() {
        this.poolRegion = 'us-east-1';
        this.userPoolId = 'us-east-1_cPTf2RuK5';
        this.setUp();
    }
    verifyToken(req, res, next) {
        var _a;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ').slice(1);
        if (!token)
            res.status(401).end();
        let decodeJwt = jsonwebtoken_1.default.decode(String(token), { complete: true });
        if (!decodeJwt) {
            res.status(401).end();
        }
        let kid = decodeJwt.header.kid;
        let pem = pems[kid];
        if (!pem) {
            res.status(401).end();
        }
        jsonwebtoken_1.default.verify(String(token), pem, (err, payload) => {
            if (err) {
                res.status(401).end();
            }
            next();
        });
    }
    setUp() {
        return __awaiter(this, void 0, void 0, function* () {
            const URL = `https://cognito-idp.${this.poolRegion}.amazonaws.com/${this.userPoolId}/.well-known/jwks.json`;
            try {
                const response = yield axios_1.default.get(URL);
                if (response.status !== 200) {
                    throw `Request not successful`;
                }
                const data = response.data;
                const { keys } = data;
                for (let index = 0; index < keys.length; index++) {
                    const key = keys[index];
                    const key_id = key.kid;
                    const modulus = key.n;
                    const exponent = key.e;
                    const key_type = key.kty;
                    const jwk = { kty: key_type, n: modulus, e: exponent };
                    const pem = (0, jwk_to_pem_1.default)(jwk);
                    pems[key_id] = pem;
                }
                console.log('got all pems');
            }
            catch (error) {
                console.log('Could not fetch jwks');
            }
        });
    }
}
exports.default = AuthMiddleware;
//# sourceMappingURL=auth.middleware.js.map