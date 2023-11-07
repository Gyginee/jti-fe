import {
  Col,
  Collapse,
  Image,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  Table,
  Tabs,
  Tag,
} from 'antd';
import axios from 'axios';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import ReportSearch from '../components/ReportSearch';
import {
  CreateStoreModel,
  IdNameModel,
  PposmByStore,
  PposmModel,
  ResponseModel,
  StoreModel,
  UserModel,
} from '../models';
import { StoreImageModel } from '../models/StoreModel';
import { WinnerModel } from '../models/WinnerModel';
import { apiClient, authService, storeService } from '../services';
import pposmService from '../services/pposm.service';
import { appStore } from '../stores';
import Constants from '../utils/constants';

const Report = () => {
  const [listProvinces, setListProvinces] = useState<IdNameModel[]>([]);
  const [listDistrics, setListDistrics] = useState<IdNameModel[]>([]);
  const [listUsers, setListUsers] = useState<UserModel[]>([]);
  const [storeStatusList, setStoreStatusList] = useState<IdNameModel[]>([]);
  const [dataList, setDataList] = useState<StoreModel[]>([]);

  const [listBanks, setListBanks] = useState<string[]>([]);
  const [listPposm, setListPposm] = useState<PposmModel[]>([]);
  const [pposmByStore, setPposmByStore] = useState<PposmByStore[]>([]);
  const [listImagesOfStore, setListImagesOfStore] = useState<StoreImageModel[]>(
    [],
  );

  const [storeSelectedId, setstoreSelectedId] = useState(-1);

  const [winnerInfo, setWinnerInfo] = useState<WinnerModel>({
    storeId: 0,
    winnerName: '',
    winnerBankName: '',
    winnerBankNumber: '',
    winnerRelationship: '',
  });

  const [openModalAddPPOSM, setOpenModalAddPPOSM] = useState(false);
  const [openModalPPOSM, setOpenModalPPOSM] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [createParams, setCreateParams] = useState<CreateStoreModel>({
    storeCode: '',
    storeName: '',
    provinceId: -1,
    districtId: -1,
    address: '',
    status: 'TC',
    contactName: '',
    phoneNumber: '',
    userId: -1,
    calendar: new Date(),
    reward: true,
    note: '',
    winnerName: '',
    winnerBankName: '',
    winnerBankNumber: '',
    lat: '',
    long: '',
  });

  useEffect(() => {
    getAllProvinces();
    // getAllStores();
    getAllStoreStatus();
    getAllUsers();
    getListBanks();
  }, []);

  const getListBanks = async () => {
    const result = await axios.get('https://api.vietqr.io/v2/banks');
    if (result.data) {
      const listBanks = result.data.data;
      setListBanks([
        ...listBanks.map((e: any) => e.name + ' - ' + e.shortName),
      ]);
    }
  };

  const getAllStores = async () => {
    appStore.setLoading(true);
    const result = await storeService.all();
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

  const handleCreate = async () => {
    if (
      !createParams.storeName.trim() ||
      createParams.provinceId == -1 ||
      createParams.districtId == -1 ||
      !createParams.address.trim() ||
      !createParams.status.trim() ||
      !createParams.contactName.trim() ||
      !createParams.phoneNumber.trim()
    ) {
      appStore.setMessage({
        type: 'error',
        content: 'Vui lòng điền đầy đủ thông tin',
        timestamp: new Date().getMilliseconds(),
      });
      return;
    }

    appStore.setLoading(true);
    const result = await storeService.create(createParams);
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

      setCreateParams({
        storeCode: '',
        storeName: '',
        provinceId: -1,
        districtId: -1,
        address: '',
        status: '',
        contactName: '',
        phoneNumber: '',
        userId: -1,
        calendar: new Date(),
        reward: true,
        note: '',
        winnerName: '',
        winnerBankName: '',
        winnerBankNumber: '',
        lat: '',
        long: '',
      });

      setOpenModalCreate(false);
      getAllStores();
    } else {
      appStore.setMessage({
        type: 'error',
        content: result.message,
        timestamp: new Date().getMilliseconds(),
      });
    }
  };

  // const handleUpdate = async () => {
  //   if (
  //     !createParams.storeName.trim() ||
  //     createParams.provinceId == -1 ||
  //     createParams.districtId == -1 ||
  //     !createParams.address.trim() ||
  //     !createParams.status.trim() ||
  //     !createParams.contactName.trim() ||
  //     !createParams.phoneNumber.trim()
  //   ) {
  //     appStore.setMessage({
  //       type: 'error',
  //       content: 'Vui lòng điền đầy đủ thông tin',
  //       timestamp: new Date().getMilliseconds(),
  //     });
  //     return;
  //   }

  //   appStore.setLoading(true);
  //   const result = await storeService.update(createParams, storeSelectedId);
  //   appStore.setLoading(false);

  //   if (!result) {
  //     appStore.setMessage({
  //       type: 'error',
  //       content: 'Có lỗi xảy ra, vui lòng thử lại sau',
  //       timestamp: new Date().getMilliseconds(),
  //     });
  //     return;
  //   }

  //   if (result.isSuccess) {
  //     appStore.setMessage({
  //       type: 'success',
  //       content: result.message,
  //       timestamp: new Date().getMilliseconds(),
  //     });

  //     setCreateParams({
  //       storeCode: '',
  //       storeName: '',
  //       provinceId: -1,
  //       districtId: -1,
  //       address: '',
  //       status: '',
  //       contactName: '',
  //       phoneNumber: '',
  //       userId: -1,
  //       calendar: new Date(),
  //       reward: true,
  //       note: '',
  //       winnerName: '',
  //       winnerBankName: '',
  //       winnerBankNumber: '',
  //       lat: '',
  //       long: '',
  //     });
  //     setWinnerInfo({
  //       storeId: 0,
  //       winnerName: '',
  //       winnerBankName: '',
  //       winnerBankNumber: '',
  //       winnerRelationship: '',
  //     });
  //     handleViewDetailStore(storeSelectedId, 'UPDATE');
  //     getAllStores();
  //   } else {
  //     appStore.setMessage({
  //       type: 'error',
  //       content: result.message,
  //       timestamp: new Date().getMilliseconds(),
  //     });
  //   }
  // };

  // const handleUpdateWinner = async () => {
  //   if (
  //     !winnerInfo.winnerName.trim() ||
  //     !winnerInfo.winnerBankName.trim() ||
  //     !winnerInfo.winnerBankNumber.trim()
  //   ) {
  //     appStore.setMessage({
  //       type: 'error',
  //       content: 'Vui lòng điền đầy đủ thông tin',
  //       timestamp: new Date().getMilliseconds(),
  //     });
  //     return;
  //   }

  //   appStore.setLoading(true);
  //   const result = await storeService.updateWinner(winnerInfo);
  //   appStore.setLoading(false);

  //   if (!result) {
  //     appStore.setMessage({
  //       type: 'error',
  //       content: 'Có lỗi xảy ra, vui lòng thử lại sau',
  //       timestamp: new Date().getMilliseconds(),
  //     });
  //     return;
  //   }

  //   if (result.isSuccess) {
  //     appStore.setMessage({
  //       type: 'success',
  //       content: result.message,
  //       timestamp: new Date().getMilliseconds(),
  //     });

  //     setCreateParams({
  //       storeCode: '',
  //       storeName: '',
  //       provinceId: -1,
  //       districtId: -1,
  //       address: '',
  //       status: '',
  //       contactName: '',
  //       phoneNumber: '',
  //       userId: -1,
  //       calendar: new Date(),
  //       reward: true,
  //       note: '',
  //       winnerName: '',
  //       winnerBankName: '',
  //       winnerBankNumber: '',
  //       lat: '',
  //       long: '',
  //     });
  //     setWinnerInfo({
  //       storeId: 0,
  //       winnerName: '',
  //       winnerBankName: '',
  //       winnerBankNumber: '',
  //       winnerRelationship: '',
  //     });
  //     handleViewDetailStore(storeSelectedId, 'UPDATE');
  //     getAllStores();
  //   } else {
  //     appStore.setMessage({
  //       type: 'error',
  //       content: result.message,
  //       timestamp: new Date().getMilliseconds(),
  //     });
  //   }
  // };

  const getPposmByStore = async (storeId: number) => {
    appStore.setLoading(true);
    const result = await pposmService.getByStore(storeId);
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
      setPposmByStore(result.data);
    } else {
      appStore.setMessage({
        type: 'error',
        content: result.message,
        timestamp: new Date().getMilliseconds(),
      });
    }
  };

  const handleViewDetailStore = async (id: number, type: 'UPDATE' | 'EDIT') => {
    appStore.setLoading(true);
    const result = await storeService.detail(id);
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
      const store = result.data;
      setstoreSelectedId(id);
      getAllDistrictsByProvince(Number(store.provinceId));

      setCreateParams({
        storeCode: store.storeCode,
        storeName: store.storeName,
        provinceId: Number(store.provinceId),
        districtId: Number(store.districtId),
        address: store.address,
        status: store.status || '',
        contactName: store.contactName,
        phoneNumber: store.phoneNumber,
        userId: Number(store.userId),
        calendar: store.calendar,
        reward: store.reward + '' === '1',
        note: store.note || '',
        winnerName: '',
        winnerBankName: '',
        winnerBankNumber: '',
        lat: store.lat,
        long: store.long,
      });
      setWinnerInfo({
        storeId: id,
        winnerName: store.winnerName || '',
        winnerBankName: store.winnerBankName || '',
        winnerBankNumber: store.winnerBankNumber || '',
        winnerRelationship: store.winnerRelationship || '',
      });

      await getPposmByStore(id);
    } else {
      appStore.setMessage({
        type: 'error',
        content: result.message,
        timestamp: new Date().getMilliseconds(),
      });
    }

    if (type === 'EDIT') {
      appStore.setLoading(true);
      setTimeout(() => {
        setOpenModalDetail(true);
        appStore.setLoading(false);
      }, 1000);
    } else {
      setOpenModalUpdate(true);
    }

    getImagesByStore(id);
  };

  const getImagesByStore = async (id: number) => {
    appStore.setLoading(true);
    const result = await storeService.getAllImagesByStoreId(id);
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
      const images = result.data;
      setListImagesOfStore(images);
    } else {
      appStore.setMessage({
        type: 'error',
        content: result.message,
        timestamp: new Date().getMilliseconds(),
      });
    }
  };

  const handleManagerPPOSM = (id: number) => {
    getPposmByStore(id);
    setOpenModalPPOSM(true);
    setstoreSelectedId(id);
    getAllPposm();
  };

  const handleAddPposmToStore = async (pposmId: string) => {
    appStore.setLoading(true);
    const result = await pposmService.assignToStore(storeSelectedId, pposmId);
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
      setOpenModalAddPPOSM(false);
      handleManagerPPOSM(storeSelectedId);

      appStore.setMessage({
        type: 'success',
        content: result.message,
        timestamp: new Date().getMilliseconds(),
      });
    } else {
      appStore.setMessage({
        type: 'error',
        content: result.message,
        timestamp: new Date().getMilliseconds(),
      });
    }
  };

  const getAllPposm = async () => {
    appStore.setLoading(true);
    const result = await pposmService.all();
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
      setListPposm(result.data);
    } else {
      appStore.setMessage({
        type: 'error',
        content: result.message,
        timestamp: new Date().getMilliseconds(),
      });
    }
  };

  const RenderImageByType = ({
    type,
  }: {
    type:
      | 'overview'
      | 'check_in'
      | 'check_out'
      | 'hot_zone'
      | 'posm'
      | 'confirmation'
      | 'fee_info';
  }) => {
    const data = listImagesOfStore.filter((e) => e.typeCode === type);
    return (
      <Row gutter={10}>
        {data.map((image, index) => {
          return (
            <Col span={4}>
              <Image
                key={index + image.id}
                className="my-1 w-full h-[200px] border border-primary rounded-md overflow-hidden object-contain"
                src={Constants.IMAGE_URL + '/' + image.imagePath}
              />
              <h5 className="text-center font-bold">
                {type == 'posm' && image.posmId}
              </h5>
            </Col>
          );
        })}
      </Row>
    );
  };

  const TabViewDetail = () => {
    return (
      <>
        <Tabs
          defaultActiveKey="1"
          items={[
            // Chấm công
            {
              key: '1',
              label: 'Chấm công',
              children: (
                <>
                  <h2 className="font-bold mb-2">Thông tin cửa hàng</h2>
                  <div className="flex justify-between">
                    <table className="border border-collapse w-full">
                      <tbody>
                        <tr>
                          <td className="text-black font-bold border p-2">
                            Mã cửa hàng:
                          </td>
                          <td className="border p-2">
                            {createParams.storeCode}
                          </td>

                          <td className="text-black font-bold border p-2">
                            Nhân viên phụ trách:
                          </td>
                          <td className="border p-2">
                            {(listUsers.find(
                              (e) => e.id === createParams.userId,
                            )?.firstName || 'Chưa gán') +
                              ' ' +
                              (listUsers.find(
                                (e) => e.id === createParams.userId,
                              )?.lastName || ' ')}
                          </td>
                        </tr>

                        <tr>
                          <td className="text-black font-bold border p-2">
                            Tên cửa hàng:
                          </td>
                          <td className="border p-2">
                            {createParams.storeName}
                          </td>

                          <td className="text-black font-bold border p-2">
                            Lịch khảo sát:
                          </td>
                          <td className="border p-2">
                            {createParams.calendar
                              ? moment(createParams.calendar).format(
                                  'DD/MM/YYYY',
                                )
                              : 'Chưa chọn lịch'}
                          </td>
                        </tr>

                        <tr>
                          <td className="text-black font-bold border p-2">
                            Chủ cửa hàng:
                          </td>
                          <td className="border p-2">
                            {createParams.contactName}
                          </td>

                          <td className="text-black font-bold border p-2">
                            Trạng thái cửa hàng:
                          </td>
                          <td className="border p-2">
                            {
                              storeStatusList.find(
                                (e) => e.id.toString() == createParams.status,
                              )?.name
                            }
                          </td>
                        </tr>

                        <tr>
                          <td className="text-black font-bold border p-2">
                            Số điện thoại:
                          </td>
                          <td className="border p-2">
                            {createParams.phoneNumber}
                          </td>

                          <td className="text-black font-bold border p-2">
                            Trả thưởng:
                          </td>
                          <td className="border p-2">
                            {createParams.reward ? 'Có' : 'Không'}
                          </td>
                        </tr>

                        <tr>
                          <td className="text-black font-bold border p-2">
                            Tỉnh thành:
                          </td>
                          <td className="border p-2">
                            {
                              listProvinces.find(
                                (e) => e.id === createParams.provinceId,
                              )?.name
                            }
                          </td>

                          <td
                            rowSpan={3}
                            className="text-black font-bold border p-2"
                          >
                            Ghi chú:
                          </td>
                          <td rowSpan={3} className="border p-2">
                            {createParams.note || ''}
                          </td>
                        </tr>

                        <tr>
                          <td className="text-black font-bold border p-2">
                            Quận huyện:
                          </td>
                          <td className="border p-2">
                            {listDistrics.find(
                              (e) => e.id === createParams.districtId,
                            )?.name || '.'}
                          </td>
                        </tr>

                        <tr>
                          <td className="text-black font-bold border p-2">
                            Địa chỉ:
                          </td>
                          <td className="border p-2">{createParams.address}</td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="ml-2">
                      <iframe
                        src={`${Constants.IMAGE_URL}/mapview/${
                          listImagesOfStore[0]?.lat || '106.629662'
                        }/${listImagesOfStore[0]?.long || '10.823099'}`}
                        width="420"
                        height="420"
                      />
                    </div>
                  </div>

                  <Collapse
                    className="mt-4"
                    items={[
                      {
                        key: 'check_in',
                        label: 'Check-in',
                        children: <RenderImageByType type="check_in" />,
                      },
                      {
                        key: 'check_out',
                        label: 'Check-out',
                        children: <RenderImageByType type="check_out" />,
                      },
                      {
                        key: 'overview',
                        label: 'Overview',
                        children: <RenderImageByType type="overview" />,
                      },
                    ]}
                  />
                  {/* <Row gutter={10}>
                  <Col span={12}>
                    <div>
                      <label className="mb-3 mt-5 block text-black dark:text-white font-bold">
                        Mã cửa hàng
                      </label>
                      {openModalDetail ? (
                        <div className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition min-h-[48px] focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                          {createParams.storeCode}
                        </div>
                      ) : (
                        <input
                          value={createParams.storeCode}
                          onChange={(e) =>
                            setCreateParams({
                              ...createParams,
                              storeCode: e.target.value,
                            })
                          }
                          type="text"
                          placeholder="Mã cửa hàng"
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition min-h-[48px] focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      )}
                    </div>

                    <div>
                      <label className="mb-3 mt-5 block text-black dark:text-white font-bold">
                        Tên cửa hàng
                      </label>
                      {openModalDetail ? (
                        <div className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition min-h-[48px] focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                          {createParams.storeName}
                        </div>
                      ) : (
                        <input
                          value={createParams.storeName}
                          onChange={(e) =>
                            setCreateParams({
                              ...createParams,
                              storeName: e.target.value,
                            })
                          }
                          type="text"
                          placeholder="Tên cửa hàng"
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition min-h-[48px] focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      )}
                    </div>

                    <div>
                      <label className="mb-3 mt-5 block text-black dark:text-white font-bold">
                        Chủ cửa hàng
                      </label>

                      {openModalDetail ? (
                        <div className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition min-h-[48px] focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                          {createParams.contactName}
                        </div>
                      ) : (
                        <input
                          value={createParams.contactName}
                          onChange={(e) =>
                            setCreateParams({
                              ...createParams,
                              contactName: e.target.value,
                            })
                          }
                          type="text"
                          placeholder="Tên chủ"
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition min-h-[48px] focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      )}
                    </div>

                    <div>
                      <label className="mb-3 mt-5 block text-black dark:text-white font-bold">
                        Số điện thoại
                      </label>
                      {openModalDetail ? (
                        <div className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition min-h-[48px] focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                          {createParams.phoneNumber}
                        </div>
                      ) : (
                        <input
                          value={createParams.phoneNumber}
                          onChange={(e) =>
                            setCreateParams({
                              ...createParams,
                              phoneNumber: e.target.value,
                            })
                          }
                          type="text"
                          placeholder="Điện thoại"
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition min-h-[48px] focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      )}
                    </div>

                    <div>
                      <label className="mb-3 mt-5 block text-black dark:text-white font-bold">
                        Tỉnh thành
                      </label>
                      {openModalDetail ? (
                        <div className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition min-h-[48px] focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                          {
                            listProvinces.find(
                              (e) => e.id === createParams.provinceId,
                            )?.name
                          }
                        </div>
                      ) : (
                        <Select
                          defaultValue={createParams.provinceId}
                          value={createParams.provinceId}
                          style={{ width: '100%', height: 48 }}
                          onChange={(e) => {
                            setCreateParams({
                              ...createParams,
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
                      )}
                    </div>

                    <div>
                      <label className="mb-3 mt-5 block text-black dark:text-white font-bold">
                        Quận huyện
                      </label>

                      {openModalDetail ? (
                        <div className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition min-h-[48px] focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                          {listDistrics.find(
                            (e) => e.id === createParams.districtId,
                          )?.name || '.'}
                        </div>
                      ) : (
                        <Select
                          defaultValue={createParams.districtId}
                          value={createParams.districtId}
                          style={{ width: '100%', height: 48 }}
                          onChange={(e) =>
                            setCreateParams({
                              ...createParams,
                              districtId: e,
                            })
                          }
                          options={[
                            { value: -1, label: 'Chưa chọn' },
                            ...listDistrics.map((item) => ({
                              label: item.name,
                              value: item.id,
                            })),
                          ]}
                        />
                      )}
                    </div>

                    <div>
                      <label className="mb-3 mt-5 block text-black dark:text-white font-bold">
                        Địa chỉ
                      </label>

                      {openModalDetail ? (
                        <div className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition min-h-[48px] focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                          {createParams.address}
                        </div>
                      ) : (
                        <input
                          value={createParams.address}
                          onChange={(e) =>
                            setCreateParams({
                              ...createParams,
                              address: e.target.value,
                            })
                          }
                          type="text"
                          placeholder="Địa chỉ"
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition min-h-[48px] focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      )}
                    </div>
                  </Col>

                  <Col span={12}>
                    <div>
                      <label className="mb-3 mt-5 block text-black dark:text-white font-bold">
                        Nhân viên phụ trách
                      </label>

                      {openModalDetail ? (
                        <div className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition min-h-[48px] focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                          {(listUsers.find((e) => e.id === createParams.userId)
                            ?.firstName || 'Chưa gán') +
                            ' ' +
                            (listUsers.find((e) => e.id === createParams.userId)
                              ?.lastName || ' ')}
                        </div>
                      ) : (
                        <Select
                          defaultValue={createParams.userId}
                          value={createParams.userId}
                          style={{ width: '100%', height: 48 }}
                          onChange={(e) =>
                            setCreateParams({
                              ...createParams,
                              userId: e,
                            })
                          }
                          options={[
                            { value: -1, label: 'Chưa chọn' },
                            ...listUsers.map((item) => ({
                              label: item.firstName + ' ' + item.lastName,
                              value: item.id,
                            })),
                          ]}
                        />
                      )}
                    </div>

                    <div>
                      <label className="mb-3 mt-5 block text-black dark:text-white font-bold">
                        Lịch
                      </label>

                      {openModalDetail ? (
                        <div className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition min-h-[48px] focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                          {createParams.calendar
                            ? moment(createParams.calendar).format('DD/MM/YYYY')
                            : 'Chưa chọn lịch'}
                        </div>
                      ) : (
                        <DatePicker
                          style={{ width: '100%', height: 48 }}
                          value={
                            createParams.calendar
                              ? dayjs(createParams.calendar, 'YYYY-MM-DD')
                              : undefined
                          }
                          format={'DD/MM/YYYY'}
                          onChange={(d) =>
                            setCreateParams({
                              ...createParams,
                              calendar: d?.toDate() || null,
                            })
                          }
                        />
                      )}
                    </div>

                    <div>
                      <label className="mb-3 mt-5 block text-black dark:text-white font-bold">
                        Trạng thái cửa hàng
                      </label>

                      {openModalDetail ? (
                        <div className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition min-h-[48px] focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                          {
                            storeStatusList.find(
                              (e) => e.id.toString() == createParams.status,
                            )?.name
                          }
                        </div>
                      ) : (
                        <Select
                          defaultValue={createParams.status}
                          value={createParams.status}
                          style={{ width: '100%', height: 48 }}
                          onChange={(e) => {
                            setCreateParams({
                              ...createParams,
                              status: e,
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
                      )}
                    </div>

                    <div>
                      <label className="mb-3 mt-5 block text-black dark:text-white font-bold">
                        Trả thưởng
                      </label>

                      {openModalDetail ? (
                        <div className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition min-h-[48px] focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                          {createParams.reward ? 'Có' : 'Không'}
                        </div>
                      ) : (
                        <Radio.Group
                          onChange={(e) =>
                            setCreateParams({
                              ...createParams,
                              reward: e.target.value,
                            })
                          }
                          value={createParams.reward}
                        >
                          <Space direction="vertical">
                            <Radio value={true}>Có</Radio>
                            <Radio value={false}>Không</Radio>
                          </Space>
                        </Radio.Group>
                      )}
                    </div>

                    <div>
                      <label className="mb-2 mt-5 block text-black dark:text-white font-bold">
                        Ghi chú
                      </label>

                      <textarea
                        disabled={openModalDetail}
                        value={createParams.note || ''}
                        onChange={(e) =>
                          setCreateParams({
                            ...createParams,
                            note: e.target.value,
                          })
                        }
                        placeholder="Ghi chú"
                        className="w-full min-h-[100px] rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </Col>
                </Row> */}
                </>
              ),
            },

            // Hotzone
            {
              key: 'Hotzone',
              label: 'Hotzone',
              children: <RenderImageByType type="hot_zone" />,
            },

            // Người trúng thưởng
            {
              key: 'fee_information',
              label: 'Thông tin trả phí',
              children: (
                <div className="flex flex-col justify-center items-center flex-1">
                  <div className="w-[500px]">
                    <div>
                      <label className="mb-3 mt-5 block text-black dark:text-white font-bold">
                        Tên người nhận
                      </label>

                      {openModalDetail ? (
                        <div className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition min-h-[48px] focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                          {winnerInfo.winnerName}
                        </div>
                      ) : (
                        <input
                          value={winnerInfo.winnerName}
                          onChange={(e) =>
                            setWinnerInfo({
                              ...winnerInfo,
                              winnerName: e.target.value,
                            })
                          }
                          type="text"
                          placeholder="Tên người nhận"
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition min-h-[48px] focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      )}
                    </div>

                    <div>
                      <label className="mb-3 mt-5 block text-black dark:text-white font-bold">
                        Ngân hàng
                      </label>

                      {openModalDetail ? (
                        <div className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition min-h-[48px] focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                          {winnerInfo.winnerBankName}
                        </div>
                      ) : (
                        <Select
                          showSearch
                          defaultValue={winnerInfo.winnerBankName}
                          value={winnerInfo.winnerBankName}
                          style={{ width: '100%', height: 48 }}
                          onChange={(e) => {
                            setWinnerInfo({
                              ...winnerInfo,
                              winnerBankName: e,
                            });
                          }}
                          options={[
                            { value: '', label: 'Chưa chọn' },
                            ...listBanks.map((item) => ({
                              label: item,
                              value: item,
                            })),
                          ]}
                        />
                      )}
                    </div>

                    <div>
                      <label className="mb-3 mt-5 block text-black dark:text-white font-bold">
                        Số tài khoản
                      </label>

                      {openModalDetail ? (
                        <div className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition min-h-[48px] focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                          {winnerInfo.winnerBankNumber}
                        </div>
                      ) : (
                        <input
                          value={winnerInfo.winnerBankNumber}
                          onChange={(e) =>
                            setWinnerInfo({
                              ...winnerInfo,
                              winnerBankNumber: e.target.value,
                            })
                          }
                          type="text"
                          placeholder="Số tài khoản"
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition min-h-[48px] focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      )}
                    </div>

                    {openModalDetail && (
                      <div>
                        <label className="mb-3 mt-5 block text-black dark:text-white font-bold">
                          Quan hệ với người nhận
                        </label>
                        <div className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition min-h-[48px] focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                          {winnerInfo.winnerRelationship}
                        </div>
                      </div>
                    )}

                    {/* {openModalUpdate && (
                      <button
                        onClick={handleUpdateWinner}
                        className="px-6 py-3 bg-primary text-white rounded-md mt-4 font-medium mb-5"
                      >
                        Cập nhật
                      </button>
                    )} */}
                  </div>
                </div>
              ),
            },

            // Khảo sát POSM
            {
              key: '4',
              label: 'PPOSM',
              children: (
                <>
                  <Table
                    dataSource={pposmByStore}
                    columns={[
                      {
                        title: 'Hình ảnh',
                        render: (_, record) => (
                          <Image
                            width={100}
                            height={70}
                            style={{
                              objectFit: 'cover',
                            }}
                            src={Constants.IMAGE_URL + record.imagePath}
                          />
                        ),
                      },
                      {
                        title: 'Mã',
                        dataIndex: 'pposmId',
                      },
                      {
                        title: 'Tên',
                        dataIndex: 'pposmName',
                      },
                      {
                        title: 'Trạng thái',
                        render: (_, record) => (
                          <>{record.active == '1' ? 'Có' : 'Không'}</>
                        ),
                      },
                      {
                        title: 'Kết quả khảo sát',
                        render: (_, record) => (
                          <>
                            <p className="font-bold">
                              1. PPOSM có nằm trong tầm mắt không?
                            </p>
                            <p>{record.question1 || 'Chưa trả lời'}</p>

                            <p className="font-bold">
                              2. PPOSM có đối diện với người mua hàng không?
                            </p>
                            <p>{record.question2 || 'Chưa trả lời'}</p>

                            <p className="font-bold">
                              3. PPOSM có bị che chắn bởi các vật dụng khác
                              không?
                            </p>
                            <p>{record.question3 || 'Chưa trả lời'}</p>

                            <p className="font-bold">Ghi chú</p>
                            <p>{record.description || ''}</p>
                          </>
                        ),
                      },
                    ]}
                  />

                  <RenderImageByType type="posm" />
                </>
              ),
            },

            // Phiếu xác nhận
            {
              key: 'confirm',
              label: 'Phiếu xác nhận',
              children: <RenderImageByType type="fee_info" />,
            },
          ]}
        />
      </>
    );
  };

  return (
    <>
      <Breadcrumb pageName="Báo cáo viếng thăm CH" />

      <ReportSearch setData={setDataList} />

      <div className="flex flex-col gap-10">
        <Table
          scroll={{ x: 1500, y: 1500 }}
          dataSource={dataList}
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
              title: 'Tên cửa hàng',
              dataIndex: 'storeName',
              width: 200,
              render: (_, record) =>
                (record.storeCode || '') + ' ' + record.storeName,
            },
            {
              key: 'id',
              title: 'Chủ cửa hàng',
              dataIndex: 'contactName',
              width: 200,
            },
            // {
            //   title: 'Điện thoại',
            //   dataIndex: 'phoneNumber',
            // },
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
            // {
            //   title: 'Lat - Long',
            //   dataIndex: 'address',
            //   render: (_, record) => (
            //     <>
            //       {record.lat} - {record.long}
            //     </>
            //   ),
            // },
            {
              key: 'id',
              title: 'Trạng thái',
              width: 200,
              render: (_, record) => (
                <>
                  {record.status === null ? (
                    ''
                  ) : record.status === 'HOAT_DONG' ? (
                    <Tag bordered={false} color="success">
                      {record.statusName}
                    </Tag>
                  ) : (
                    <Tag bordered={false} color="error">
                      {record.statusName}
                    </Tag>
                  )}
                </>
              ),
            },
            {
              key: 'id',
              title: 'Nhân viên phụ trách',
              dataIndex: 'firstName',
              width: 200,
              render: (_, record) =>
                (record.userFirstName || '') +
                ' ' +
                (record.userLastName || ''),
            },
            {
              key: 'id',
              title: 'Lịch kế hoạch',
              dataIndex: 'active',
              align: 'center',
              width: 200,
              render: (_, record) => (
                <>
                  {record.calendar
                    ? moment(record.calendar).format('DD/MM/YYYY')
                    : 'Chưa chọn lịch'}
                </>
              ),
            },
            {
              key: 'id',
              title: 'Ngày khảo sát thực tế',
              dataIndex: 'active',
              align: 'center',
              width: 200,
              render: (_, record) => (
                <>
                  {record.updated_at
                    ? moment(record.updated_at).format('DD/MM/YYYY')
                    : 'Chưa khảo sát'}
                </>
              ),
            },
            {
              key: 'id',
              title: 'Thao tác',
              fixed: 'right',
              dataIndex: 'id',
              width: 150,
              render: (_, record) => (
                <>
                  <button
                    onClick={() => handleViewDetailStore(record.id, 'EDIT')}
                    className="p-3 rounded-md bg-success text-white"
                  >
                    Xem chi tiết
                  </button>

                  {/* <button
                    onClick={() => handleManagerPPOSM(record.id)}
                    className="p-3 rounded-md bg-primary text-white mx-2"
                  >
                    POSM
                  </button>

                  <button
                    onClick={() => handleViewDetailStore(record.id, 'UPDATE')}
                    className="p-3 rounded-md bg-warning text-white"
                  >
                    Cập nhật
                  </button> */}
                </>
              ),
            },
          ]}
        />
      </div>

      {/* MODAL CREATE STORE */}
      <Modal
        open={openModalCreate}
        footer={null}
        onCancel={() => setOpenModalCreate(false)}
        width={'50%'}
        style={{ top: 20 }}
      >
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Thêm mới Cửa hàng
        </h4>

        <Row gutter={10}>
          <Col span={12}>
            <div>
              <label className="mb-3 mt-5 block text-black dark:text-white font-bold">
                Nhập mã cửa hàng
              </label>
              <input
                value={createParams.storeCode}
                onChange={(e) =>
                  setCreateParams({
                    ...createParams,
                    storeCode: e.target.value,
                  })
                }
                type="text"
                placeholder="Tên cửa hàng"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition min-h-[48px] focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>

            <div>
              <label className="mb-3 mt-5 block text-black dark:text-white font-bold">
                Nhập tên cửa hàng
              </label>
              <input
                value={createParams.storeName}
                onChange={(e) =>
                  setCreateParams({
                    ...createParams,
                    storeName: e.target.value,
                  })
                }
                type="text"
                placeholder="Tên cửa hàng"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition min-h-[48px] focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>

            <div>
              <label className="mb-3 mt-5 block text-black dark:text-white font-bold">
                Nhập tên chủ cửa hàng
              </label>
              <input
                value={createParams.contactName}
                onChange={(e) =>
                  setCreateParams({
                    ...createParams,
                    contactName: e.target.value,
                  })
                }
                type="text"
                placeholder="Tên chủ"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition min-h-[48px] focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>

            <div>
              <label className="mb-3 mt-5 block text-black dark:text-white font-bold">
                Nhập số điện thoại
              </label>
              <input
                value={createParams.phoneNumber}
                onChange={(e) =>
                  setCreateParams({
                    ...createParams,
                    phoneNumber: e.target.value,
                  })
                }
                type="text"
                placeholder="Điện thoại"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition min-h-[48px] focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>

            <div>
              <label className="mb-3 mt-5 block text-black dark:text-white font-bold">
                Tỉnh thành
              </label>
              <Select
                defaultValue={createParams.provinceId}
                value={createParams.provinceId}
                style={{ width: '100%', height: 48 }}
                onChange={(e) => {
                  setCreateParams({
                    ...createParams,
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
            </div>

            <div>
              <label className="mb-3 mt-5 block text-black dark:text-white font-bold">
                Quận huyện
              </label>
              <Select
                defaultValue={createParams.districtId}
                value={createParams.districtId}
                style={{ width: '100%', height: 48 }}
                onChange={(e) =>
                  setCreateParams({
                    ...createParams,
                    districtId: e,
                  })
                }
                options={[
                  { value: -1, label: 'Chưa chọn' },
                  ...listDistrics.map((item) => ({
                    label: item.name,
                    value: item.id,
                  })),
                ]}
              />
            </div>

            <div>
              <label className="mb-3 mt-5 block text-black dark:text-white font-bold">
                Nhập địa chỉ
              </label>
              <input
                value={createParams.address}
                onChange={(e) =>
                  setCreateParams({ ...createParams, address: e.target.value })
                }
                type="text"
                placeholder="Địa chỉ"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition min-h-[48px] focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
          </Col>

          <Col span={12}>
            {/* <div>
              <label className="mb-3 mt-5 block text-black dark:text-white font-bold">
                Nhân viên phụ trách
              </label>
              <Select
                defaultValue={createParams.userId}
                value={createParams.userId}
                style={{ width: '100%', height: 48 }}
                onChange={(e) =>
                  setCreateParams({
                    ...createParams,
                    userId: e,
                  })
                }
                options={[
                  { value: -1, label: 'Chưa chọn' },
                  ...listUsers.map((item) => ({
                    label: item.firstName + ' ' + item.lastName,
                    value: item.id,
                  })),
                ]}
              />
            </div> */}

            {/* <div>
              <label className="mb-3 mt-5 block text-black dark:text-white font-bold">
                Lịch
              </label>

              <DatePicker
                style={{ width: '100%', height: 48 }}
                value={dayjs(createParams.calendar, 'YYYY-MM-DD')}
                format={'DD/MM/YYYY'}
                onChange={(d) =>
                  setCreateParams({
                    ...createParams,
                    calendar: d?.toDate() || null,
                  })
                }
              />
            </div> */}

            <div>
              <label className="mb-3 mt-5 block text-black dark:text-white font-bold">
                Trạng thái cửa hàng
              </label>
              <Select
                disabled
                defaultValue={createParams.status}
                value={createParams.status}
                style={{ width: '100%', height: 48 }}
                onChange={(e) => {
                  setCreateParams({
                    ...createParams,
                    status: e,
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
            </div>

            <div>
              <label className="mb-3 mt-5 block text-black dark:text-white font-bold">
                Trả thưởng
              </label>
              <Radio.Group
                disabled
                onChange={(e) =>
                  setCreateParams({ ...createParams, reward: e.target.value })
                }
                value={createParams.reward}
              >
                <Space direction="vertical">
                  <Radio value={true}>Có</Radio>
                  <Radio value={false}>Không</Radio>
                </Space>
              </Radio.Group>
            </div>

            <div>
              <label className="mb-3 mt-4 block text-black dark:text-white font-bold">
                Người nhận thưởng
              </label>

              {openModalDetail ? (
                <div className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition min-h-[48px] focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                  {createParams.winnerName}
                </div>
              ) : (
                <input
                  value={createParams.winnerName}
                  onChange={(e) =>
                    setCreateParams({
                      ...createParams,
                      winnerName: e.target.value,
                    })
                  }
                  type="text"
                  placeholder="Tên người nhận thưởng"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition min-h-[48px] focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              )}
            </div>

            <div>
              <label className="mb-3 mt-5 block text-black dark:text-white font-bold">
                Ngân hàng
              </label>

              {openModalDetail ? (
                <div className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition min-h-[48px] focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                  {createParams.winnerBankName}
                </div>
              ) : (
                <Select
                  showSearch
                  defaultValue={createParams.winnerBankName}
                  value={createParams.winnerBankName}
                  style={{ width: '100%', height: 48 }}
                  onChange={(e) => {
                    setCreateParams({
                      ...createParams,
                      winnerBankName: e,
                    });
                  }}
                  options={[
                    { value: '', label: 'Chưa chọn' },
                    ...listBanks.map((item) => ({
                      label: item,
                      value: item,
                    })),
                  ]}
                />
              )}
            </div>

            <div>
              <label className="mb-3 mt-5 block text-black dark:text-white font-bold">
                Số tài khoản
              </label>

              {openModalDetail ? (
                <div className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition min-h-[48px] focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                  {createParams.winnerBankNumber}
                </div>
              ) : (
                <input
                  value={createParams.winnerBankNumber}
                  onChange={(e) =>
                    setCreateParams({
                      ...createParams,
                      winnerBankNumber: e.target.value,
                    })
                  }
                  type="text"
                  placeholder="Số tài khoản"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition min-h-[48px] focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              )}
            </div>
          </Col>
        </Row>

        <button
          onClick={handleCreate}
          className="px-6 py-3 bg-primary text-white rounded-md mt-4 font-medium"
        >
          Thêm mới
        </button>
      </Modal>
      {/* END MODAL CREATE STORE */}

      {/* MODAL DETAIL STORE */}
      <Modal
        open={openModalDetail || openModalUpdate}
        footer={null}
        onCancel={() => {
          setOpenModalDetail(false);
          setOpenModalUpdate(false);
        }}
        width={'60%'}
        style={{ top: 20 }}
      >
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Chi tiết Cửa hàng
        </h4>

        <TabViewDetail />
      </Modal>
      {/* END MODAL DETAIL STORE */}

      {/* MODAL POSM */}
      <Modal
        open={openModalPPOSM}
        footer={null}
        onCancel={() => setOpenModalPPOSM(false)}
        width={'50%'}
        style={{ top: 20 }}
      >
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Danh sách POSM
        </h4>

        <div className="text-right">
          <button
            onClick={() => setOpenModalAddPPOSM(true)}
            className="p-3 rounded-md bg-primary text-white"
          >
            Thêm POSM
          </button>
        </div>

        <Table
          dataSource={pposmByStore}
          columns={[
            {
              title: 'Hình ảnh',
              render: (_, record) => (
                <Image
                  width={100}
                  height={70}
                  style={{
                    objectFit: 'cover',
                  }}
                  src={Constants.IMAGE_URL + record.imagePath}
                />
              ),
            },
            {
              title: 'Mã',
              dataIndex: 'pposmId',
            },
            {
              title: 'Tên',
              dataIndex: 'pposmName',
            },
            {
              title: 'Trạng thái',
              render: (_, record) => (
                <>{record.active == '1' ? 'Có' : 'Không'}</>
              ),
            },
          ]}
        />
      </Modal>
      {/* END MODAL POSM */}

      {/* MODAL ADD POSM */}
      <Modal
        open={openModalAddPPOSM}
        footer={null}
        onCancel={() => setOpenModalAddPPOSM(false)}
        width={'50%'}
        style={{ top: 20 }}
      >
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Thêm POSM cho cửa hàng
        </h4>

        <Table
          dataSource={listPposm}
          columns={[
            {
              title: 'Hình ảnh',
              render: (_, record) => (
                <Image
                  width={100}
                  height={70}
                  style={{
                    objectFit: 'cover',
                  }}
                  src={Constants.IMAGE_URL + record.imagePath}
                />
              ),
            },
            {
              title: 'Mã',
              dataIndex: 'id',
            },
            {
              title: 'Tên',
              dataIndex: 'name',
            },
            {
              title: 'Thao tác',
              render: (_, record) => (
                <button
                  onClick={() => handleAddPposmToStore(record.id)}
                  className="p-3 bg-primary rounded-md text-white"
                >
                  Thêm vào cửa hàng
                </button>
              ),
            },
          ]}
        />
      </Modal>
      {/* END MODAL ADD POSM */}
    </>
  );
};

export default observer(Report);
