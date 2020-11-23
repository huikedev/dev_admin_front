import React from "react";
import {ColumnsType} from "antd/es/table";
import {AppPaginatorInit} from "@/common/AppInitState";
import {AppClassState, AppPaginator} from "@/common/AppTypes";
import { GenerateRequest } from '@/services/index'
import {PageLoading,PageException,SmartTime} from "@/huikedev";
import {PageContainer} from "@ant-design/pro-layout";
import {Button, Space, Table} from 'antd'
import {history} from "@@/core/history";
import PathName from "@/common/PathName";

interface ModelListState extends AppClassState<AppPaginator>{

}

export default class ModelList extends React.Component<any, ModelListState>{

  state = {
    isLoading:true,
    isError:false,
    // eslint-disable-next-line react/no-unused-state
    isEmpty:false,
    data:AppPaginatorInit
  }

  private columns: ColumnsType<API.ModelListItem> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '模型名称',
      dataIndex: 'model_name',
      key: 'model_name',
    },
    {
      title: '模型路径',
      dataIndex: 'model_path',
      key: 'model_path',
    },
    {
      title: '命名空间',
      dataIndex: 'model_namespace',
      key: 'model_namespace',
    },
    {
      title: '模型字段',
      dataIndex: 'model_fields',
      key: 'model_fields',
      render:(res:any,record)=>{
        return <span>{record.model_fields.length}个</span>
      }
    },
    {
      title: '模型属性',
      dataIndex: 'model_property',
      key: 'model_property',
      render:(res:any,record)=>{
        return <span>{record.model_fields.length}个</span>
      }
    },
    {
      title: '模型关联',
      dataIndex: 'model_relations',
      key: 'model_relations',
      render:(res:any,record)=>{
        return <span>{record.model_relations.length}个</span>
      }
    },
    {
      title: '更新时间',
      dataIndex: 'update_time',
      key: 'update_time',
      render:(res:any,record)=>{
        return <SmartTime unixTimeStamp={record.update_time} />
      }
    },
    {
      title: '操作',
      dataIndex: 'x',
      key: 'x',
      render:(res:any,record)=>{
        return <SmartTime unixTimeStamp={record.update_time} />
      }
    },
  ]

  async componentDidMount() {
    await this.getModelList()
  }

  async getModelList(){
    this.setState({
      isLoading:true,
      isError:false,
      // eslint-disable-next-line react/no-unused-state
      isEmpty:false
    })
    const { data } = this.state
    const {pageSize,current} = data
    const res = await GenerateRequest.modelList({
      pageSize,current
    })
    if(res.success){
      this.setState({
        isLoading:false,
        data:{...res.data}
      })
    }else{
      this.setState({
        isLoading:false,
        isError:true
      })
    }
  }

  buildContent(){
    const { isLoading,isError,data} = this.state
    if(isLoading){
      return <PageLoading />
    }

    if(isError){
      return <PageException />
    }

    return (
      <Table
        loading={isLoading}
        style={{ marginTop: 20 }}
        columns={this.columns}
        rowClassName={(record, index) => {
          let className = 'light-row';
          if (index % 2 === 1) className = 'dark-row';
          return className;
        }}
        dataSource={data.list}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: false,
          current: data.current,
          showTotal: () => `共${data.total}条`,
          // @ts-ignore
          total: data.total,
          pageSize: data.pageSize,
          onShowSizeChange: async (current, size) => {
            data.current = current;
            data.pageSize = size;
            await this.getModelList();
          },
          onChange: async current => {
            data.current = current;
            await this.getModelList();
          },
        }}
      />
    );

  }

  render() {
    return (
      <PageContainer>
      <Space direction="vertical" size={20} style={{width:'100%'}}>
        <Button type="primary" onClick={()=>history.push(PathName.generate.modelCreate)}>生成模型</Button>
        {this.buildContent()}
      </Space>
      </PageContainer>
    );
  }
}
