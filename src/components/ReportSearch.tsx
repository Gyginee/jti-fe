import { Col, DatePicker, Row, Select } from 'antd';
import dayjs from 'dayjs';
import { observer } from 'mobx-react-lite';
import { RangeValue } from 'rc-picker/lib/interface';
import { useEffect, useState } from 'react';
import { IdNameModel, ResponseModel, StoreModel, UserModel } from '../models';
import { StoreSearchParams } from '../models/StoreModel';
import { apiClient, authService, storeService } from '../services';
import { appStore } from '../stores';
import FormInput from './FormInput';
import {exportToExcel} from './ExportExcel';

type ScreenProps = {
  setData: (result: StoreModel[]) => void;
};

const { RangePicker } = DatePicker;

const StoreSearch = ({ setData }: ScreenProps) => {
  const [listProvinces, setListProvinces] = useState<IdNameModel[]>([]);
  const [listDistrics, setListDistrics] = useState<IdNameModel[]>([]);
  const [listUsers, setListUsers] = useState<UserModel[]>([]);
  const [storeStatusList, setStoreStatusList] = useState<IdNameModel[]>([]);

  const [searchParams, setSearchParams] = useState<StoreSearchParams>({
    storeCode: '',
    storeName: '',
    provinceId: -1,
    districtId: -1,
    address: '',
    statusCode: '',
    contactName: '',
    phoneNumber: '',
    userId: -1,
    fromDate: null,
    toDate: null,
    reward: false,
    isDone: false,
  });

  useEffect(() => {
    getAllProvinces();
    getAllStoreStatus();
    getAllUsers();
  }, []);

  const getAllStoreStatus = async () => {
    appStore.setLoading(true);
    const result = await storeService.getAllStatus();
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
      setStoreStatusList(result.data);
    } else {
      appStore.setMessage({
        type: 'error',
        content: result.message,
        timestamp: new Date().getMilliseconds(),
      });
    }
  };

  const getAllProvinces = async () => {
    const result = await apiClient.get<ResponseModel<IdNameModel[], null>>(
      'location/allProvinces',
    );

    if (result && result.isSuccess) {
      setListProvinces(result.data);
    }
  };

  const getAllDistrictsByProvince = async (provinceId: number) => {
    const result = await apiClient.get<ResponseModel<IdNameModel[], null>>(
      '/location/districtsByProvinceId/' + provinceId,
    );

    if (result && result.isSuccess) {
      setListDistrics(result.data);
    }
  };
  
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
      setListUsers(result.data.filter((e) => e.username !== 'sysadmin'));
    } else {
      appStore.setMessage({
        type: 'error',
        content: result.message,
        timestamp: new Date().getMilliseconds(),
      });
    }
  };

  const handleSearch = async () => {
    appStore.setLoading(true);
    let result = null;

    result = await storeService.filterReport(searchParams);

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
      setData(result.data);
    } else {
      appStore.setMessage({
        type: 'error',
        content: result.message,
        timestamp: new Date().getMilliseconds(),
      });
    }
  };
  //Export Excel
const handleExport = async () => {
  appStore.setLoading(true);

  try {
    let result = await storeService.filterReport(searchParams);

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
      const jsonData = result.data;

      if (jsonData && jsonData.length > 0) {
        const headerMapping = {
          id: "ID cửa hàng",
          storeCode: 'Mã cửa hàng',
          storeName: 'Tên cửa hàng',
          address: 'Địa chỉ',
          provinceName: 'Thành phố',
          districName: 'Quận/Huyện',
          userId: 'Mã nhân viên',
          'userFirstName.userLastName': 'Tên nhân viên',
          updated_at: "Ngày audit",
          'lat': 'Latitude',
          'long': 'Longitude',
          'checkin': 'Checkin Time',
          'checkout': 'Checkout Time',
        };

        const updatedData = [];

        for (const item of jsonData) {
          let lat = null;
          let long = null;
          let checkin = null;
          let checkout = null;

          const response = await storeService.getAllImagesByStoreId(item.id);

          if (response && response.data) {
            const images = response.data;

            for (const image of images) {
              if (image.typeCode === 'check_out') {
                lat = image.lat;
                long = image.long;
                checkout = image.updated_at;
              }
              if (image.typeCode === 'check_in') {
                checkin = image.updated_at;
              }
            }
          }

          updatedData.push({
            ...item,
            'userFirstName.userLastName': item.userFirstName + ' ' + item.userLastName,
            'lat': lat,
            'long': long,
            'checkin': checkin,
            'checkout': checkout,
          });
        }

        // Assuming exportToExcel creates the Excel file - You might want to use a specific library for this purpose
        exportToExcel('Report', updatedData, headerMapping);
      } else {
        appStore.setMessage({
          type: 'error',
          content: 'Không có dữ liệu',
          timestamp: new Date().getMilliseconds(),
        });
        return;
      }
    } else {
      appStore.setMessage({
        type: 'error',
        content: result.message,
        timestamp: new Date().getMilliseconds(),
      });
    }
  } catch (error) {
    // Handle errors here
    console.error(error);
    appStore.setMessage({
      type: 'error',
      content: 'Error occurred while exporting data',
      timestamp: new Date().getMilliseconds(),
    });
  }
};
  const onChangeDate = (values: RangeValue<dayjs.Dayjs>) => {
    if (values && values.length === 2) {
      setSearchParams({
        ...searchParams,
        fromDate: values[0]?.toDate() || null,
        toDate: values[1]?.toDate() || null,
      });
    } else {
      setSearchParams({
        ...searchParams,
        fromDate: null,
        toDate: null,
      });
    }
  };

  return (
    <div className="bg-white mb-5 py-3 px-6">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <FormInput
            label="Mã cửa hàng"
            value={searchParams.storeCode}
            onChange={(e) =>
              setSearchParams({ ...searchParams, storeCode: e.target.value })
            }
          />
        </Col>

        <Col xs={24} md={12}>
          <FormInput
            label="Tên cửa hàng"
            value={searchParams.storeName}
            onChange={(e) =>
              setSearchParams({ ...searchParams, storeName: e.target.value })
            }
          />
        </Col>

        <Col xs={24} md={12}>
          <label className="my-3 block text-black dark:text-white font-bold">
            Trạng thái
          </label>
          <Select
            defaultValue={searchParams.statusCode}
            value={searchParams.statusCode}
            style={{ width: '100%', height: 48 }}
            onChange={(e) => {
              setSearchParams({
                ...searchParams,
                statusCode: e,
              });
            }}
            options={[
              { value: '', label: 'Chưa chọn' },
              ...storeStatusList.map((item) => ({
                label: item.name,
                value: item.id,
              })),
            ]}
          />
        </Col>

        <Col xs={24} md={12}>
          <label className="my-3 block text-black dark:text-white font-bold">
            Nhân viên phụ trách
          </label>
          <Select
            defaultValue={searchParams.userId}
            value={searchParams.userId}
            style={{ width: '100%', height: 48 }}
            onChange={(e) => {
              setSearchParams({
                ...searchParams,
                userId: e,
              });
            }}
            options={[
              { value: -1, label: 'Chưa chọn' },
              ...listUsers.map((item) => ({
                label: item.firstName + ' ' + item.lastName,
                value: item.id,
              })),
            ]}
          />
        </Col>

        <Col xs={24} md={12}>
          <label className="my-3 block text-black dark:text-white font-bold">
            Tỉnh thành
          </label>
          <Select
            defaultValue={searchParams.provinceId}
            value={searchParams.provinceId}
            style={{ width: '100%', height: 48 }}
            onChange={(e) => {
              setSearchParams({
                ...searchParams,
                provinceId: e,
                districtId: -1,
              });
              getAllDistrictsByProvince(e);
            }}
            options={[
              { value: -1, label: 'Chưa chọn' },
              ...listProvinces.map((item) => ({
                label: item.name,
                value: item.id,
              })),
            ]}
          />
        </Col>

       {/*  <Col xs={24} md={12}>
          <FormInput
            label="Chủ cửa hàng"
            value={searchParams.contactName}
            onChange={(e) =>
              setSearchParams({ ...searchParams, contactName: e.target.value })
            }
          />
        </Col> */}

        <Col xs={24} md={12}>
          <label className="my-3 block text-black dark:text-white font-bold">
            Quận huyện
          </label>
          <Select
            defaultValue={searchParams.districtId}
            value={searchParams.districtId}
            style={{ width: '100%', height: 48 }}
            onChange={(e) => {
              setSearchParams({
                ...searchParams,
                districtId: e,
              });
            }}
            options={[
              { value: -1, label: 'Chưa chọn' },
              ...listDistrics.map((item) => ({
                label: item.name,
                value: item.id,
              })),
            ]}
          />
        </Col>

        <Col xs={24} md={12}>
          <FormInput
            label="Số điện thoại"
            value={searchParams.phoneNumber}
            onChange={(e) =>
              setSearchParams({ ...searchParams, phoneNumber: e.target.value })
            }
          />
        </Col>

        <Col xs={24} md={12}>
          <FormInput
            label="Địa chỉ"
            value={searchParams.address}
            onChange={(e) =>
              setSearchParams({ ...searchParams, address: e.target.value })
            }
          />
        </Col>

        <Col xs={24} md={12}>
          <label className="my-3 block text-black dark:text-white font-bold">
            Lịch
          </label>

          <RangePicker
            className="w-full h-[48px]"
            format={'DD/MM/YYYY'}
            onChange={(e) => onChangeDate(e)}
          />
        </Col>

        <Col xs={24} md={12}>
          {/* <label className="my-3 block text-black dark:text-white font-bold">
            Phần thưởng
            <Radio.Group
              className="ml-4"
              onChange={(e) =>
                setSearchParams({ ...searchParams, reward: e.target.value })
              }
              value={searchParams.reward}
            >
              <Radio value={true}>Có</Radio>
              <Radio value={false}>Không</Radio>
            </Radio.Group>
          </label>

          <label className="my-3 block text-black dark:text-white font-bold">
            Khảo sát
            <Radio.Group
              className="ml-4"
              onChange={(e) =>
                setSearchParams({ ...searchParams, isDone: e.target.value })
              }
              value={searchParams.isDone}
            >
              <Radio value={true}>Rồi</Radio>
              <Radio value={false}>Chưa</Radio>
            </Radio.Group>
          </label> */}
        </Col>
      </Row>

      <div className="text-center mt-5">
        <button
          className="bg-primary px-5 py-3 text-white rounded-md hover:bg-opacity-90"
          onClick={handleSearch}
        >
          Tìm kiếm
        </button>
        <button
          className="bg-gray mx-10 py-3 px-5 text-black rounded-md hover:bg-opacity-90"
          onClick={handleExport}
        >
          Export Excel
        </button>
      </div>
    </div>
  );
};

export default observer(StoreSearch);
