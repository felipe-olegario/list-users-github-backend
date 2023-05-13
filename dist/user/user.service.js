"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const express_1 = require("express");
const axios_1 = require("axios");
let UserService = class UserService {
    async getUser(id) {
        const userResponse = await axios_1.default.get(`https://api.github.com/users/${id}`, {
            headers: {
                Authorization: `token ${process.env.ACCESS_TOKEN}`,
            },
        });
        return userResponse.data;
    }
    async list() {
        if (process.env.ACCESS_TOKEN) {
            const userResponse = await axios_1.default.get('https://api.github.com/users', {
                headers: {
                    Authorization: `token ${process.env.ACCESS_TOKEN}`,
                },
            });
            return res.status(express_1.HttpStatus.ACCEPTED).send({
                data: userResponse.data,
            });
        }
        return res.status(express_1.HttpStatus.FORBIDDEN).send({
            message: 'Without acces_token github',
        });
    }
};
UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map