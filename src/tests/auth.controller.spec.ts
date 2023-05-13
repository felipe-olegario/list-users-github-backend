import { Test } from '@nestjs/testing';
import { AuthController } from '../auth/auth.controller';
import { Response, Request } from 'express';
import axios from 'axios';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
  });

  describe('auth', () => {
    it('should redirect to GitHub login page', () => {
      const mockResponse: Partial<Response> = {
        redirect: jest.fn(),
      };

      authController.auth(mockResponse as Response);

      expect(mockResponse.redirect).toHaveBeenCalledWith(
        'https://github.com/login/oauth/authorize?client_id=c43df355c45d79c0eac6',
      );
    });
  });
});
