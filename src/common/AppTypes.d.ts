interface AppClassState<Data = unknown>{
  isLoading:boolean;
  isError:boolean;
  isEmpty:boolean;
  data:Data
}

interface AppPaginator<ListTypeItem = any>{
  total:number;
  pageSize:number;
  current:number;
  last:number;
  list:ListTypeItem[] | [];
}

export interface AppResponseType<DataType = unknown> {
  success: boolean; // if request is success
  data?: DataType | any; // response data
  errorCode?: string; // code for errorType
  errorMessage?: string; // message display to user
  showType?: number; // error display type： 0 silent; 1 message.warn; 2 message.error; 4 notification; 9 page
  trace?: any; // Convenient for back-end Troubleshooting: unique request ID
  host?: string; // onvenient for backend Troubleshooting: host of current access server
  debug?: any;
}
