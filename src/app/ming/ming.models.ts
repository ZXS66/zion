import { isNotEmptyArray, isNotEmptyString } from "../utils";

export interface FamilyMember {
  id: number;
  name: string;
  gender: number;
  /** 父亲id，-1表示未知 */
  father_id: number;
  /** 母亲id，-1表示未知 */
  mother_id: number;
  pin_yin: string;
  birthday: Date;
  deathday: Date;
  avatar_url: string;
  summary: string;
  /** 扩展信息 */
  extra: string;
  protected_info: string;
  /** 职称 */
  title: string;
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
