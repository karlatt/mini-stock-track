export interface Stock {
  code: string;
  name: string;
  // isLoading: boolean;
  currentPrice: number;
  openingPrice: number;
  change: number;
  highPrice: number;
  date?: Date;
  isPositive:boolean;
}


