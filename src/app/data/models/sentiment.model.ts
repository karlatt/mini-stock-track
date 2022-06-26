export interface Sentiment {
  code: string;
  name: string;
  data: Array<SentimentInfo>;
}

export interface SentimentInfo {
  date: Date;//todo pipe to get properly formatted month
  change: number;
  mspr: number;
  isPositive:boolean;
}
