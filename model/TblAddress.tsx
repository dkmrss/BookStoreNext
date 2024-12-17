export interface tblProvince {
  provinceId: number;
  provinceCode: string | null;
  provinceName: string | null;
  creationDate?: string;
  createdBy?: string;
  lastUpdateDate?: string;
  lastUpdatedBy?: string;
}

export interface tblDistrict {
  districtId: number;
  provinceCode: string | null;
  provinceName: string | null;
  provinceId: number | null;
  districtCode: string | null;
  districtName: string | null;
  creationDate?: string;
  createdBy?: string;
  lastUpdateDate?: string;
  lastUpdatedBy?: string;
}

export interface tblCommune {
  communeId: number;
  provinceCode: string | null;
  provinceName: string | null;
  districtId: number | null;
  districtCode: string | null;
  districtName: string | null;
  communeCode: string | null;
  communeName: string | null;
  creationDate?: string;
  createdBy?: string;
  lastUpdateDate?: string;
  lastUpdatedBy?: string;
}
