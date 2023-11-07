import { observer } from 'mobx-react-lite';
import { appStore } from '../stores';
import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { Modal, Popconfirm, Table } from 'antd';
import { PermissionModel } from '../models';
import { permissionService } from '../services';
import moment from 'moment';

const Permission = () => {
  const [dataList, setDataList] = useState<PermissionModel[]>([]);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [createPermissionName, setCreatePermissionName] = useState('');

  useEffect(() => {
    getAllPermissions();
  }, []);

  const getAllPermissions = async () => {
    appStore.setLoading(true);
    const result = await permissionService.getAll();
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
      setDataList(result.data);
    } else {
      appStore.setMessage({
        type: 'error',
        content: result.message,
        timestamp: new Date().getMilliseconds(),
      });
    }
  };

  const handleCreatePermisson = async () => {
    if (!createPermissionName) {
      appStore.setMessage({
        type: 'error',
        content: 'Vui lòng điền đầy đủ thông tin',
        timestamp: new Date().getMilliseconds(),
      });
      return;
    }

    appStore.setLoading(true);
    const result = await permissionService.create(createPermissionName);
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
      setCreatePermissionName('');
      setOpenModalCreate(false);
      getAllPermissions();
    } else {
      appStore.setMessage({
        type: 'error',
        content: result.message,
        timestamp: new Date().getMilliseconds(),
      });
    }
  };

  const handleDeletePermission = async (id: number) => {
    appStore.setLoading(true);
    const result = await permissionService.deletePermission(id);
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
      getAllPermissions();
    } else {
      appStore.setMessage({
        type: 'error',
        content: result.message,
        timestamp: new Date().getMilliseconds(),
      });
    }
  };

  return (
    <>
      <Breadcrumb pageName="Quản lý quyền" />

      <div className="text-right">
        {appStore.currentUser?.permissions.includes('taophanquyen') && (
          <button
            onClick={() => setOpenModalCreate(true)}
            className="px-6 py-3 bg-meta-3 text-white my-2 rounded-md font-medium"
          >
            Thêm mới
          </button>
        )}
      </div>

      <div className="flex flex-col gap-10">
        <Table
          dataSource={dataList}
          columns={[
            {
              title: '#',
              dataIndex: 'id',
              key: 'id',
              render: (_, __, index) => {
                ++index;
                return index;
              },
            },
            {
              title: 'Tên quyền',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'Nhóm chức năng',
              dataIndex: 'guard_name',
              key: 'guard_name',
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
                  {appStore.currentUser?.permissions.includes(
                    'xoaphanquyen',
                  ) && (
                    <Popconfirm
                      title="Cảnh báo"
                      description="Bạn chắc chắn muốn xóa?"
                      onConfirm={() => handleDeletePermission(record.id)}
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

      <Modal
        open={openModalCreate}
        footer={null}
        onCancel={() => setOpenModalCreate(false)}
        width={'50%'}
      >
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Thêm mới quyền
        </h4>

        <div>
          <label className="mb-3 mt-5 block text-black dark:text-white font-bold">
            Nhập tên quyền
          </label>
          <input
            value={createPermissionName}
            onChange={(e) => setCreatePermissionName(e.target.value)}
            type="text"
            placeholder="Tên quyền"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition min-h-[48px] focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>

        <button
          onClick={handleCreatePermisson}
          className="px-6 py-3 bg-primary text-white rounded-md mt-4 font-medium"
        >
          Thêm mới
        </button>
      </Modal>
    </>
  );
};

export default observer(Permission);
