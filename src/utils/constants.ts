// const BASE_URL = 'http://127.0.0.1:8000';
const BASE_URL = 'https://jtiapi.hdcreative.vn';

const IMAGE_TYPES = [
  { typeCode: 'overview', typeName: 'overview' },
  { typeCode: 'check_in', typeName: 'check_in' },
  { typeCode: 'check_out', typeName: 'check_out' },
  { typeCode: 'hot_zone', typeName: 'hot_zone' },
  { typeCode: 'posm', typeName: 'posm' },
  { typeCode: 'confirmation', typeName: 'confirmation' },
  { typeCode: 'fee_info', typeName: 'fee_info' },
];

const Constants = {
  API_URL: BASE_URL + '/api',
  IMAGE_URL: BASE_URL,
  IMAGE_TYPES,
};

export default Constants;
