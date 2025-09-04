export interface OnlineCasino {
  id: number;
  Name: string;
  Rating_Pic?: {
    url: string;
  };
  Rating_Num: number;
  ReviewLink: string;
  Bonus_inf?: string; 
}

export interface Bonus {
  id: number;
  Name: string;
  BonusLink: string;
  Logo?: {
    url: string;
  };
}