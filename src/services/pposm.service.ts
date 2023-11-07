import { apiClient } from '.';
import { PposmByStore, PposmModel, ResponseModel } from '../models';

const all = async () => {
  return await apiClient.get<ResponseModel<PposmModel[], null>>('/pposm/all');
};

const getByStore = async (storeId: number) => {
  return await apiClient.get<ResponseModel<PposmByStore[], null>>(
    '/pposm/getByStore/' + storeId,
  );
};

const assignToStore = async (storeId: number, pposmId: string) => {
  const params = {
    pposmId,
    storeId,
  };
  return await apiClient.post<ResponseModel<PposmModel, any>, typeof params>(
    '/pposm/assignToStore',
    params,
  );
};

const pposmService = {
  all,
  getByStore,
  assignToStore,
};

export default pposmService;
