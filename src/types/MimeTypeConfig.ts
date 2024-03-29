import { LiteralUnion } from "./HelperTypes";
import { MimeTypeBaseString, MimeTypeDiscreteType, MimeTypeSubType } from "./MimeType";

export type MimeTypeBaseQueryString = 
  | MimeTypeBaseString
  | MimeTypeDiscreteType
  | MimeTypeSubType;

export type MimeTypeQueryString = LiteralUnion<MimeTypeBaseQueryString>;

export type MimeTypeConfig = {
  mode: "config"
  type: MimeTypeDiscreteType;
  subtype: MimeTypeSubType;
  parameter: string;
} | {
  mode: "string";
  comparisonMode: "equals" | "contains";
  mimeString: MimeTypeQueryString;
};