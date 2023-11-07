import { observer } from 'mobx-react-lite';
import { appStore } from '../stores';
import readXlsxFile from 'read-excel-file';
import { storeService } from '../services';
import { Modal } from 'antd';
import { useState } from 'react';
import Constants from '../utils/constants';

const ImportExcel = () => {
  const [modal, setModal] = useState(false);

  const handleExcel = () => {
    const input = document.getElementById('input') as HTMLInputElement;

    try {
      if (input && input.files) {
        const file = input.files[0];
        const fileName = file.name || '';
        const fileExtension = fileName.split('.').pop()?.toLowerCase();
        if (fileExtension !== 'xlsx' && fileExtension !== 'xls') {
          appStore.setMessage({
            type: 'error',
            content: 'Định dạng file phải là Excel!',
            timestamp: new Date().getMilliseconds(),
          });
          return;
        }

        readXlsxFile(file).then((rows) => {
          const params: any[] = [];

          rows.forEach((e, index) => {
            if (index !== 0 && e[2]) {
              params.push({
                storeCode: e[1],
                storeName: e[2],
                contactName: e[3],
                phoneNumber: e[4],
                provinceId: e[5],
                districtId: e[6],
                address: e[7],
                reward: e[8],
                winnerName: e[9],
                winnerBankName: e[10],
                winnerBankNumber: e[11],
                lat: e[12],
                long: e[13],
                CAMEL: e[14],
                COD16: e[15],
                COD19: e[16],
                CUBE21: e[17],
                LEDJ19: e[18],
                PCL19: e[19],
                PCS19: e[20],
                WALLS19: e[21],
              });
            }
          });

          if (params.length > 0) {
            appStore.setLoading(true);

            storeService.importExcel(params).then((e) => {
              appStore.setLoading(false);
              if (e && e.data.isSuccess) {
                appStore.setMessage({
                  type: 'success',
                  content: e.data.message,
                  timestamp: new Date().getMilliseconds(),
                });

                setModal(false);
                input.files = null;
                input.value = '';
              } else {
                appStore.setMessage({
                  type: 'error',
                  content: 'Đã xảy ra lỗi. Vui lòng thử lại sau',
                  timestamp: new Date().getMilliseconds(),
                });
              }
            });
          }
        });
      }
    } catch (e) {
      appStore.setMessage({
        content: 'Vui lòng chọn file để import',
        timestamp: new Date().getMilliseconds(),
        type: 'error',
      });
    }
  };

  const downloadFile = () => {
    const fileName = 'import_template.xlsx';
    const link = document.createElement('a');
    link.download = fileName;
    link.href = fileName;
    link.click();
  };

  return (
    <>
      <button
        onClick={() => setModal(true)}
        className="px-4 py-3 bg-primary text-white rounded-md my-3"
      >
        Import Excel
      </button>

      <Modal footer={null} open={modal} onCancel={() => setModal(false)}>
        <div>
          <label className="mb-3 block text-black font-bold dark:text-white">
            Chọn file /
            
            <button className='ml-1 text-primary hover:underline'
              onClick={downloadFile}
            >
              Tải template
            </button>
          </label>
          <input
            id="input"
            type="file"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
          />
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={() => setModal(false)}
            className="w-[100px] hover:bg-opacity-95 py-3 bg-body text-white rounded-md"
          >
            Hủy
          </button>

          <button
            onClick={handleExcel}
            className="w-[100px] hover:bg-opacity-95 py-3 bg-primary text-white rounded-md"
          >
            Xác nhận
          </button>
        </div>
      </Modal>
    </>
  );
};

export default observer(ImportExcel);
