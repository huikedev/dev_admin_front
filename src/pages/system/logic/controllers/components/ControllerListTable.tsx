import React, { useEffect, useState } from 'react';
import { useModel } from '@@/plugin-model/useModel';
import { useAntdTable } from 'ahooks';
import { ColumnsType } from 'antd/es/table';
import {
  Button,
  Col,
  Descriptions,
  Popconfirm,
  Popover,
  Row,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import { EmptyText, ModulePopover, SmartTime } from '@/huikedev';
import {
  AppstoreAddOutlined,
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import publicStyle from '@/assets/styles/index.less';
import { Link, history } from 'umi';
import PathName from '@/common/PathName';
import ControllerDelete from '@/pages/system/logic/controllers/components/modal/ControllerDelete';
import ControllerEdit from '@/pages/system/logic/controllers/components/modal/ControllerEdit';
import { getClassName } from '@/helpers';

const { Text } = Typography;

const ControllerListTable: React.FC = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [controllerData, setControllerData] = useState<API.ControllerTableItem | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const {
    fetchControllersList,
    controllerEditSubmit,
    controllerDeleteSubmit,
    controllerEditSubmitting,
    controllerDeleteSubmitting,
    updateFacadeSubmit,
    updateFacadeSubmitting,
  } = useModel('useControllersModel', (model) => ({
    fetchControllersList: model.fetchControllersList,
    controllerEditSubmit: model.controllerEditSubmit,
    controllerDeleteSubmit: model.controllerDeleteSubmit,
    controllerEditSubmitting: model.controllerEditSubmitting,
    controllerDeleteSubmitting: model.controllerDeleteSubmitting,
    updateFacadeSubmit: model.updateFacadeSubmit,
    updateFacadeSubmitting: model.updateFacadeSubmitting,
  }));
  const { tableProps, refresh } = useAntdTable(fetchControllersList, {
    defaultPageSize: 10,
  });

  useEffect(() => {
    if (controllerEditSubmitting || controllerDeleteSubmitting) {
      setSubmitting(true);
    } else {
      setSubmitting(false);
    }
  }, [controllerEditSubmitting, controllerDeleteSubmitting]);

  const ControllerColumns: ColumnsType<API.ControllerTableItem> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '模块',
      dataIndex: 'module_title',
      key: 'module_title',
      align: 'center',
      render: (res, record) => {
        if (record.module.extend_module_id > 0) {
          return (
            <Space>
              <ModulePopover key={record.id} module={record.module} />
              <Tooltip title="第三方模块">
                <AppstoreAddOutlined className={publicStyle.textRed} size={18} />
              </Tooltip>
            </Space>
          );
        }
        return <ModulePopover key={record.id} module={record.module} />;
      },
    },
    {
      title: '控制器名称',
      dataIndex: 'controller_title',
      key: 'controller_title',
      align: 'center',
    },
    {
      title: '控制器',
      dataIndex: 'controller_name',
      key: 'controller_name',
      render: (res, record) => {
        return (
          <Tooltip
            title={`app\\controller\\${record.module.module_name}\\${record.path.controller_name}\\${record.controller_name}`}
          >
            <Space>
              {record.path_id === 0 ? <Tag color="volcano">目录</Tag> : null}
              <span className={publicStyle.textLink}>{record.controller_name}</span>
            </Space>
          </Tooltip>
        );
      },
    },
    {
      title: '路由别名',
      dataIndex: 'route_name',
      key: 'route_name',
      render: (res, record) => {
        if (record.module.bind_domain.length === 0) {
          return <>{`${record.module.route_name}/${record.route_name}`}</>;
        }
        if (record.route_name === null) {
          return <EmptyText title="未指定" />;
        }
        return <>{record.route_name}</>;
      },
    },
    {
      title: 'Service目录',
      dataIndex: 'service_path',
      key: 'service_path',
      align: 'center',
      render: (res, record) => {
        return (
          <Tooltip title={record.service_class}>
            <span className={publicStyle.textLink}>{getClassName(record.service_class)}</span>
          </Tooltip>
        );
      },
    },
    {
      title: '代理模式',
      dataIndex: 'is_static_service',
      key: 'is_static_service',
      align: 'center',
      render: (res, record) => {
        if (record.is_static_service) {
          return <span className={publicStyle.textOrange}>静态</span>;
        }
        return <span className={publicStyle.textGreen}>门面</span>;
      },
    },
    {
      title: '逻辑方法',
      dataIndex: 'actions',
      key: 'actions',
      align: 'center',
      render: (res: any, record) => {
        return (
          <Link
            to={{
              pathname: PathName.actions.list,
              search: `?controller_id=${record.id}`,
            }}
          >
            {record.actions.length > 0 ? (
              <Popover
                overlayStyle={{ width: '400px' }}
                placement="top"
                title={`控制器【${record.controller_title}】的逻辑方法`}
                content={
                  <Space direction="vertical" style={{ width: '100%' }}>
                    {record.actions.length > 0 &&
                      (record.actions as Array<API.ActionItemWithAppends>).map((action) => {
                        return (
                          <Row key={action.action_name}>
                            <Col span={6}>{action.request_method_text}</Col>
                            <Col span={9}>{action.action_name}</Col>
                            <Col span={9}>{action.action_title}</Col>
                          </Row>
                        );
                      })}
                  </Space>
                }
              >
                <span className={publicStyle.textLink}>{record.actions.length}个</span>
              </Popover>
            ) : (
              <EmptyText title="未同步" />
            )}
          </Link>
        );
      },
    },
    {
      title: '异常信息',
      dataIndex: 'exception_key',
      key: 'exception_key',
      align: 'center',
      render: (res, record) => {
        if (record.path_id === 0) {
          return <EmptyText title="--" />;
        }
        return (
          <Popover
            overlayStyle={{ maxWidth: '400px' }}
            title={`控制器【${record.module.module_title} - ${record.controller_title}】的基础异常信息`}
            content={
              <Descriptions column={1}>
                <Descriptions.Item label="异常码">{record.exception_code}</Descriptions.Item>
                <Descriptions.Item label="异常KEY">{record.exception_key}</Descriptions.Item>
                <Descriptions.Item label="异常MSG">{record.exception_msg}</Descriptions.Item>
              </Descriptions>
            }
          >
            <Text type="danger">{record.exception_code}</Text>
          </Popover>
        );
      },
    },
    {
      title: '创建方式',
      dataIndex: 'created_by_huike',
      key: 'created_by_huike',
      align: 'center',
      render: (res, record) => {
        return record.created_by_huike ? (
          <span className={publicStyle.textOrange}>系统</span>
        ) : (
          <span>手动</span>
        );
      },
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
      render: (res: any, record) => {
        return record.creator.username;
      },
    },
    {
      title: '更新时间',
      dataIndex: 'update_time',
      key: 'update_time',
      align: 'center',
      render: (res, record) => {
        return <SmartTime unixTimeStamp={record.update_time} />;
      },
    },
    {
      title: '管理',
      dataIndex: 'x',
      key: 'x',
      render: (res, record) => {
        return (
          <Space>
            <Button
              className={publicStyle.btnOutline}
              onClick={() => {
                setControllerData(record);
                setShowEditModal(true);
              }}
              icon={<EditOutlined />}
            />
            {record.is_static_service ? null : (
              <Popconfirm
                title="是否确认更新服务门面"
                onConfirm={() => updateFacadeSubmit({ controller_id: record.id })}
              >
                <Tooltip title="更新服务门面">
                  <Button
                    loading={updateFacadeSubmitting}
                    className={publicStyle.btnGenerateOutline}
                    icon={<ReloadOutlined />}
                  />
                </Tooltip>
              </Popconfirm>
            )}

            <Button
              className={publicStyle.btnWarningOutline}
              icon={<DeleteOutlined />}
              onClick={() => {
                setControllerData(record);
                setShowDeleteModal(true);
              }}
            />
          </Space>
        );
      },
    },
  ];

  const showControllerDeleteModal = () => {
    if (controllerData === null || !showDeleteModal) {
      return null;
    }
    return (
      <ControllerDelete
        controller={controllerData}
        visible={showDeleteModal}
        submitting={submitting}
        onSubmit={async (values) => {
          controllerDeleteSubmit(values).then(() => {
            setShowDeleteModal(false);
            refresh();
          });
        }}
        onClose={() => setShowDeleteModal(false)}
      />
    );
  };

  const showControllerEditModal = () => {
    if (controllerData === null || !showEditModal) {
      return null;
    }
    return (
      <ControllerEdit
        controller={controllerData}
        visible={showEditModal}
        submitting={submitting}
        onSubmit={async (values) => {
          controllerEditSubmit(values).then(() => {
            setShowEditModal(false);
            refresh();
          });
        }}
        onClose={() => setShowEditModal(false)}
      />
    );
  };
  return (
    <Space direction="vertical" size={15} style={{ width: '100%' }}>
      <Space size={10}>
        <Button type="primary" onClick={() => history.push(PathName.controllers.create)}>
          添加控制器
        </Button>
        <Button
          className={publicStyle.btnWarning}
          type="primary"
          onClick={() => history.push(PathName.controllers.sync)}
        >
          同步控制器
        </Button>
      </Space>

      <Table
        key="controllerList"
        columns={ControllerColumns}
        rowKey="id"
        {...tableProps}
        bordered
      />
      {showControllerEditModal()}
      {showControllerDeleteModal()}
    </Space>
  );
};

export default ControllerListTable;
