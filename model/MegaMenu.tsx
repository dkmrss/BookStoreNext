import { tblBanner } from "./Banner";

export interface MegaMenuModels {
  id: number;
  categoryName: string;
  categoryCode: string;
  parentId: number | null;
  icon: string | null;
  menuLevel: number | null;
  images: MegaMenuImageModels[];
  megaMenuCategoryChild: MegaMenuModels[] | [];
  urlRedirect: string | null;
  priorityStatus: string | null;
}

export interface MegaMenuImageModels {
  id: number;
  image: string | null;
  type: string | null;
  title: string | null;
  description: string | null;
  link: string | null;
}

export interface BannerModels {
  slide: tblBanner[];
  slideSide: tblBanner[];
  slideBottom: tblBanner[];
}
export interface dataMenu {
  dataMenu: MegaMenuModels[];
  headerMenu: boolean;
  dataBanner: BannerModels;
}

export interface CategoryTree {
  id: number;
  categoryName: string;
  categoryCode: string;
  parentId: number | null;
  categoryLevel: number | null;
  parentName: string | null;
  description: string | null;
  categoryChildModels: CategoryTree[] | [];
}
