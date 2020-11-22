import AppConfig from "@/common/AppConfig";
import { format } from 'timeago.js';
import moment from "moment";
import lodash from 'lodash'
import {facadeOption} from "@/common/OptionConfig";

export default class AppUtils{

  public static getHeaders(): { [key: string]: any } {
    const headers: { [key: string]: any } = {};
    headers[AppConfig.tokenName] = AppUtils.getToken() || '';
    return headers;
  }

  public static dataAssign(data: object | undefined, from = false) {
    if (from) {
      if (typeof data ==='object') {
        Object.assign(data, { from: 'umi' });
      } else {
        data = { from: 'umi' };
      }
    }
    return data;
  }

  public static getToken(): string | null {
    const token = this.getStorage(AppConfig.tokenCacheName);
    return token === 'nil' ? null : token
  }

  public static setToken(tokenString: string):boolean {
      return this.setStorage(AppConfig.tokenCacheName, tokenString);
  }

  public static delToken() {
    return this.delStorage(AppConfig.tokenCacheName);
  }

  public static logout(){
    return AppUtils.delToken()
  }

  public static getStorage(name: string): string {
    try {
      const data: string | null = localStorage.getItem(
        `${AppConfig.localStoragePrefix}${name}`,
      );
      if (data!==null) {
        return JSON.parse(data);
      }
      return 'nil';
    } catch (error) {
      throw new Error(`获取storage时出错:${error}`);
    }
  }

  public static delStorage(name: string): boolean {
    try {
      localStorage.removeItem(`${AppConfig.localStoragePrefix}${name}`);
      return true;
    } catch (error) {
      throw new Error(`删除storage时出错:${error}`);
    }
  }

  public static setStorage(name: string, data: any): boolean {
    try {
      localStorage.setItem(`${AppConfig.localStoragePrefix}${name}`, JSON.stringify(data));
      return true;
    } catch (error) {
      throw new Error(`写入storage时出错:${error}`);
    }
  }

  public static timeAgo(
    unixTimeStamp: number,
    maxDay: number = 14,
    dateFormat: string = 'YYYY-MM-DD HH:mm',
  ) {
    const difference = Date.now() - unixTimeStamp * 1000;
    if (difference > maxDay * 86400 * 1000) {
      return moment(unixTimeStamp * 1000).format(dateFormat);
    }
    return format(unixTimeStamp * 1000, 'zh_CN');
  }

  public static timeFuture(
    unixTimeStamp: number,
    dateFormat: string = 'YYYY-MM-DD HH:mm',
  ): string {
    const distance = unixTimeStamp * 1000 - Date.now();
    switch (true) {
      case distance < 60 * 60 * 1000:
        return `${Math.floor(distance / (60 * 60 * 1000))  }分钟后`;
      case distance < 60 * 60 * 1000 * 24:
        return `${Math.floor(distance / (60 * 60 * 1000))  }小时后`;
      case distance < 60 * 60 * 1000 * 24 * 7:
        return `${Math.floor(distance / (60 * 60 * 1000 * 24))  }天后`;
      case distance < 60 * 60 * 1000 * 24 * 7 * 2:
        return `${Math.floor(distance / (60 * 60 * 1000 * 24 * 7))  }周后`;
      default:
        return moment(unixTimeStamp * 1000).format(dateFormat);
    }
  }

  public static getFacadeTypeTitle(id:number){
    const index:number = lodash.findIndex(facadeOption,{id})
    return index === -1 ? '未知' :facadeOption[index].title
  }
}
