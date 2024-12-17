export interface DataArticle {
  id?: number | null;
  type?: string;
  title: string;
  videoCode: string | null;
  externalUrl: string | null;
  url: string;
  requestPath: string;
  urlHash: string;
  thumnail: string | File | null;
  imageBackground: string | File | null;
  extend?: string;
  content: string | null;
  summary: string;
  tag?: string;
  creationDate?: string;
  createdBy?: string;
  lastUpdateDate?: string;
  lastUpdatedBy?: string;
  ordering?: number | null;
  reviewRate?: number | null;
  reviewCount?: number | null;
  status?: number | null;
  visit?: number | null;
  likeCount?: number | null;
  isFeatured?: number | null;
  approvedStatus?: string | null;
  metaTitle: string;
  metaKeywords?: string;
  metaDescription: string;
  commentCount?: number | null;
  commentRate?: number | null;
  postedDate?: string | null;
  isStricking: string | null;
  imagePath: string | null;
  imageDetailPath: string | null;
  articleCategory: string | null;
  allowSeIndex: string | null;
  tblArticleImageCommands?: ArticleImage[] | [];
  tblArticleImageModels?: ArticleImage[] | [];
  tblArticleCategoryDetCommands?: ArticleCategory[] | [];
  tblArticleCategoryDetModels?: ArticleCategory[] | [];
  listCategoryId?: number | number[];
}

export interface ArticleImage {
  id?: number;
  articleId: number;
  caption: string;
  fileLocation: string;
  creationDate: string;
  createdBy: string;
  lastUpdateDate: string;
  lastUpdatedBy: string;
}
export interface ArticleCategory {
  id?: number;
  articleId?: number;
  catId?: number;
  createdBy?: string;
  creationDate?: string;
  lastUpdateDate?: string;
  lastUpdatedBy?: string;
}

export interface ArticleCategoryList {
  id: number;
  code: string;
  name: string;
  linkIndex: string | null;
  description: string | null;
  imageUrl: string | null;
  parentId: number | null;
  status: string | null;
  type: string | null;
  orderNumber: number | null;
  creationDate: string | null;
  createdBy: string | null;
  lastUpdateDate: string | null;
  lastUpdatedBy: string | null;
  metaTitle:string | null;
  metaKeyword: string | null;
  metaDescription: string | null;
  note: string | null;
  requestPath: string | null;
}

export interface Article {
  id: number;
  title: string;
  short_description: string;
  content: string;
  avatar: string;
  created_at: string; // ISO Date string
  status: number;
  trash: number;
}