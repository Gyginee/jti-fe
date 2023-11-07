import { apiClient } from '.';
import { PermissionModel, ResponseModel } from '../models';

const create = async (permissionName: string) => {
  const params = {
    permissionName,
  };
  return await apiClient.post<ResponseModel<any, null>, typeof params>(
    '/permission/create',
    params,
  );
};

const getAll = async () => {
  return await apiClient.post<ResponseModel<PermissionModel[], null>, any>(
    '/permission/all',
  );
};

const deletePermission = async (permissionId: number) => {
  const params = {
    permissionId,
  };
  return await apiClient.post<
    ResponseModel<PermissionModel[], null>,
    typeof params
  >(`/permission/delete`, params);
};

const permissionService = {
  create,
  getAll,
  deletePermission,
};
export default permissionService;
