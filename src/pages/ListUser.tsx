import { Modal, Popconfirm, Table, Tag } from 'antd';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { UserModel } from '../models';
import { authService } from '../services';
import { appStore } from '../stores';

const ListUser = () => {
  const [dataList, setDataList] = useState<UserModel[]>([]);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [createUserFirstName, setCreateUserFirstName] = useState('');
  const [createUserLastName, setCreateUserLastName] = useState('');
  const [createUsername, setCreateUsername] = useState('');
  const [createUserPassword, setCreateUserPassword] = useState('');

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
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

  const handleCreate = async () => {
    if (!createUserFirstName || !createUserPassword || !createUsername) {
      appStore.setMessage({
        type: 'error',
        content: 'Vui lòng điền đầy đủ thông tin',
        timestamp: new Date().getMilliseconds(),
      });
      return;
    }

    appStore.setLoading(true);
    const result = await authService.create(
      createUserFirstName,
      createUserLastName,
      createUsername,
      createUserPassword,
    );
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
      setCreateUserFirstName('');
      setCreateUsername('');
      setCreateUserPassword('');
      setOpenModalCreate(false);
      getAllUsers();
    } else {
      appStore.setMessage({
        type: 'error',
        content: result.message,
        timestamp: new Date().getMilliseconds(),
      });
    }
  };

  const handleLockUser = async (id: number) => {
    appStore.setLoading(true);
    const result = await authService.lockUser(id);
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
      getAllUsers();
    } else {
      appStore.setMessage({
        type: 'error',
        content: result.message,
        timestamp: new Date().getMilliseconds(),
      });
    }
  };

  const handleUnlockUser = async (id: number) => {
    appStore.setLoading(true);
    const result = await authService.unlockUser(id);
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
      getAllUsers();
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
      <Breadcrumb pageName="Quản lý Nhân viên" />

      <div className="text-right">
        {appStore.currentUser?.permissions.includes('taonguoidung') && (
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
              title: 'Họ tên',
              dataIndex: 'firstName',
              key: 'firstName',
              render: (_, record) => record.firstName + ' ' + record.lastName,
            },
            {
              title: 'Tài khoản',
              dataIndex: 'username',
              key: 'username',
            },
            {
              title: 'Trạng thái',
              dataIndex: 'active',
              key: 'index',
              render: (_, record) => (
                <>
                  {record.active ? (
                    <Tag bordered={false} color="success">
                      Hoạt động
                    </Tag>
                  ) : (
                    <Tag bordered={false} color="error">
                      Khóa
                    </Tag>
                  )}
                </>
              ),
            },
            {
              title: 'Thao tác',
              dataIndex: 'id',
              key: 'id',
              render: (_, record) => (
                <>
                  {record.username.includes('sysadmin')
                    ? null
                    : appStore.currentUser?.permissions.includes(
                        'blocknguoidung',
                      ) && (
                        <>
                          {!record.active ? (
                            <button
                              onClick={() => handleUnlockUser(record.id)}
                              className="rounded bg-meta-3 mx-2 p-3 font-medium text-gray"
                            >
                              Mở khóa
                            </button>
                          ) : (
                            <Popconfirm
                              title="Cảnh báo"
                              description="Bạn chắc chắn muốn khóa?"
                              onConfirm={() => handleLockUser(record.id)}
                              okButtonProps={{
                                danger: true,
                              }}
                            >
                              <button className="rounded bg-meta-1 mx-2 p-3 font-medium text-gray">
                                Khóa tài khoản
                              </button>
                            </Popconfirm>
                          )}
                        </>
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
          Thêm mới Nhân viên
        </h4>

        <div>
          <label className="mb-3 mt-5 block text-black dark:text-white font-bold">
            Nhập họ đệm
          </label>
          <input
            value={createUserFirstName}
            onChange={(e) => setCreateUserFirstName(e.target.value)}
            type="text"
            placeholder="Tên nhân viên"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition min-h-[48px] focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-3 mt-5 block text-black dark:text-white font-bold">
            Nhập tên
          </label>
          <input
            value={createUserLastName}
            onChange={(e) => setCreateUserLastName(e.target.value)}
            type="text"
            placeholder="Tên nhân viên"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition min-h-[48px] focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-3 mt-5 block text-black dark:text-white font-bold">
            Nhập tài khoản
          </label>
          <input
            value={createUsername}
            onChange={(e) => setCreateUsername(e.target.value)}
            type="text"
            placeholder="Tên đăng nhập"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition min-h-[48px] focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-3 mt-5 block text-black dark:text-white font-bold">
            Nhập mật khẩu
          </label>
          <input
            value={createUserPassword}
            onChange={(e) => setCreateUserPassword(e.target.value)}
            type="password"
            placeholder="Tên nhân viên"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition min-h-[48px] focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>

        <button
          onClick={handleCreate}
          className="px-6 py-3 bg-primary text-white rounded-md mt-4 font-medium"
        >
          Thêm mới
        </button>
      </Modal>
    </>
  );
};

export default observer(ListUser);
