"use client";
import ProductCard from "@/common/ProductCard";
import React from "react";

import { TblProduct } from "@/model/TblBook";
import style from "./style.module.scss";
type PropType = {
  data: TblProduct[];
};

const ProductCollum: React.FC<PropType> = (props) => {
  const { data } = props;
  
  

  return (
    
      
        <div className={style.Container}>
            
              {data?.map((item, index) => (
                <div className={style.item} key={index}>
                  <ProductCard data={item} />
                </div>
              ))}

        </div>
      

  

   
  );
};

export default ProductCollum;
