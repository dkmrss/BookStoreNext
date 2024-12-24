export const API_ROUTE = {
  HOME: "/home-hacom",

  //ProductBook
  GET_LIST_PRODUCT: "/products/get-list-with-limit-offset",
  GET_LIST_PRODUCT_SALE: "/products/get-sale-products",
  GET_LIST_PRODUCT_LIMIT: "/products/get-list-with-limit-offset",
  GET_LIST_PRODUCT_NEW: "/products/get-new-products",
  GET_LIST_PRODUCT_CATEGORY: "/products/get-products-by-category",
  GET_DETAIL_PRODUCT: "/products/product-detail",
  GET_DETAIL_PRODUCT_INFO: "/bookInfo/get-list-by-field",
  GET_LIST_SEARCH:"/products/search",
  GET_LIST_SEARCHKEY:"/products/top-keywords-products",
  GET_LIST_RECOMMEND:"/products/get-recommend-products",
  //News
  GET_LIST_NEWS: "/news/get-list-by-field",
  GET_NEW_DETAIL: "/news/new-detail",

  //Banner
  GET_LIST_NEWS_BANNER: "/banner/active",

  //Category
  GET_LIST_CATEGORY: "/category/status",
  GET_CATEGORY_INFO: "/category/category-detail",

  //Comment
  GET_LIST_COMMENT: "/user-comment/list-by-user-book",
  CREATE_COMMENT:"/user-comment/create",

  //User
  GET_INFO_USER: "/users/user-detail",
  CREATE_USER: "/users/create",
  UPDATE_USER:"/users/update",
  //Banner
  GET_LIST_BANNER: "TblBanner/get-list",

  //Auth
  LOGIN: "/auth/login",
  CHANGE_PASSWORD:"/auth/change-password",
  //Cart
  ADD_CART: "/cart/addCart",
  VIEW_CART: "/cart/view",

  //order
  CREATE_ORDER: "/orders/create",
  GET_LIST_ORDER: "/orders/get-lists",
  GET_ORDER_DETAILS:"/orders/order-detail",

  //KeySearch
  GET_KEY_SEARCH:"/search/keywords",
  
 


  //Search
  GET_SEARCH_PRODUCT: "/Home/search",
  GET_PRODUCT_DETAIL: "/TblItem/edit",

  //CustomerAppointment
  CREATE_CUSTOMER_APPOINTMENT: "/TblCustomerAppointment/create",
  GET_DATA_REPAIR_BOOKING_LIST: "TblCustomerAppointment/get-list",
  CANCEL_REPAIR_BOOKING: "TblCustomerAppointment/delete",

  //Appointment
  CREATE_APPOINTMENT: "/TblAppointments/create",
  GET_DATA_GUARANTEE_LIST: "TblAppointments/get-list",
  CANCEL_GUARANTEE_BOOKING: "TblAppointments/delete",

  //Store
  CONFIG_WEB: "TblConfigWeb/details",

  // Cart
  CREATE_CART_PRODUCT: "/TblShoppingCartHeader/create",
  EDIT_CART_PRODUCT: "/TblShoppingCartHeader/edit",
  DELETE_CART_PRODUCT: "/TblShoppingCartHeader/delete",
  GET_LIST_CART_PRODUCT: "/TblShoppingCartHeader/get",
  GET_TOTAL_CART_PRODUCT: "/TblShoppingCartHeader/get-information",

  //Address
  GET_LIST_COMMUNE: "/TblCommune/get-list",
  GET_DETAIL_COMMUNE: "/TblCommune/details",
  GET_LIST_DISTRICT: "/TblDistrict/get-list",
  GET_DETAIL_DISTRICT: "/TblDistrict/details",
  GET_LIST_PROVINCE: "/TblProvince/get-list",
  GET_DETAIL_PROVINCE: "/TblProvince/details",

  //SaleOrder
  CREATE_SALE_ORDER: "/tblSaleOrder/create",
  GET_LIST_SALE_ORDER: "/tblSaleOrder/get-list",
  GET_STATUS_SALE_ORDER: "/tblSaleOrder/look-up",
  MODIFY_SALE_ORDER: "/tblSaleOrder/edit",
  CUSTOMER_CANCEL_SALE_ORDER: "/tblSaleOrder/customer-cancel",

  //Customer
  CREATE_USER_CUSTOMER: "TblCustomer/create",
  CREATE_USER_CUSTOMER_WITH_OUT_TOKEN: "TblCustomer/customer-create",
  CUSTOMER_INFO: "TblCustomer/info",
  CUSTOMER_INFO_BY_USER_NAME: "TblCustomer/details-by-user-name",
  MODIFY_CUSTOMER: "/TblCustomer/edit",

  //CustomerSite
  CREATE_USER_CUSTOMER_SITE: "TblCustomerSite/create",
  MODIFY_CUSTOMER_SITE: "TblCustomerSite/edit",
  DELETE_CUSTOMER_SITE: "TblCustomerSite/delete",

  //CollectionFrom
  CREATE_COLLECTION_FORM: "TblCollectionForm/create",

  //QR code
  CREATE_QR_CODE: "TblMBQRcode/create",
  EDIT_QR_CODE: "TblMBQRcode/edit",
  DELETE_QR_CODE: "TblMBQRcode/delete",
  GET_ALL_QR_CODE: "TblMBQRcode/get-all",

  //MBQR Code Payment
  GET_DETAILS_QR_CODE_PAYMENT: "TblMBQRCodePayment/details",

  //Home
  GET_HOME_SUGGEST: "Home/suggest",

  //Rank
  GET_RANK: "/Rank/get-ranks",

  //MembershipCard
  GET_MEMBERSHIPCARD: "/MembershipCard/get-membership-cards-by-customer-id",
  GET_REMAINING_MONEY:
    "/MembershipCard/get-remaining-money-to-next-rank-by-card-id",
  CREATE_MEMBERSHIPCARD:
    "/MembershipCard/create-membership-card-by-customer-id",
  UPDATE_MEMBERSHIPCARD: "/MembershipCard/update-membership-card",
};
