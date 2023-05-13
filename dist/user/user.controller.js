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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let UserController = class UserController {
    async findAll(res, since) {
        if (process.env.ACCESS_TOKEN) {
            const userResponse = await axios_1.default.get('https://api.github.com/users', {
                headers: {
                    Authorization: `token ${process.env.ACCESS_TOKEN}`,
                },
                params: {
                    since: Number(since),
                    per_page: 10,
                },
            });
            return res.status(common_1.HttpStatus.ACCEPTED).send(userResponse.data);
        }
        return res.status(common_1.HttpStatus.FORBIDDEN).send({
            message: 'Without access_token github',
        });
    }
    async getUser(login, res) {
        if (process.env.ACCESS_TOKEN) {
            const userResponse = await axios_1.default.get(`https://api.github.com/users/${login}`, {
                headers: {
                    Authorization: `token ${process.env.ACCESS_TOKEN}`,
                },
            });
            return res.status(common_1.HttpStatus.ACCEPTED).send(userResponse.data);
        }
        return res.status(common_1.HttpStatus.FORBIDDEN).send({
            message: 'Without access_token github',
        });
    }
    async getRepos(login, res) {
        if (process.env.ACCESS_TOKEN) {
            const userResponse = await axios_1.default.get(`https://api.github.com/users/${login}/repos`, {
                headers: {
                    Authorization: `token ${process.env.ACCESS_TOKEN}`,
                },
            });
            return res.status(common_1.HttpStatus.ACCEPTED).send({
                data: userResponse.data,
            });
        }
        return res.status(common_1.HttpStatus.FORBIDDEN).send({
            message: 'Without access_token github',
        });
    }
};
__decorate([
    (0, common_1.Get)('list/:since'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('since')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':login'),
    __param(0, (0, common_1.Param)('login')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)('repos/:login'),
    __param(0, (0, common_1.Param)('login')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getRepos", null);
UserController = __decorate([
    (0, common_1.Controller)('user')
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map