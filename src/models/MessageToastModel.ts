export default interface MessageToastModel {
  type: 'success' | 'error';
  content: string;
  timestamp: number;
}
