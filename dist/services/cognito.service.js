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
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const crypto_1 = __importDefault(require("crypto"));
class CognitoService {
    constructor() {
        this.config = {
            region: 'us-east-1',
        };
        this.secretHash = '7c9eg5h8a7442ch53ga8dal44jp2obdrpjo7drukdeksi7pe2f';
        this.clientId = '6g1aq74o711b6n273ntgeb2ucm';
        this.cognitoIdentity = new aws_sdk_1.default.CognitoIdentityServiceProvider(this.config);
    }
    signUpUser(username, password, userAttr) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                ClientId: this.clientId,
                Password: password,
                Username: username,
                SecretHash: this.generateHash(username),
                UserAttributes: userAttr,
            };
            try {
                const data = yield this.cognitoIdentity.signUp(params).promise();
                console.log(data);
                return true;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    verifyAccount(username, code) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                ClientId: this.clientId,
                ConfirmationCode: code,
                SecretHash: this.generateHash(username),
                Username: username,
            };
            try {
                const data = yield this.cognitoIdentity.confirmSignUp(params).promise();
                console.log(data);
                return true;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    signInUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                AuthFlow: 'USER_PASSWORD_AUTH',
                ClientId: this.clientId,
                AuthParameters: {
                    USERNAME: username,
                    PASSWORD: password,
                    SECRET_HASH: this.generateHash(username),
                },
            };
            try {
                const data = yield this.cognitoIdentity.initiateAuth(params).promise();
                return true;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    generateHash(username) {
        return crypto_1.default
            .createHmac('SHA256', this.secretHash)
            .update(username + this.clientId)
            .digest('base64');
    }
}
exports.default = CognitoService;
//# sourceMappingURL=cognito.service.js.map