import { DetailItem, RichTextBlock, StrapiMedia } from "@/shared/api/bonusesApi";


export interface OnlineCasino {
  id: number;
  documentId: string;
  Name: string;
  slug: string;
  Description?: string | null;
  Country?: string | null;
  Language?: string | null;
  Welcome_cash_link?: string | null;
  Welcome_pack?: string | null;
  Rating_Num?: number | null;
  Is_new?: boolean | null;
  Logo?: StrapiMedia | null;
  What_we_like?: RichTextBlock[];
  What_we_dont_like?: RichTextBlock[];
  General?: DetailItem[];
  Payment_info?: DetailItem[];
  Games_info?: DetailItem[];
  About_casino?: RichTextBlock[];
  similar_casinos?: OnlineCasino[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  locale: string;
  createdBy?: Record<string, unknown>;
  updatedBy?: Record<string, unknown>;
  localizations?: unknown[];
}
