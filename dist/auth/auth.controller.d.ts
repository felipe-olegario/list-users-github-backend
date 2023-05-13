import { Response, Request } from 'express';
export declare class AuthController {
    private clientID;
    private clientSecret;
    auth(res: Response): Response<any, Record<string, any>>;
    callback(req: Request, res: Response): Promise<void>;
}
