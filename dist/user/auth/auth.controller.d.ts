import { Response, Request } from 'express';
export declare class AuthController {
    private clientID;
    private clientSecret;
    auth(res: Response): void;
    callback(req: Request, res: Response): Promise<void>;
}
