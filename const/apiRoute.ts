export const API_ROUTE = {
  HOME: "/home-hacom",

  //ProductBook
  GET_LIST_PRODUCT: "/products/get-list-with-limit-offset",
  GET_LIST_PRODUCT_SALE: "/products/get-sale-products",
  GET_LIST_PRODUCT_LIMIT: "/products/get-list-with-limit-offset",
  GET_LIST_PRODUCT_NEW: "/products/get-new-products",
  GET_LIST_PRODUCT_CATEGORY: "/products/get-products-by-category",
  GET_DETAIL_PRODUCT: "/products/product-detail",
  CREATE_BOOK_PRODUCT: "/products/create",
  UPDATE_BOOK_PRODUCT: "/products/update",
  DELETE_BOOK: "/products/delete",
  GET_LIST_SEARCH:"/products/search",
  GET_LIST_SEARCHKEY:"/products/top-keywords-products",
  GET_LIST_RECOMMEND:"/products/get-recommend-products",
  UPDATE_STATUS:"/products/toggle-status",
  UPDATE_TRASH:"/products/toggle-trash",


  //bookinfo
  GET_DETAIL_PRODUCT_INFO: "/bookInfo/get-list-by-field",
  GET_DETAIL_PRODUCT_INFO_ALL: "/bookInfo/bookInfo-detail",
  CREATE_BOOK_INFO: "/bookInfo/create",
  UPDATE_BOOK_INFO: "/bookInfo/update",
  DELETE_BOOK_INFO: "/bookInfo/delete",
  UPDATE_BOOK_INFO_TRASH: "/bookInfo/update-trash",
  UPDATE_TYPE: "/bookInfo/update-type",

  //News
  GET_LIST_NEWS: "/news/get-list-by-field",
  GET_LIST_NEWS_ADMIN: "/news/get-lists",
  GET_NEW_DETAIL: "/news/new-detail",
  GET_NEWS_DETAIL: "/news/new-detail",
  CREATE_NEWS: "/news/create",
  UPDATE_NEWS: "/news/update",
  DELETE_NEWS: "/news/delete",
  UPDATE_STATUS_NEWS: "/news/status",
  UPDATE_TRASH_NEWS: "/news/trash",
  

  //Category
  GET_LIST_CATEGORY: "/category/status",
  GET_LIST_CATEGORY_ADMIN: "/category/get-lists",
  GET_CATEGORY_INFO: "/category/category-detail",
  UPDATE_STATUS_CATEGORY:"/category/status",
  UPDATE_TRASH_CATEGORY:"/category/trash",
  CREATE_CATEGORY: "/category/create",
  UPDATE_CATEGORY: "/category/update",
  DELETE_CATEGORY: "/category/delete",

  //Comment
  GET_LIST_COMMENT: "/user-comment/list-by-user-book",
  CREATE_COMMENT:"/user-comment/create",
  DELETE_COMMENT:"/user-comment/delete",
  //User
  GET_INFO_USER: "/users/user-detail",
  CREATE_USER: "/users/create",
  UPDATE_USER:"/users/update",
  GET_USER_LIST: "/users/get-list",
  DELETE_USER: "/users/delete",
  UPDATE_USER_STATUS:"/users/toggle-status",
  UPDATE_USER_ROLE:"/users/toggle-role/",
  //Banner
  GET_LIST_NEWS_BANNER: "/banner/active",
  GET_LIST_BANNER_ADMIN: "/banner/get-lists",
  UPDATE_STATUS_BANNER:"/banner/status",
  UPDATE_TRASH_BANNER:"/banner/trash",
  CREATE_BANNER: "/banner/create",
  UPDATE_BANNER: "/banner/update",
  DELETE_BANNER: "/banner/delete",

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
  DELETE_ORDER:"/orders/delete",
  UPDATE_ORDER:"/orders/update",
  CANCEL_ORDER:"/orders/cancel",
  //KeySearch
  GET_KEY_SEARCH:"/search/keywords",
  DELETE_KEYWORD:"/search/keywords",

  

  //QR code
  CREATE_QR_CODE: "TblMBQRcode/create",
  EDIT_QR_CODE: "TblMBQRcode/edit",
  DELETE_QR_CODE: "TblMBQRcode/delete",
  GET_ALL_QR_CODE: "TblMBQRcode/get-all",

  //MBQR Code Payment
  GET_DETAILS_QR_CODE_PAYMENT: "TblMBQRCodePayment/details",

  //Home
  GET_HOME_SUGGEST: "Home/suggest",

 
};
