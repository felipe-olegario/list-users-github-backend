import { Controller, Get, Res, Req, HttpStatus } from '@nestjs/common';
import { Response, Request } from 'express';
import axios from 'axios';

@Controller('authenticate')
export class AuthController {
  private clientID = process.env.CLIENT_ID;
  private clientSecret = process.env.CLIENT_SECRET;

  @Get()
  auth(@Res() res: Response) {
    return res.status(HttpStatus.ACCEPTED).send({
      urlRedirect: `https://github.com/login/oauth/authorize?client_id=${this.clientID}`,
    });
  }

  @Get('/callback')
  async callback(@Req() req: Request, @Res() res: Response) {
    const code = req.query.code;
    const tokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: this.clientID,
        client_secret: this.clientSecret,
        code: code,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );
    const accessToken = tokenResponse.data.access_token;

    process.env.ACCESS_TOKEN = accessToken;

    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });

    const userData = userResponse.data;
    return res
      .status(HttpStatus.ACCEPTED)
      .redirect('http://localhost:3000/users');
  }
}
