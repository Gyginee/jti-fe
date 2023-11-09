import * as XLSX from 'xlsx';

export const exportToExcel = (nameData: string, jsonData: any[], headerMapping: { [key: string]: string }) => {
  if (jsonData && jsonData.length > 0) {
    const data = jsonData.map((obj, index) => {
      const updatedObj: { [key: string]: any } = { 'STT': index + 1 };
      for (const key in headerMapping) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          updatedObj[headerMapping[key]] = obj[key];
        }
      }
      return updatedObj;
    });

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');

    return XLSX.writeFile(wb, `${nameData}.xlsx`);
  } else {
    return null;
  }
};
