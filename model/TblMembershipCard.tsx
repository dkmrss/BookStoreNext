export interface MembershipCard {
  id: number;
  exchangepoint: number | null;
  createddate: string | null;
  isactive: boolean;
  customerid: number;
  rankid: number | null;
  tblRank: tblRank;
}
export interface tblRank {
  id: number;
  description: string | null;
  name: string | null;
  minPoint: number | null;
  maxPoint: number | null;
}
