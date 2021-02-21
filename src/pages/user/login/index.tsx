import {
  LockTwoTone,
  UserOutlined,
} from '@ant-design/icons';
import { Alert, message } from 'antd';
import React, { useState } from 'react';
import ProForm, {  ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { useIntl, Link, history,  SelectLang } from 'umi';
import Footer from '@/components/Footer';
import {login, LoginParamsType} from '@/services/login';
import AppUtils from "@/utils/AppUtils";
import styles from './index.less';


const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

/**
 * 此方法会跳转到 redirect 参数所在的位置
 */
const goto = () => {
  const { query } = history.location;
  const { redirect } = query as { redirect: string };
  window.location.href = redirect || '/';
};

interface LoginStateType {
  isRequest:boolean,status:boolean,msg:string|null
}
const InitLoginState:LoginStateType = {isRequest:false,status:false,msg:''}

const Login: React.FC<{}> = () => {
  const [submitting, setSubmitting] = useState(false);
  const [userLoginState, setUserLoginState] = useState<LoginStateType>(InitLoginState);
  const intl = useIntl();

  const handleSubmit = async (values: LoginParamsType) => {
    setSubmitting(true);
    setUserLoginState(InitLoginState)
    try {
      // 登录
      const res = await login({ ...values });
      if (res.success) {
        AppUtils.setToken(res.data.token)
        message.success('登录成功！');
        goto();
        return;
      }
      // 如果失败去设置用户错误信息
      setUserLoginState({isRequest:true,status:res.success,msg:res.errorMessage});
    } catch (error) {
      setUserLoginState({isRequest:true,status:false,msg:error.message});
    }
    setSubmitting(false);
  };
  const { status,isRequest,msg } = userLoginState;

  return (
    <div className={styles.container}>
      <div className={styles.lang}>{SelectLang && <SelectLang />}</div>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <span className={styles.title}>Huike.Dev</span>
            </Link>
          </div>
          <div className={styles.desc}>一款基于ThinkPHP 6.0的逻辑分层扩展</div>
        </div>

        <div className={styles.main}>
          <ProForm
            initialValues={{
              autoLogin: true,
            }}
            submitter={{
              searchConfig: {
                submitText: intl.formatMessage({
                  id: 'pages.login.submit',
                  defaultMessage: '登录',
                }),
              },
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                loading: submitting,
                size: 'large',
                style: {
                  width: '100%',
                },
              },
            }}
            onFinish={async (values) => {
              handleSubmit(values);
            }}
          >

            {isRequest && !status && (
              <LoginMessage
                content={String(msg)}
              />
            )}
              <>
                <ProFormText
                  name="username"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder="请输入用户名"
                  rules={[
                    {
                      required: true,
                      message: "请输入用户名",
                    },
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockTwoTone className={styles.prefixIcon} />,
                  }}
                  placeholder="请输入密码"
                  rules={[
                    {
                      required: true,
                      message:"请输入密码",
                    },
                  ]}
                />
              </>

            <div
              style={{
                marginBottom: 24,
              }}
            >
              <ProFormCheckbox noStyle name="autoLogin">
                自动登录
              </ProFormCheckbox>
            </div>
          </ProForm>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
