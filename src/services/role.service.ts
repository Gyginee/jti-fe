import { apiClient } from '.';
import { ResponseModel, RoleDetailModel, RoleModel } from '../models';
import { appStore } from '../stores';

const create = async (roleName: string) => {
  const params = {
    roleName,
  };
  return await apiClient.post<ResponseModel<any, null>, typeof roleName>(
    '/role/create',
    params,
  );
};

const getAllRole = async () => {
  return await apiClient.post<ResponseModel<RoleModel[], null>, any>(
    '/role/all',
  );
};

const getRoleDetail = async (id: number) => {
  return await apiClient.get<ResponseModel<RoleDetailModel, null>>(
    `/role/detail/${id}/${appStore.currentUser?.id}`,
  );
};

const removeRoleToUser = async (userId: number, roleName: string) => {
  const params = {
    userId: userId,
    roleName: roleName,
  };
  return await apiClient.post<ResponseModel<any, any>, typeof params>(
    '/role/removeRoleToUser',
    params,
  );
};

const assignRoleToUser = async (userId: number, roleName: string) => {
  const params = {
    userId: userId,
    roleName: roleName,
  };
  return await apiClient.post<ResponseModel<any, any>, typeof params>(
    '/role/assignRoleToUser',
    params,
  );
};

const revokePermissionToRole = async (
  roleId: number,
  permissionName: string,
) => {
  const params = {
    roleId,
    permissionName,
  };

  return await apiClient.post<ResponseModel<any, any>, typeof params>(
    '/role/revokePermissionToRole',
    params,
  );
};

const givePermissionToRole = async (roleId: number, permissionName: string) => {
  const params = {
    roleId,
    permissionName,
  };

  return await apiClient.post<ResponseModel<any, any>, typeof params>(
    '/role/givePermissionToRole',
    params,
  );
};

const deleteRole = async (roleId: number) => {
  const params = {
    roleId,
  };

  return await apiClient.post<ResponseModel<any, any>, typeof params>(
    '/role/delete',
    params,
  );
};

const roleService = {
  create,
  getAllRole,
  getRoleDetail,
  removeRoleToUser,
  assignRoleToUser,
  givePermissionToRole,
  revokePermissionToRole,
  deleteRole,
};
export default roleService;
