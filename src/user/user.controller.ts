import { Controller, Get, Res, Param, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import axios from 'axios';

@Controller('user')
export class UserController {
  @Get('list/:since')
  async findAll(@Res() res: Response, @Param('since') since: string) {
    if (process.env.ACCESS_TOKEN) {
      const userResponse = await axios.get('https://api.github.com/users', {
        headers: {
          Authorization: `token ${process.env.ACCESS_TOKEN}`,
        },
        params: {
          since: Number(since),
          per_page: 10,
        },
      });
      return res.status(HttpStatus.ACCEPTED).send(userResponse.data);
    }
    return res.status(HttpStatus.FORBIDDEN).send({
      message: 'Without access_token github',
    });
  }

  @Get(':login')
  async getUser(@Param('login') login: string, @Res() res: Response) {
    if (process.env.ACCESS_TOKEN) {
      const userResponse = await axios.get(
        `https://api.github.com/users/${login}`,
        {
          headers: {
            Authorization: `token ${process.env.ACCESS_TOKEN}`,
          },
        },
      );
      return res.status(HttpStatus.ACCEPTED).send(userResponse.data);
    }
    return res.status(HttpStatus.FORBIDDEN).send({
      message: 'Without access_token github',
    });
  }

  @Get('repos/:login')
  async getRepos(@Param('login') login: string, @Res() res: Response) {
    if (process.env.ACCESS_TOKEN) {
      const userResponse = await axios.get(
        `https://api.github.com/users/${login}/repos`,
        {
          headers: {
            Authorization: `token ${process.env.ACCESS_TOKEN}`,
          },
        },
      );
      return res.status(HttpStatus.ACCEPTED).send({
        data: userResponse.data,
      });
    }
    return res.status(HttpStatus.FORBIDDEN).send({
      message: 'Without access_token github',
    });
  }
}
