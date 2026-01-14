import { isNotEmptyArray, isNotEmptyString } from "../utils";

export interface FamilyMember {
  id: number;
  name: string;
  gender: number;
  father_id: number;
  mother_id: number;
  pin_yin: string;
  birthday: Date;
  deathday: Date;
  avatar_url: string;
  summary: string;
  extra: string;
  protected_info: string;
  /** flatted data that extracted from `extra` */
  spread?: Record<string, any>;
}

/** normalize the FamilyMember data */
export const normFamilyMember = (data: FamilyMember): FamilyMember => {
  if (!data) return {} as FamilyMember;
  if (isNotEmptyString(data.extra)) {
    data.spread = JSON.parse(data.extra);
  }
  return data;
};

export interface NameValueTag {
  name: string;
  value: any;
  tag: any;
}

export interface NameValueChildren extends NameValueTag {
  children: NameValueChildren[];
}
