import { UserModel, ResponseModel } from '../models';
import apiClient from './apiClient';

const all = async () => {
  return await apiClient.post<ResponseModel<UserModel[], null>, any>(
    '/auth/all',
  );
};

const login = async (username: string, password: string) => {
  const params = {
    username,
    password,
  };

  return await apiClient.post<ResponseModel<UserModel, null>, typeof params>(
    '/auth/login',
    params,
  );
};

const lockUser = async (lockedUserId: number) => {
  const params = {
    lockedUserId,
  };

  return await apiClient.post<ResponseModel<UserModel, null>, typeof params>(
    '/auth/lockUser',
    params,
  );
};

const unlockUser = async (lockedUserId: number) => {
  const params = {
    lockedUserId,
  };

  return await apiClient.post<ResponseModel<UserModel, null>, typeof params>(
    '/auth/unlockUser',
    params,
  );
};

const create = async (
  firstName: string,
  lastName: string,
  username: string,
  password: string,
) => {
  const params = {
    firstName,
    lastName,
    username,
    password,
  };

  return await apiClient.post<ResponseModel<UserModel, null>, typeof params>(
    '/auth/createUser',
    params,
  );
};

const authService = {
  all,
  login,
  create,
  lockUser,
  unlockUser,
};

export default authService;
