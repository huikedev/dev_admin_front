import React, {useState} from "react";
import {useModel,useRequest} from "umi";
import {useAntdTable} from "ahooks";
import {ColumnsType} from "antd/es/table";
import {Button, Card, Popconfirm, Space, Table, Tooltip} from "antd";
import {PageContainer} from "@ant-design/pro-layout";
import {EmptyText, SmartTime} from "@/huikedev";
import publicStyle from "@/assets/styles/index.less";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import DeveloperSetModal from "@/pages/system/developer/components/DeveloperSetModal";
import {setDeveloperDelete} from "@/services/user";

const DeveloperList: React.FC = () => {
  const [developer,setDeveloper] = useState<API.DeveloperItem | undefined>()
  const [showSetModal,setShowSetModal] = useState(false)
  const {fetchDeveloperList} = useModel('useDeveloperModel',model => ({
    fetchDeveloperList:model.fetchDeveloperList
  })
  )
  const {tableProps, refresh} = useAntdTable(fetchDeveloperList, {
    defaultPageSize: 10
  })
  const {run:developerDelete,loading:developerDeleteRunning} = useRequest((params:object)=>setDeveloperDelete(params),{
    manual:true,
    debounceInterval:500,
    onSuccess:()=>refresh()
  })


  const DeveloperColumns:ColumnsType<API.DeveloperItemWithCreator> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '岗位',
      dataIndex: 'position_text',
      key: 'position_text',
    },
    {
      title: '最近登录IP',
      dataIndex: 'login_ip',
      key: 'login_ip',
      render:(res:any,record)=>{
        if(record.login_time === 0){
          return <EmptyText title="暂未登录"/>
        }
        return <Tooltip title={`上次登录IP：${record.last_login_ip}`}>
          {record.login_ip}
        </Tooltip>
      }
    },
    {
      title: '最近登录时间',
      dataIndex: 'login_time',
      key: 'login_time',
      render:(res:any,record)=>{
        if(record.login_time === 0){
          return <EmptyText title="暂未登录"/>
        }
        return <SmartTime unixTimeStamp={record.login_time} />

      }
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
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
      render:(res:any,record)=>{
        return <SmartTime unixTimeStamp={record.create_time} />
      }
    },
    {
      title: '管理操作',
      dataIndex: 'x',
      key: 'x',
      render:(res:any,record)=>{
        return <Space>
          <Button
            className={publicStyle.btnOutline}
            onClick={()=>{
              setDeveloper(record)
              setShowSetModal(true)
            }}
            icon={<EditOutlined />}
          />
          <Popconfirm
            title={`是否确认删除开发者【${record.username}】?`}
            onConfirm={async ()=>{
              await developerDelete({id:record.id})
            }
            }
          >
            <Button
              disabled={developerDeleteRunning}
              className={publicStyle.btnWarningOutline}
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Space>
      }
    },
  ]

  const showDeveloperSetModal = ()=>{
    if(!showSetModal){
      return null;
    }
    return <DeveloperSetModal
      onSuccess={async ()=>{
        setShowSetModal(false)
        await refresh()
      }}
      visible={showSetModal}
      onClose={()=>{
        setShowSetModal(false)
      }
      }
      dataItem={developer}
    />
  }

  return (
    <PageContainer>
      <Card>
        <Space direction="vertical" size={15} style={{width: '100%'}}>
          <Button type="primary" onClick={() => {
            setDeveloper(undefined)
            setShowSetModal(true)
          }}>添加开发者</Button>
          <Table
            key="developerList"
            columns={DeveloperColumns}
            rowKey="id"
            {...tableProps}
            bordered
          />
          {showDeveloperSetModal()}
        </Space>
      </Card>
    </PageContainer>
  )
}

export default DeveloperList
