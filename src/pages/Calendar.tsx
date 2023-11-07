import { Col, DatePicker, Row, Select, Table } from 'antd';
import { Dayjs } from 'dayjs';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { StoreModel, UserModel } from '../models';
import { authService, storeService } from '../services';
import { appStore } from '../stores';

const Calendar = () => {
  const [listUsers, setListUsers] = useState<UserModel[]>([]);
  const [listStore, setListStore] = useState<StoreModel[]>([]);

  const [storeCode, setStoreCode] = useState('');
  const [storeSelected, setStoreSelected] = useState<string[]>([]);
  const [storeSelectedId, setStoreSelectedId] = useState<number[]>([]);
  const [calendar, setCalendar] = useState<Dayjs | null>(null);
  const [userId, setUserId] = useState(-1);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    appStore.setLoading(true);
    const result = await authService.all();
    appStore.setLoading(false);

    if (result && result.isSuccess) {
      setListUsers(result.data.filter((e) => e.username !== 'sysadmin'));
    } else {
      appStore.setMessage({
        type: 'error',
        content: result?.message || 'Lỗi khi lấy danh sách nhân viên',
        timestamp: new Date().getMilliseconds(),
      });
    }
  };

  const handleSearchStore = async () => {
    appStore.setLoading(true);
    const result = await storeService.searchStore({
      storeCode,
    });
    appStore.setLoading(false);

    if (result && result.isSuccess) {
      const newList = [...result.data, ...listStore];
      const uniqueArray = Array.from(
        new Map(newList.map((item) => [item.id, item])).values(),
      );
      setListStore(uniqueArray);
    } else {
      appStore.setMessage({
        type: 'error',
        content: result?.message || 'Lỗi khi lấy danh sách nhân viên',
        timestamp: new Date().getMilliseconds(),
      });
    }
  };

  const handleCreateCalendar = async () => {
    if (storeSelected.length == 0) {
      appStore.setMessage({
        type: 'error',
        content: 'Chưa chọn cửa hàng',
        timestamp: new Date().getMilliseconds(),
      });
      return;
    }

    if (calendar == null) {
      appStore.setMessage({
        type: 'error',
        content: 'Chưa chọn ngày làm việc',
        timestamp: new Date().getMilliseconds(),
      });
      return;
    }

    if (userId == -1) {
      appStore.setMessage({
        type: 'error',
        content: 'Chưa chọn nhân viên',
        timestamp: new Date().getMilliseconds(),
      });
      return;
    }

    appStore.setLoading(true);
    const result = await storeService.createCalendar(
      storeSelected,
      calendar,
      userId,
    );

    if (result) {
      if (result.isSuccess) {
        appStore.setMessage({
          type: 'success',
          content: 'Tạo thành công!',
          timestamp: new Date().getMilliseconds(),
        });

        setStoreCode('');
        setStoreSelected([]);
        setStoreSelectedId([]);
        setCalendar(null);
        setUserId(-1);
        setListStore([]);
      } else {
        appStore.setMessage({
          type: 'error',
          content: result.message,
          timestamp: new Date().getMilliseconds(),
        });
      }
    } else {
      appStore.setMessage({
        type: 'error',
        content: 'Có lỗi xảy ra',
        timestamp: new Date().getMilliseconds(),
      });
    }

    appStore.setLoading(false);
  };

  return (
    <>
      <Breadcrumb pageName="Phân quyền lịch làm việc" />

      <div className="bg-white mb-5 py-3 px-6">
        <Row gutter={10}>
          <Col span={6}>
            <label className="mb-3 mt-5 block text-black dark:text-white font-bold">
              Mã cửa hàng
            </label>

            <input
              value={storeCode}
              onChange={(e) => setStoreCode(e.target.value)}
              type="text"
              placeholder="Mã cửa hàng"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition min-h-[48px] focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />

            <button
              onClick={handleSearchStore}
              className="px-4 py-3 bg-primary text-white rounded-md my-3"
            >
              Tìm cửa hàng
            </button>

            <button
              onClick={handleCreateCalendar}
              className="px-4 py-3 bg-success text-white rounded-md my-3 ml-4"
            >
              Tạo ghé thăm
            </button>
          </Col>

          <Col span={6}>
            <label className="mb-3 mt-5 block text-black dark:text-white font-bold">
              Ngày làm việc
            </label>

            <DatePicker
              style={{ width: '100%', height: 48 }}
              value={calendar}
              format={'DD/MM/YYYY'}
              onChange={setCalendar}
            />
          </Col>

          <Col span={6}>
            <label className="mb-3 mt-5 block text-black dark:text-white font-bold">
              Nhân viên
            </label>

            <Select
              defaultValue={userId}
              value={userId}
              style={{ width: '100%', height: 48 }}
              onChange={setUserId}
              options={[
                { value: -1, label: 'Chưa chọn' },
                ...listUsers.map((item) => ({
                  label: item.firstName + ' ' + item.lastName,
                  value: item.id,
                })),
              ]}
            />
          </Col>
        </Row>

        {listStore.length > 0 && (
          <>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setStoreSelected([]);
                  setStoreSelectedId([]);
                }}
                className="px-4 hover:bg-opacity-90 py-3 bg-danger text-white rounded-md my-3"
              >
                Bỏ chọn tất cả
              </button>

              <button
                onClick={() => {
                  setStoreSelected([...listStore.map((e) => e.storeCode)]);
                  setStoreSelectedId([...listStore.map((e) => e.id)]);
                }}
                className="px-4 hover:bg-opacity-90 py-3 bg-primary text-white rounded-md my-3 ml-2"
              >
                Chọn tất cả
              </button>
            </div>

            <Table
              dataSource={listStore}
              columns={[
                {
                  title: '#',
                  dataIndex: 'id',
                  key: 'id',
                  align: 'center',
                  width: 100,
                  render: (_, __, index) => {
                    ++index;
                    return index;
                  },
                },
                {
                  key: 'id',
                  title: 'Mã cửa hàng',
                  dataIndex: 'storeName',
                  width: 200,
                  render: (_, record) => record.storeCode,
                },
                {
                  key: 'id',
                  title: 'Tên cửa hàng',
                  dataIndex: 'storeName',
                  width: 200,
                  render: (_, record) => record.storeName,
                },
                {
                  key: 'id',
                  title: 'Chủ cửa hàng',
                  dataIndex: 'contactName',
                  width: 200,
                },
                {
                  key: 'id',
                  title: 'Địa chỉ',
                  dataIndex: 'address',
                  width: 200,
                },
                {
                  key: 'id',
                  title: 'Tỉnh thành',
                  dataIndex: 'provinceName',
                  width: 200,
                },
                {
                  key: 'id',
                  title: 'Quận huyện',
                  dataIndex: 'districName',
                  width: 200,
                },
                {
                  title: 'Thao tác',
                  width: 200,
                  fixed: 'right',
                  dataIndex: 'address',
                  render: (_, record) => (
                    <>
                      {!storeSelectedId.includes(record.id) ? (
                        <button
                          onClick={() => {
                            setStoreSelected([
                              ...storeSelected,
                              record.storeCode,
                            ]);
                            setStoreSelectedId([...storeSelectedId, record.id]);
                          }}
                          className="px-4 py-3 bg-primary text-white rounded-md my-3"
                        >
                          Chọn
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setStoreSelected([
                              ...storeSelected.filter(
                                (e) => e != record.storeCode,
                              ),
                            ]);
                            setStoreSelectedId([
                              ...storeSelectedId.filter((e) => e != record.id),
                            ]);
                          }}
                          className="px-4 py-3 bg-meta-1 text-white rounded-md my-3"
                        >
                          Bỏ chọn
                        </button>
                      )}
                    </>
                  ),
                },
              ]}
            />
          </>
        )}
      </div>
    </>
  );
};

export default observer(Calendar);
