import React, { useEffect, useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import { SmartTime, EmptyText, PageAlert } from '@/huikedev';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Space, Table, Tooltip, Popconfirm, Dropdown, Menu, Modal } from 'antd';
import { history, Link } from 'umi';
import { useModel } from '@@/plugin-model/useModel';
import { useAntdTable } from 'ahooks';
import {
  FileSearchOutlined,
  SwapOutlined,
  NodeExpandOutlined,
  DeleteOutlined,
  DownOutlined,
} from '@ant-design/icons';
import PathName from '@/common/PathName';
import { ModelListDataType } from '@/models/useModelListModel';
import publicStyle from '@/assets/styles/index.less';
import ModelDelete from './components/modal/ModelDelete';
import ModelProperty from './components/modal/ModelProperty';
import ModelFields from './components/modal/ModelFields';

const ModelList: React.FC = () => {
  const [modelData, setModelData] = useState<API.ModelListItem | undefined>(undefined);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showPropertyModal, setShowPropertyModal] = useState<boolean>(false);
  const [showFieldsModal, setShowFieldsModal] = useState<boolean>(false);
  const {
    fetchModelList,
    btnLock,
    updateAnnotation,
    migrateRun,
    tableToMigration,
    tableToSeeds,
    syncProperty,
    result,
  } = useModel('useModelListModel', (model) => ({
    fetchModelList: model.fetchModelList,
    btnLock: model.btnLock,
    updateAnnotation: model.updateAnnotation,
    migrateRun: model.migrateRun,
    syncProperty: model.syncProperty,
    result: model.result,
    tableToMigration: model.tableToMigration,
    tableToSeeds: model.tableToSeeds,
  }));
  const { tableProps, refresh } = useAntdTable(fetchModelList, {
    defaultPageSize: 10,
  });

  // 操作成功的情况下刷新表格
  useEffect(() => {
    if (result) {
      refresh();
    }
  }, [result]);

  const handleMigrationDropdown = async (key: string | number, modelId: number) => {
    switch (key) {
      case 'runMigration':
        Modal.confirm({
          content: '是否确认执行数据库迁移？',
          onOk: async () => {
            await migrateRun({ id: modelId });
          },
        });
        break;
      case 'tableToMigration':
        Modal.confirm({
          content: '是否确认根据表字段生成数据迁移文件（若存在会覆盖）？',
          onOk: async () => {
            await tableToMigration({ id: modelId });
          },
        });
        break;
      case 'tableToSeeds':
        Modal.confirm({
          content: '是否确认根据表数据生成数据种子文件（若有旧文件请手动删除）？',
          onOk: async () => {
            await tableToSeeds({ id: modelId });
          },
        });
        break;
      default:
        Modal.error({
          content: '未定义的操作行为',
        });
    }
  };

  const columns: ColumnsType<ModelListDataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '关联模块',
      dataIndex: 'module_id',
      key: 'module_id',
      render: (res: any, record: ModelListDataType) => {
        if (record.module_id === 0) {
          return <span>应用内模块</span>;
        }
        return <span>{record.module?.module_title}</span>;
      },
    },
    {
      title: '模型备注',
      dataIndex: 'remark',
      key: 'remark',
      render: (res: any, record: ModelListDataType) => {
        return record.remark.length === 0 ? <EmptyText title="无" /> : record.remark;
      },
    },
    {
      title: '模型名称',
      dataIndex: 'model_name',
      key: 'model_name',
      render: (res: any, record: ModelListDataType) => {
        return (
          <Space>
            <span>{record.model_name}</span>
            <Tooltip title="查看属性">
              <FileSearchOutlined
                className={publicStyle.textBlue}
                onClick={() => {
                  setModelData(record);
                  setShowPropertyModal(true);
                }}
              />
            </Tooltip>
          </Space>
        );
      },
    },
    {
      title: '模型字段',
      dataIndex: 'model_fields',
      key: 'model_fields',
      render: (res: any, record: ModelListDataType) => {
        if (record.is_table_created) {
          if (record.model_fields_count > 0) {
            return (
              <Button
                type="link"
                onClick={() => {
                  setModelData(record);
                  setShowFieldsModal(true);
                }}
              >
                {record.model_fields_count}个
              </Button>
            );
          }
          return <EmptyText title="无字段" />;
        }
        if (record.model_fields_count === 0) {
          if (record.migrate_file.length === 0) {
            return (
              <Link to={{ pathname: `${PathName.generate.modelFieldsAdd}/${record.id}` }}>
                添加
              </Link>
            );
          }
          return <EmptyText title="未执行" />;
        }
        return <EmptyText title="未知错误" />;
      },
    },
    {
      title: '更新时间',
      dataIndex: 'update_time',
      key: 'update_time',
      render: (res: any, record: ModelListDataType) => {
        return <SmartTime unixTimeStamp={record.update_time} />;
      },
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
      render: (res: any, record: ModelListDataType) => {
        return record.creator.username;
      },
    },
    {
      title: '数据库迁移',
      dataIndex: 'update_time',
      key: 'update_time',
      render: (res: any, record: ModelListDataType) => {
        return (
          <Space>
            {record.migrate_file.length === 0 ? (
              <EmptyText title="未生成" />
            ) : (
              <Tooltip title={`迁移文件：${record.migrate_file}`}>
                <span className={publicStyle.textGreen}>已生成</span>
              </Tooltip>
            )}
            {record.migrate_version.length === 0 ? (
              <EmptyText title="未执行" />
            ) : (
              <Tooltip title={`迁移版本：${record.migrate_version}`}>
                <span className={publicStyle.textGreen}>已执行</span>
              </Tooltip>
            )}
            <Dropdown
              trigger={['click']}
              placement="bottomRight"
              overlay={
                <Menu
                  onClick={({ key }) => {
                    handleMigrationDropdown(key, record.id);
                  }}
                >
                  <Menu.Item
                    key="runMigration"
                    disabled={record.migrate_file.length === 0 || record.migrate_version.length > 0}
                  >
                    执行数据库迁移
                  </Menu.Item>
                  <Menu.Item key="tableToMigration">表字段生成迁移文件</Menu.Item>
                  <Menu.Item key="tableToSeeds">表数据生成种子文件</Menu.Item>
                </Menu>
              }
            >
              <Button>
                迁移操作 <DownOutlined />
              </Button>
            </Dropdown>
          </Space>
        );
      },
    },
    {
      title: '操作',
      dataIndex: 'x',
      key: 'x',
      render: (res: any, record: ModelListDataType) => {
        return (
          <Space>
            <Popconfirm
              key="syncProperty"
              title={`确认同步模型【${record.model_name}】的模型属性?`}
              onConfirm={async () => {
                await syncProperty(record.id);
              }}
              okText="确认"
              cancelText="取消"
              disabled={btnLock}
            >
              <Tooltip title="同步模型属性">
                <Button className={publicStyle.btnGenerateOutline} icon={<SwapOutlined />} />
              </Tooltip>
            </Popconfirm>
            <Popconfirm
              key="updateAnnotation"
              title={`确认更新模型【${record.model_name}】的模型注解?`}
              onConfirm={async () => {
                await updateAnnotation(record.id);
              }}
              okText="确认"
              cancelText="取消"
            >
              <Tooltip title="更新模型注解">
                <Button className={publicStyle.btnGreenOutline} icon={<NodeExpandOutlined />} />
              </Tooltip>
            </Popconfirm>
            <Tooltip title="删除数据模型">
              <Button
                disabled={btnLock}
                onClick={() => {
                  setModelData(record);
                  setShowDeleteModal(true);
                }}
                className={publicStyle.btnWarningOutline}
                icon={<DeleteOutlined />}
              />
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  const showModelDelete = () => {
    if (typeof modelData === 'undefined' || !showDeleteModal) {
      return null;
    }
    return (
      <ModelDelete
        model_id={modelData.id}
        visible={showDeleteModal}
        onSuccess={async () => {
          await refresh();
        }}
        onClose={() => setShowDeleteModal(false)}
      />
    );
  };
  const showModelProperty = () => {
    if (typeof modelData === 'undefined' || !showPropertyModal) {
      return null;
    }
    return (
      <ModelProperty
        data={modelData}
        visible={showPropertyModal}
        onRefresh={() => {}}
        onClose={() => {
          setShowPropertyModal(false);
        }}
      />
    );
  };
  const showModelFields = () => {
    if (typeof modelData === 'undefined' || !showFieldsModal) {
      return null;
    }
    return (
      <ModelFields
        modelConfig={modelData}
        visible={showFieldsModal}
        onClose={() => setShowFieldsModal(false)}
      />
    );
  };

  return (
    <PageContainer>
      <Space direction="vertical" size={20} style={{ width: '100%' }}>
        <PageAlert
          closable
          message="模型生成只支持新建模型，不支持模型属性修改或更新，后续可手动修改后同步模型属性"
        />
        <Button type="primary" onClick={() => history.push(PathName.generate.modelCreate)}>
          生成模型
        </Button>
        <Table key="modelList" columns={columns} rowKey="id" {...tableProps} />
      </Space>
      {/* 弹出层modal */}
      {showModelDelete()}
      {showModelProperty()}
      {showModelFields()}
    </PageContainer>
  );
};

export default ModelList;
