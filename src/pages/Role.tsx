import {
  Checkbox,
  Col,
  Modal,
  Popconfirm,
  Row,
  Table,
  Tabs,
  TabsProps,
} from 'antd';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import {
  PermissionModel,
  RoleDetailModel,
  RoleModel,
  UserModel,
} from '../models';
import { authService, permissionService, roleService } from '../services';
import { appStore } from '../stores';

const Role = () => {
  const [dataList, setDataList] = useState<RoleModel[]>([]);
  const [detailData, setDetailData] = useState<RoleDetailModel | undefined>();
  const [listUsers, setListUsers] = useState<UserModel[]>([]);
  const [permissionList, setPermissionList] = useState<PermissionModel[]>([]);
  const [createRoleName, setCreateRoleName] = useState('');

  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [openModalListUser, setOpenModalListUser] = useState(false);
  const [openModalCreateRole, setOpenModalCreateRole] = useState(false);

  useEffect(() => {
    getAllRoles();
  }, []);

  const getAllRoles = async () => {
    appStore.setLoading(true);
    const result = await roleService.getAllRole();
    appStore.setLoading(false);

    if (result?.isSuccess && result.data) {
      setDataList(result.data);
    }
  };

  const getAllPermissions = async () => {
    appStore.setLoading(true);
    const result = await permissionService.getAll();
    appStore.setLoading(false);

    if (result?.isSuccess && result.data) {
      setPermissionList(result.data);
    }
  };

  const handleViewDetail = async (id: number) => {
    const result = await roleService.getRoleDetail(id);
    if (result?.isSuccess && result.data) {
      setDetailData(result.data);
      setOpenModalDetail(true);
      getAllPermissions();
    } else {
      setDetailData(undefined);
      appStore.setMessage({
        type: 'error',
        content: result?.message || 'Đã có lỗi xảy ra, vui lòng thử lại sau',
        timestamp: new Date().getMilliseconds(),
      });
    }
  };

  const handleDeleteRole = async (roleId: number) => {
    appStore.setLoading(true);
    const result = await roleService.deleteRole(roleId);
    appStore.setLoading(false);

    if (!result) {
      appStore.setMessage({
        type: 'error',
        content: 'Có lỗi xảy ra, vui lòng thử lại sau',
        timestamp: new Date().getMilliseconds(),
      });
      return;
    }

    if (result.isSuccess) {
      appStore.setMessage({
        type: 'success',
        content: result.message,
        timestamp: new Date().getMilliseconds(),
      });
      getAllRoles();
    } else {
      appStore.setMessage({
        type: 'error',
        content: result.message,
        timestamp: new Date().getMilliseconds(),
      });
    }
  };

  const removeRoleToUser = async (
    userId: number,
    roleName: string | undefined,
  ) => {
    if (typeof roleName !== 'string') {
      return;
    }

    appStore.setLoading(true);
    const result = await roleService.removeRoleToUser(userId, roleName);
    appStore.setLoading(false);

    if (!result) {
      appStore.setMessage({
        type: 'error',
        content: 'Có lỗi xảy ra, vui lòng thử lại sau',
        timestamp: new Date().getMilliseconds(),
      });
      return;
    }

    if (result.isSuccess) {
      appStore.setMessage({
        type: 'success',
        content: result.message,
        timestamp: new Date().getMilliseconds(),
      });
      handleViewDetail(detailData!.id);
    } else {
      appStore.setMessage({
        type: 'error',
        content: result.message,
        timestamp: new Date().getMilliseconds(),
      });
    }
  };

  const assignRoleToUser = async (
    userId: number,
    roleName: string | undefined,
  ) => {
    if (typeof roleName !== 'string') {
      return;
    }

    appStore.setLoading(true);
    const result = await roleService.assignRoleToUser(userId, roleName);
    appStore.setLoading(false);

    if (!result) {
      appStore.setMessage({
        type: 'error',
        content: 'Có lỗi xảy ra, vui lòng thử lại sau',
        timestamp: new Date().getMilliseconds(),
      });
      return;
    }

    if (result.isSuccess) {
      appStore.setMessage({
        type: 'success',
        content: result.message,
        timestamp: new Date().getMilliseconds(),
      });
      handleViewDetail(detailData!.id);
      setOpenModalListUser(false);
    } else {
      appStore.setMessage({
        type: 'error',
        content: result.message,
        timestamp: new Date().getMilliseconds(),
      });
    }
  };

  const handleGiveOrRevokePermissionToRole = async (permissionName: string) => {
    // Tìm xem role này có permission chưa
    const permissionFind = detailData!.permission.findIndex(
      (e) => e.name === permissionName,
    );
    appStore.setLoading(true);
    if (permissionFind > -1) {
      await roleService.revokePermissionToRole(detailData!.id, permissionName);
    } else {
      await roleService.givePermissionToRole(detailData!.id, permissionName);
    }

    handleViewDetail(detailData!.id);
  };

  const handleCreateRole = async () => {
    if (!createRoleName.trim()) {
      appStore.setMessage({
        type: 'error',
        content: 'Không được để trống thông tin',
        timestamp: new Date().getMilliseconds(),
      });
      return;
    }
    appStore.setLoading(true);
    const result = await roleService.create(createRoleName);
    appStore.setLoading(false);

    if (!result) {
      appStore.setMessage({
        type: 'error',
        content: 'Có lỗi xảy ra, vui lòng thử lại sau',
        timestamp: new Date().getMilliseconds(),
      });
      return;
    }

    if (result.isSuccess) {
      appStore.setMessage({
        type: 'success',
        content: result.message,
        timestamp: new Date().getMilliseconds(),
      });
      getAllRoles();
      setOpenModalCreateRole(false);
      setCreateRoleName('');
    } else {
      appStore.setMessage({
        type: 'error',
        content: result.message,
        timestamp: new Date().getMilliseconds(),
      });
    }
  };

  const getListUser = async () => {
    appStore.setLoading(true);
    const result = await authService.all();
    appStore.setLoading(false);

    if (!result) {
      appStore.setMessage({
        type: 'error',
        content: 'Có lỗi xảy ra, vui lòng thử lại sau',
        timestamp: new Date().getMilliseconds(),
      });
      return;
    }

    setListUsers(result.data);
    setOpenModalListUser(true);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Người dùng trong nhóm',
      children: (
        <>
          <div className="text-right">
            <button
              onClick={getListUser}
              className="font-medium px-6 py-3 rounded-md bg-primary hover:bg-opacity-90 text-white"
            >
              Thêm người dùng vào nhóm
            </button>
          </div>
          <Table
            dataSource={detailData?.users}
            columns={[
              {
                title: 'Họ đệm',
                dataIndex: 'firstName',
                key: 'firstName',
              },
              {
                title: 'Tên',
                dataIndex: 'lastName',
                key: 'lastName',
              },
              {
                title: 'Tài khoản',
                dataIndex: 'username',
                key: 'username',
              },
              {
                title: 'Action',
                key: 'id',
                render: (_, record) => (
                  <>
                    {appStore.currentUser?.permissions.includes(
                      'capnhatvaitro',
                    ) && (
                      <Popconfirm
                        title="Cảnh báo"
                        description="Bạn chắc chắn muốn xóa?"
                        onConfirm={() =>
                          removeRoleToUser(record.id, detailData?.name)
                        }
                        okButtonProps={{
                          danger: true,
                        }}
                      >
                        <button className="py-2 px-4 bg-meta-1 text-white rounded-md hover:bg-opacity-80">
                          Xóa khỏi nhóm
                        </button>
                      </Popconfirm>
                    )}
                  </>
                ),
              },
            ]}
          />
        </>
      ),
    },
    {
      key: '2',
      label: 'Phân quyền',
      children: (
        <Row>
          {permissionList.map((item, index) => (
            <Col span={8}>
              <Checkbox
                key={index}
                checked={
                  detailData!.permission.findIndex(
                    (e) => e.name === item.name,
                  ) > -1
                }
                onChange={() => handleGiveOrRevokePermissionToRole(item.name)}
                disabled={
                  !appStore.currentUser?.permissions.includes('capnhatvaitro') &&
                  !appStore.currentUser?.permissions.includes(
                    'xoaquyen',
                  )
                }
              >
                {item.name}
              </Checkbox>
            </Col>
          ))}
        </Row>
      ),
    },
  ];

  return (
    <>
      <Breadcrumb pageName="Nhóm người dùng" />

      <div className="text-right">
        {appStore.currentUser?.permissions.includes('taovaitro') && (
          <button
            onClick={() => setOpenModalCreateRole(true)}
            className="px-6 py-3 bg-meta-3 text-white my-2 rounded-md font-medium"
          >
            Thêm mới
          </button>
        )}
      </div>

      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <Table
            dataSource={dataList}
            columns={[
              {
                title: '#',
                dataIndex: 'index',
                key: 'index',
                render: (_, __, index) => {
                  ++index;
                  return index;
                },
              },
              {
                title: 'Tên nhóm',
                dataIndex: 'name',
                key: 'name',
              },
              {
                title: 'Ngày tạo',
                dataIndex: 'created_at',
                key: 'created_at',
                render: (_, record) =>
                  moment(record.created_at).format('DD/MM/YYYY HH:mm A'),
              },
              {
                title: 'Thao tác',
                dataIndex: 'id',
                key: 'id',
                render: (_, record) => (
                  <>
                    <button
                      onClick={() => handleViewDetail(record.id)}
                      className="rounded bg-primary p-3 font-medium text-gray"
                    >
                      Cấu hình
                    </button>

                    {appStore.currentUser?.permissions.includes(
                      'xoavaitro',
                    ) && (
                      <Popconfirm
                        title="Cảnh báo"
                        description="Bạn chắc chắn muốn xóa?"
                        onConfirm={() => handleDeleteRole(record.id)}
                        okButtonProps={{
                          danger: true,
                        }}
                      >
                        <button className="rounded bg-meta-1 mx-2 p-3 font-medium text-gray">
                          Xóa
                        </button>
                      </Popconfirm>
                    )}
                  </>
                ),
              },
            ]}
          />
        </div>
      </div>

      <Modal
        open={openModalDetail}
        footer={null}
        onCancel={() => setOpenModalDetail(false)}
        width={'50%'}
      >
        <Tabs defaultActiveKey="1" items={items} onChange={() => {}} />
      </Modal>

      <Modal
        open={openModalCreateRole}
        footer={null}
        onCancel={() => setOpenModalCreateRole(false)}
        width={'50%'}
      >
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Thêm mới nhóm người dùng
        </h4>

        <div>
          <label className="mb-3 block text-black dark:text-white font-bold">
            Nhập tên nhóm
          </label>
          <input
            value={createRoleName}
            onChange={(e) => setCreateRoleName(e.target.value)}
            type="text"
            placeholder="Tên nhóm"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition min-h-[48px] focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>

        <button
          onClick={handleCreateRole}
          className="px-6 py-3 bg-primary text-white rounded-md mt-4 font-medium"
        >
          Thêm mới
        </button>
      </Modal>

      <Modal
        open={openModalListUser}
        footer={null}
        onCancel={() => setOpenModalListUser(false)}
      >
        <Table
          dataSource={listUsers}
          columns={[
            {
              title: 'Họ đệm',
              dataIndex: 'firstName',
              key: 'firstName',
            },
            {
              title: 'Tên',
              dataIndex: 'lastName',
              key: 'lastName',
            },
            {
              title: 'Tài khoản',
              dataIndex: 'username',
              key: 'username',
            },
            {
              title: 'Thao tác',
              key: 'id',
              render: (_, record) =>
                record.roles.includes(detailData!.name) ? null : (
                  <button
                    onClick={() =>
                      assignRoleToUser(record.id, detailData?.name)
                    }
                    className="py-2 px-4 bg-meta-3 text-white rounded-md hover:bg-opacity-80"
                  >
                    Thêm vào nhóm
                  </button>
                ),
            },
          ]}
        />
      </Modal>
    </>
  );
};

export default observer(Role);
