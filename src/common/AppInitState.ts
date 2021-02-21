import {AppPaginator} from "@/common/AppTypes";

export const AppPaginatorInit:AppPaginator ={
  total:0,
  pageSize:10,
  current:1,
  last:0,
  list:[],
}

export const DefaultUser:API.DeveloperItem = {
  id:0,
  username:'unknown',
  position_text:'未知',
  position_id:0,
  last_login_ip:'127.0.0.1',
  login_ip:'127.0.0.1',
  login_time:0,
  last_login_time:0,
  create_time:0,
  creator_id:0,
}
