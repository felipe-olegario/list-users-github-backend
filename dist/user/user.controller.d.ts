import { Response } from 'express';
export declare class UserController {
    findAll(res: Response, since: string): Promise<Response<any, Record<string, any>>>;
    getUser(login: string, res: Response): Promise<Response<any, Record<string, any>>>;
    getRepos(login: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
