export interface RoyalFamilyMember {
  id: string;
  姓名: string;
  拼音: string;
  /** emperor/prince/infant */
  status: string;
  father_id: string;
  父亲: string;
  母亲: string;
  年号: string;
  庙号: string;
  谥号简称: string;
  在位时间: string;
  封号或身份: string;
  生卒: string;
  备注: string;
  主要政绩: string;
  子嗣数量: number;
}
