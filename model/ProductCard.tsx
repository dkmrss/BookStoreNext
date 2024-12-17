import { StaticImageData } from "next/image";
import { TblListWeb, TblItem, TblProductDeal } from "./ProductList";

export interface CardProductPropsTypeSearch {
  data: TblListWeb;
  exchange?: string;
  isFlashSale?: boolean;
}

export interface CardProductPropsNormalType {
  data: TblItem;
  type?: string;
  isFlashSale?: boolean;
}

export interface CardProductFlashSalePropsType {
  data: TblProductDeal;
  type?: string;
  isFlashSale?: boolean;
  isFlashSaleTime?: boolean;
}

export interface ProductCardPropsType {
  property: {
    new: boolean;
    date: string;
    discount: string;
    warranty: boolean;
    delivery: boolean;
    installment: boolean;
  };
  cardColors?: string;
  colors: string[];
  priceOld: string;
  priceNew: string;
  nameProduct: string;
  image: StaticImageData;
  star: number;
  numberStar: number;
}
