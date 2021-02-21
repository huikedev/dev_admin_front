import React, { useEffect} from "react";
import {SmartTime,PageAlert} from "@/huikedev";
import {PageContainer} from "@ant-design/pro-layout";
import {Button, Popconfirm, Space, Table, Tooltip} from 'antd'
import { history } from 'umi'
import PathName from "@/common/PathName";
import AppUtils from "@/utils/AppUtils";
import {useModel} from "@@/plugin-model/useModel";
import {useAntdTable} from "ahooks";
import {ColumnsType} from "antd/es/table";
import publicStyle from "@/assets/styles/index.less";
import {getClassName} from "@/helpers";


const FacadeList : React.FC = ()=>{
  const {
    btnLock,
    fetchFacadeList,
    facadeRefresh,
    facadeDelete,
    result
  } = useModel('useFacadeListModel',model => ({
    btnLock:model.btnLock,
    fetchFacadeList:model.fetchFacadeList,
    facadeRefresh:model.facadeRefresh,
    facadeDelete:model.facadeDelete,
    result:model.result
  }))

  const { tableProps, refresh } = useAntdTable(fetchFacadeList, {
    defaultPageSize: 10,
  })


  useEffect( ()=>{
    if(result){
      refresh()
    }},[result])


  const columns:ColumnsType<API.FacadeListItem> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align:"center",
    },
    {
      title: '门面名称',
      dataIndex: 'facade_title',
      key: 'facade_title',
      align:"center",
    },
    {
      title: '门面类',
      dataIndex: 'facade_class',
      key: 'facade_class',
      align:"center",
      render:(res:any,record)=>{
        return <Tooltip title={record.facade_class}><span className={publicStyle.textLink}>{getClassName(record.short_facade_class)}</span></Tooltip>
      }
    },
    {
      title: '动态类',
      dataIndex: 'origin_class',
      key: 'origin_class',
      align:"center",
      render:(res:any,record)=>{
        return <Tooltip title={record.origin_class}><span className={publicStyle.textLink}>{getClassName(record.short_origin_class)}</span></Tooltip>
      }
    },
    {
      title: '保存路径',
      dataIndex: 'facade_path',
      key: 'facade_path',
      align:"center",
      render:(res:any,record)=>{
        return <Tooltip title={record.facade_path}><span className={publicStyle.textLink}>查看</span></Tooltip>
      }
    },
    {
      title: '门面类型',
      dataIndex: 'type_id',
      key: 'type_id',
      align:"center",
      render:(res:any,record)=>{
        return <span>{AppUtils.getFacadeTypeTitle(record.type_id)}</span>
      }
    },
    {
      title: '方法数量',
      dataIndex: 'action_count',
      key: 'action_count',
      align:"center",
    },
    {
      title: '更新次数',
      dataIndex: 'update_times',
      key: 'update_times',
      align:"center",
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
      render:(res:any,record)=>{
        return record.creator.username
      }
    },
    {
      title: '更新时间',
      dataIndex: 'update_time',
      key: 'update_time',
      render:(res:any,record:API.FacadeListItem)=>{
        return <SmartTime unixTimeStamp={record.update_time} />
      }
    },
    {
      title: '操作',
      dataIndex: 'x',
      key: 'x',
      render:(res:any,record:API.FacadeListItem)=>{
        return <Space>
          <Popconfirm
            title={`确认更新门面【${record.facade_class}】?`}
            onConfirm={async ()=>{
              await facadeRefresh(record.id)
            }
            }
            okText="确认"
            cancelText="取消"
          >
            <Button disabled={btnLock}>更新</Button>
          </Popconfirm>
          <Popconfirm
            title={`确认删除门面【${record.facade_class}】（不会删除动态类）?`}
            onConfirm={async ()=>{
              await facadeDelete(record.id)
            }
            }
            okText="确认"
            cancelText="取消"
          >
            <Button danger disabled={btnLock}>删除</Button>
          </Popconfirm>
        </Space>
      }
    },
  ]


  return (
    <PageContainer>
      <Space direction="vertical" size={20} style={{width: '100%'}}>
        <PageAlert message="门面类不支持修改配置，如需重新指定动态类，可以删除记录后重新生成" closable/>
        <Button type="primary" onClick={() => history.push(PathName.generate.facadeCreate)}>生成门面</Button>
        <Table
          key="facadeList"
          columns={columns}
          rowKey="id"
          {...tableProps}
        />
      </Space>

    </PageContainer>
  );

}

export default FacadeList
