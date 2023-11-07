export default interface StoreModel {
  id: number;
  storeCode: string;
  storeName: string;
  provinceId: number;
  districtId: number;
  address: string;
  created_at?: Date;
  updated_at?: Date;
  lat: string;
  long: string;
  status: string | null;
  contactName: string;
  phoneNumber: string;
  userId: number;
  calendar: Date;
  reward: boolean;
  isDone: boolean;
  winerId?: number;
  provinceName: string;
  districName: string;
  statusName: string;
  userFirstName: string;
  userLastName: string;
}

export interface CreateStoreModel {
  id?: number;
  storeCode: string;
  storeName: string;
  provinceId: number;
  districtId: number;
  address: string;
  status: string;
  contactName: string;
  phoneNumber: string;
  userId: number;
  calendar: Date | null;
  reward: boolean;
  note?: string;
  winnerName: string;
  winnerBankName: string;
  winnerBankNumber: string;
  lat: string;
  long: string;
}

export interface StoreDetailModel {
  id: number;
  storeCode: string;
  storeName: string;
  provinceId: string;
  districtId: string;
  address: string;
  created_at: Date;
  updated_at: Date;
  lat: string;
  long: string;
  status: string | null;
  contactName: string;
  phoneNumber: string;
  userId: string;
  calendar: Date | null;
  reward: boolean;
  isDone: string;
  winnerName?: string;
  winnerBankName?: string;
  winnerBankNumber?: string;
  winnerRelationship?: string;
  provinceName: string;
  districName: string;
  statusName: string;
  userFirstName: string;
  userLastName: string;
  note: string | null;
}

export interface StoreImageModel {
  posmId: string;
  id: number;
  storeId: string;
  imagePath: string;
  typeCode: string;
  lat?: string;
  long?: string;
  created_at: Date | null;
  updated_at: Date | null;
}

export interface StoreSearchParams {
  storeCode?: string;
  storeName?: string;
  provinceId?: number;
  districtId?: number;
  address?: string;
  statusCode?: string;
  contactName?: string;
  phoneNumber?: string;
  userId?: number;
  fromDate?: Date | null;
  toDate?: Date | null;
  reward?: boolean;
  isDone?: boolean;
}
