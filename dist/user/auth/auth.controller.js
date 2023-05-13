"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let AuthController = class AuthController {
    constructor() {
        this.clientID = 'c43df355c45d79c0eac6';
        this.clientSecret = '22b7ebe94aef71110349006380c94845e5dfc4fc';
    }
    auth(res) {
        return res.redirect(`https://github.com/login/oauth/authorize?client_id=${this.clientID}`);
    }
    async callback(req, res) {
        const code = req.query.code;
        const tokenResponse = await axios_1.default.post('https://github.com/login/oauth/access_token', {
            client_id: this.clientID,
            client_secret: this.clientSecret,
            code: code,
        }, {
            headers: {
                Accept: 'application/json',
            },
        });
        const accessToken = tokenResponse.data.access_token;
        process.env.ACCESS_TOKEN = accessToken;
        const userResponse = await axios_1.default.get('https://api.github.com/user', {
            headers: {
                Authorization: `token ${accessToken}`,
            },
        });
        const userData = userResponse.data;
        res.send(`Bem-vindo(a), ${userData.login}!`);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "auth", null);
__decorate([
    (0, common_1.Get)('/callback'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "callback", null);
AuthController = __decorate([
    (0, common_1.Controller)('user')
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map