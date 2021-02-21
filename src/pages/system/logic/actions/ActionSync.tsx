import React, {useEffect, useState} from "react";
import {useRequest} from 'umi'
import {getUnSyncedAction} from "@/services/logic";
import { Card,  Space,  Pagination} from "antd";
import {PageContainer} from "@ant-design/pro-layout";
import {PageException, PageLoading, PageEmpty, PageAlert} from "@/huikedev";
import {AppPaginator} from "@/common/AppTypes";
import ActionSyncForm from "@/pages/system/logic/actions/components/ActionSyncForm";
import {PaginatedParams} from "ahooks/es/useAntdTable";


const ActionSync: React.FC = () => {
  const [paginateParams, setPaginateParams] = useState<PaginatedParams[0]>({current:1,pageSize:5})
  const {loading, data: unSyncedAction, error, refresh,run:fetchUnSyncedAction}: { loading: boolean, data: AppPaginator<API.UnSyncedActionItem>, error: Error | undefined, refresh: any ;run:any} = useRequest((params:PaginatedParams[0]) => getUnSyncedAction(params), {
    defaultParams: [paginateParams]
  })

  useEffect(()=>{
    fetchUnSyncedAction(paginateParams)
  },[paginateParams])

  if (loading) {
    return <PageLoading/>
  }

  if (error) {
    return <PageException title={error.message} status={500}/>
  }

  if (unSyncedAction.list.length === 0) {
    return (
      <PageContainer>
        <Card>
          <PageEmpty description="所有控制器方法均已同步至数据库"/>
        </Card>
      </PageContainer>
    )
  }

  const buildFormItem = (actionData:API.UnSyncedActionItem)=>{
    return (<ActionSyncForm
      actionData={{
      ...actionData,
        notice_type:0,
        response_type:1,
        service_return_type:'mixed',
        is_need_permission:true,
        is_private:true
    }}
      key={actionData.full_action_name}
      onSuccess={()=>refresh()}/>)
  }

  return (
    <PageContainer>
      <Card>
        <Space direction="vertical" size={20} style={{width: '100%'}}>
          <PageAlert closable type="error" message={
            <p>此数据来自动态读取，读取逻辑为数据库中已保存控制器下所有未添加到数据库的Public方法</p>}
          />
          <Space direction="vertical" style={{width: '100%'}}>
              <div style={{display: "flex", flexDirection: "row-reverse"}}>
                <Pagination
                  defaultCurrent={paginateParams.current}
                  defaultPageSize={paginateParams.pageSize}
                  showTotal={total => `共 ${total} 条记录`}
                  total={unSyncedAction.total}
                  onChange={async (page) => {
                    setPaginateParams({pageSize:5,current:page})
                  }}/>
              </div>
                <Space key="formList" size={30} direction="vertical" style={{width: '100%'}}>
                {unSyncedAction.list.length > 0 && (unSyncedAction.list as Array<API.UnSyncedActionItem>).map((actionData:API.UnSyncedActionItem)=>buildFormItem(actionData))}
                </Space>

          </Space>
        </Space>
      </Card>
    </PageContainer>
  )
}

export default ActionSync
