import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { FamilyMember } from "../ming.models";
import { API_BASE_URL, API_TOKEN } from "src/app/constants";

@Injectable({ providedIn: "root" })
export class FamilyService {
  private baseUrl = API_BASE_URL + "family";
  constructor(private http: HttpClient) { }
  private _get<T>(url: string): Promise<T> {
    return this.http.get<T>(
      url,
      {
        headers: { "Content-Type": "application/json", "x-token": API_TOKEN },
        responseType: "json"
      }
    ).toPromise();
  }
  private _post<T>(url, body: Object = null): Promise<T> {
    return this.http.post<T>(
      url,
      body == null ? null : JSON.stringify(body),
      {
        headers: { "Content-Type": "application/json", "x-token": API_TOKEN },
        responseType: "json"
      }).toPromise();
  }

  searchFamilyMembers(/**search query*/q: string, /** zero-based page index */ page_index = 0, /** how many items per page*/ page_size = 10): Promise<FamilyMember[]> {
    const params = new URLSearchParams();
    params.set("q", q);
    params.set("page_index", page_index.toString());
    params.set("page_size", page_size.toString());
    const url = this.baseUrl + "/members/?" + params.toString();
    return this._get<FamilyMember[]>(url);
  }
  /** add a new family member */
  addFamilyMember(member: Partial<FamilyMember>): Promise<FamilyMember> {
    return this._post<FamilyMember>(this.baseUrl + "/members/", member);
  }
  /** get details of the family member by id */
  getFamilyMember(/**id of the family member*/id: number): Promise<FamilyMember> {
    return this._get<FamilyMember>(this.baseUrl + "/members/" + id);
  }
  /** update a family member */
  updateFamilyMember(id: number, member: Partial<FamilyMember>): Promise<any> {
    return this._post(this.baseUrl + "/members/" + id, member);
  }

}
