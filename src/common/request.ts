import {ResponseError,RequestOptionsInit} from "umi-request";
import {notification} from "antd";
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


/**
 * 异常处理程序
 */
const errorHandler = (error: ResponseError) => {
  notification.destroy();
  if (error.name === 'BizError') {
    if (error.data.errorCode <= -9900) {
      console.log(54145)
      AppUtils.logout();
      notification.error({
        message: `系统提示`,
        description: '登录状态验证错误，请重新登录',
        duration: 3,
      });
      history.push('/user/login');
      return { success: false, errorMessage: '登录状态验证错误，请重新登录' };
    }
    notification.error({
      message: `系统错误：[ ${error.data.errorCode}]`,
      description: error.data.errorMessage ?? '未返回错误信息',
      duration: 5,
    });
    const tips: string =
      `[${
      error.data.errorCode
      }]${
      error.data.errorMessage ?? '未返回错误信息'}`;
    return { success: false, errorMessage: tips };
  }

  if (error.name === 'RequestError') {
    notification.error({
      message: `请求出错`,
      description: '请求超时或网络不可用',
    });
    return { success: false, errorMessage: '请求超时或网络不可用' };
  }

  console.log(error);
  const { response } = error;
  const errorMsg = codeMessage[response.status] || response.statusText;
  const { status } = response;
  notification.error({
    message: `请求错误 ${status}`,
    description: errorMsg,
    duration: 0,
  });
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
  errorHandler,
};
