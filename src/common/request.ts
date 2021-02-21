import {ResponseError,RequestOptionsInit} from "umi-request";
import {message, Modal, notification} from "antd";
import { history, RequestConfig } from 'umi';
import { baseUri } from "@/common/AppConfig";
import AppUtils from "@/utils/AppUtils";

const codeMessage: {
  [key: number]: string;
} = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const showNotice = (showType:number,title:string='系统提示',msg:string)=>{
  switch (showType){
    case 0:
      break;
    case 1:
      message.destroy();
      message.warning(msg)
      break;
    case 2:
      message.destroy();
      message.error(msg)
      break;
    case 3:
      message.destroy();
      message.success(msg)
      break;
    case 4:
      notification.error({
        message:title,
        description:msg
      })
      break;
    case 5:
      notification.warning({
        message:title,
        description:msg
      })
      break;
    case 6:
      notification.success({
        duration:3,
        message:title,
        description:msg
      })
      break;
    case 7:
      Modal.destroyAll();
      Modal.error({
        title,
        content:msg
      })
      break;
    case 8:
      Modal.destroyAll();
      Modal.warning({
        title,
        content:msg
      })
      break;
    case 9:
      Modal.destroyAll();
      Modal.success({
        title,
        content:msg
      })
      break;
    default:
      notification.destroy();
      notification.info({
        message:title,
        description:msg
      })
  }
}


/**
 * 异常处理程序
 */
const errorHandler = (error: ResponseError) => {
  if (error.name === 'BizError') {
    if (error.data.errorCode <= -99900) {
      notification.destroy()
      AppUtils.logout();
      notification.error({
        message: `系统提示`,
        description: '登录状态验证错误，请重新登录',
        duration: 3,
      });
      history.push('/user/login');
      throw error
    }
    const tips: string =
      `[${
        error.data.errorCode
      }]${
        error.data.errorMessage ?? '未返回错误信息'}`;
    showNotice(error.data.showType,`系统错误`,tips)
    throw error
  }

  if (error.name === 'RequestError') {
    showNotice(7,'请求出错','请求超时或网络不可用')
    throw error
  }
  const { response } = error;
  const { status } = response;
  showNotice(7,`请求错误 ${status}`,`系统请求错误，错误码:[${  status  }]`)

  return { success: false, errorMessage: `系统错误，错误码:[${  status  }]` };
};

export const request: RequestConfig = {
  timeout: 10000,
  prefix: baseUri(),
  requestInterceptors: [
    async (url: string, options:RequestOptionsInit) => {
      if (options.method === 'post' || options.method === 'get') {
        const headers = AppUtils.getHeaders();
        options.params = AppUtils.dataAssign(options.params, true);
        options.data = AppUtils.dataAssign(options.data, true);
        return {
          url,
          options: { ...options, headers },
        };
      }
    },
  ],
  responseInterceptors:[
    async response => {
      const data = await response.clone().json();
      if(data.success === false){
        return response;
      }
      showNotice(Number(data.showType),'操作提示',String(data.errorMessage))
      return response;
    }
  ],

  errorHandler,
};
