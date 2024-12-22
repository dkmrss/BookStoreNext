export interface TblUserComment {
  id: number;
  itemType?: string | null;
  replyCount?: number | null;
  itemId: number;
  itemTitle?: string | null;
  isUserAdmin?: number | null;
  userId?: number | null;
  userEmail?: string | null;
  userName?: string | null;
  relatedOrder?: string | null;
  userAvatar?: string | null;
  userNote?: string | null;
  rate?: number | null;
  title?: string | null;
  content?: string | null;
  files?: string | null;
  searchFulltext?: string | null;
  approved?: string | null;
  postTime?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  orderNumber?: number | null;
  isFeatured?: string | null;
  peopleIdVote?: string | null;
  peopleLikeCount?: number | null;
  peopleDislikeCount?: number | null;
  priorStatus?: string | null;
  status?: string | null;
  creationDate?: string | null;
  createdBy?: string | null;
  lastUpdateDate?: string | null;
  lastUpdateBy?: string | null;
  tblUserCommentReplyModels?: tblUserCommentReply[] | null;
}

export interface tblUserCommentReply {
  id: number;
  commentId?: number | null;
  isUserAdmin?: number | null;
  userId?: number | null;
  userEmail?: string | null;
  userName?: string | null;
  userAvatar?: string | null;
  userNote?: string | null;
  rate?: number | null;
  title?: string | null;
  content?: string | null;
  files?: string | null;
  approved?: number | null;
  postTime?: number | null;
  ipAddress?: string | null;
  orderNumber?: number | null;
  isFeatured?: number | null;
  peopleIdVote?: number | null;
  peopleLikeCount?: number | null;
  peopleDislikeCount?: number | null;
  creationDate?: string | null;
  createdBy?: string | null;
  lastUpdateDate?: string | null;
  lastUpdateBy?: string | null;
}

export interface comment {
  id: number;
  book_id: number;
  user_id: number;
  content: string ;
  date: string ;
}
