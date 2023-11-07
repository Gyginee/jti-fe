import { Dayjs } from 'dayjs';
import moment from 'moment';
import { apiClient } from '.';
import {
  CreateStoreModel,
  IdNameModel,
  ResponseModel,
  StoreModel,
} from '../models';
import {
  StoreDetailModel,
  StoreImageModel,
  StoreSearchParams,
} from '../models/StoreModel';
import { WinnerModel } from '../models/WinnerModel';
import axios from 'axios';
import Constants from '../utils/constants';

const all = async () => {
  return await apiClient.get<ResponseModel<StoreModel[], null>>('/store/all');
};

const detail = async (storeId: number) => {
  return await apiClient.get<ResponseModel<StoreDetailModel, null>>(
    '/store/detail/' + storeId,
  );
};

const create = async (params: CreateStoreModel) => {
  return await apiClient.post<ResponseModel<StoreModel, null>, StoreModel>(
    '/store/create',
    {
      ...params,
      calendar: moment(params.calendar).format('YYYY-MM-DD'),
    },
  );
};

const getAllStatus = async () => {
  return await apiClient.get<ResponseModel<IdNameModel[], null>>(
    '/storeStatusType/all',
  );
};

const update = async (params: CreateStoreModel, storeId: number) => {
  return await apiClient.post<
    ResponseModel<CreateStoreModel, null>,
    StoreModel
  >('/store/update', {
    ...params,
    storeId,
    calendar: moment(params.calendar).format('YYYY-MM-DD'),
  });
};

const getAllImagesByStoreId = async (storeId: number) => {
  return await apiClient.get<ResponseModel<StoreImageModel[], null>>(
    '/storeImage/getByStore/' + storeId,
  );
};

const updateWinner = async (winnerData: WinnerModel) => {
  return await apiClient.post<ResponseModel<StoreModel, null>, WinnerModel>(
    '/store/updateWinnerToStore',
    winnerData,
  );
};

const filterReport = async (params: StoreSearchParams) => {
  const searchParams = {
    ...params,
    statusCode: params.statusCode || null,
    provinceId: params.provinceId == -1 ? null : params.provinceId,
    districtId: params.districtId == -1 ? null : params.districtId,
    userId: params.userId == -1 ? null : params.userId,
    fromDate: params.fromDate
      ? moment(params.fromDate).format('YYYY-MM-DD')
      : null,
    toDate: params.toDate ? moment(params.toDate).format('YYYY-MM-DD') : null,
    reward: null,
    isDone: null,
  };

  return await apiClient.post<
    ResponseModel<StoreModel[], null>,
    StoreSearchParams
  >('/store/filterReport', searchParams);
};

const searchStore = async (params: StoreSearchParams) => {
  const searchParams = {
    ...params,
    statusCode: params.statusCode || null,
    provinceId: params.provinceId == -1 ? null : params.provinceId,
    districtId: params.districtId == -1 ? null : params.districtId,
    userId: params.userId == -1 ? null : params.userId,
    fromDate: params.fromDate
      ? moment(params.fromDate).format('YYYY-MM-DD')
      : null,
    toDate: params.toDate ? moment(params.toDate).format('YYYY-MM-DD') : null,
    reward: null,
    isDone: null,
  };

  return await apiClient.post<
    ResponseModel<StoreModel[], null>,
    StoreSearchParams
  >('/store/searchStore', searchParams);
};

const createCalendar = async (
  storeCode: string[],
  calendar: Dayjs,
  userId: number,
) => {
  const params = {
    storeCodes: storeCode,
    userId: userId,
    calendar: calendar.format('YYYY-MM-DD'),
  };

  return await apiClient.post<ResponseModel<StoreModel, null>, typeof params>(
    '/store/createCalendar',
    params,
  );
};

const importExcel = async (params: any) => {
  return await axios.post(Constants.API_URL + '/store/importExcel', params);
};

const storeService = {
  all,
  detail,
  create,
  update,
  updateWinner,
  getAllStatus,
  getAllImagesByStoreId,
  filterReport,
  searchStore,
  createCalendar,
  importExcel,
};

export default storeService;
