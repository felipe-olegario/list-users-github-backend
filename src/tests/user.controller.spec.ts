import { Test } from '@nestjs/testing';
import { UserController } from '../user/user.controller';
import { Response } from 'express';
import axios from 'axios';

describe('UserController', () => {
  let userController: UserController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
    }).compile();

    userController = moduleRef.get<UserController>(UserController);
  });

  describe('findAll', () => {
    it('should return user list with access token', async () => {
      const mockAccessToken = 'mock-access-token';
      const mockUserResponse = { data: [{ name: 'John Doe' }] };
      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      process.env.ACCESS_TOKEN = mockAccessToken;
      jest.spyOn(axios, 'get').mockResolvedValueOnce(mockUserResponse as any);

      await userController.findAll(mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(202);
      expect(mockResponse.send).toHaveBeenCalledWith({
        data: mockUserResponse.data,
      });
    });

    it('should return forbidden without access token', async () => {
      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      process.env.ACCESS_TOKEN = '';
      jest.spyOn(axios, 'get');

      await userController.findAll(mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(403);
      expect(mockResponse.send).toHaveBeenCalledWith({
        message: 'Without access_token github',
      });
    });
  });

  describe('getUser', () => {
    it('should return user details with access token', async () => {
      const mockAccessToken = 'mock-access-token';
      const mockUserId = '123';
      const mockUserResponse = { data: { name: 'John Doe' } };
      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      process.env.ACCESS_TOKEN = mockAccessToken;
      jest.spyOn(axios, 'get').mockResolvedValueOnce(mockUserResponse as any);

      await userController.getUser(mockUserId, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(202);
      expect(mockResponse.send).toHaveBeenCalledWith({
        data: mockUserResponse.data,
      });
    });

    it('should return forbidden without access token', async () => {
      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      process.env.ACCESS_TOKEN = '';
      jest.spyOn(axios, 'get');

      await userController.getUser('123', mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(403);
      expect(mockResponse.send).toHaveBeenCalledWith({
        message: 'Without access_token github',
      });
    });
  });

  describe('getRepos', () => {
    it('should return user repositories with access token', async () => {
      const mockAccessToken = 'mock-access-token';
      const mockUserId = '123';
      const mockUserResponse = {
        data: [{ name: 'Repo 1' }, { name: 'Repo 2' }],
      };
      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      process.env.ACCESS_TOKEN = mockAccessToken;
      jest.spyOn(axios, 'get').mockResolvedValueOnce(mockUserResponse as any);

      await userController.getRepos(mockUserId, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(202);
      expect(mockResponse.send).toHaveBeenCalledWith({
        data: mockUserResponse.data,
      });
    });
  });
});
