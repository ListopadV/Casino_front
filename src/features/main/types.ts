import { DetailItem, RichTextBlock, StrapiMediaAttributes } from "@/shared/api/bonusesApi";


export interface OnlineCasino {
  id: number;
  Name: string;
  slug: string;
  Welcome_cash_link?: string;
  Welcome_pack?: string;
  Rating_Num?: number;
  Is_new?: boolean;
  Logo?: StrapiMediaAttributes | null;
  What_we_like?: RichTextBlock[];
  What_we_dont_like?: RichTextBlock[];
  General?: DetailItem[];
  Payment_info?: DetailItem[];
  Games_info?: DetailItem[];
  About_casino?: RichTextBlock[];
}
