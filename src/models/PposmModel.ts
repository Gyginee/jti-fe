export interface PposmModel {
  id: string;
  name: string;
  imagePath: string;
  created_at: Date;
  updated_at: Date;
}

export interface PposmByStore {
  description: string | null;
  pposmId: string;
  storeId: number;
  pposmName: string;
  imagePath: string;
  storeName: string;
  active: string;
  question1: string;
  question2: string;
  question3: string;
  question4: string;
  question5: string;
}
