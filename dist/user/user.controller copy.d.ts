import { UserService } from './user.service';
import { Response, Request } from 'express';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    private clientID;
    private clientSecret;
    auth(res: Response): void;
    callback(req: Request, res: Response): Promise<void>;
    findAll(): Promise<any>;
    getUser(login: string): Promise<any>;
}
export declare class UserController {
}
