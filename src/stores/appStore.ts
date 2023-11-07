import { action, makeObservable, observable, runInAction } from 'mobx';
import { MessageToastModel, UserModel } from '../models';
import Constants from '../utils/constants';

class AppStore {
  @observable
  loading: boolean = false;
  @observable
  loadPage: boolean = true;
  @observable
  currentUser: UserModel | undefined | null;
  @observable
  baseUrl: string = Constants.API_URL;
  @observable
  message: MessageToastModel;

  constructor() {
    makeObservable(this);
    this.setMessage({
      type: 'success',
      content: '',
      timestamp: 0,
    });
  }

  @action
  setLoading(loading: boolean) {
    if (loading) {
      this.loading = loading;
    } else {
      setTimeout(() => {
        runInAction(() => this.loading = loading)
      }, 300);
    }
  }

  @action
  setLoadPage(loadPage: boolean) {
    this.loadPage = loadPage;
  }

  @action
  setCurrentUser(currentUser: UserModel | undefined | null) {
    this.currentUser = currentUser;
  }

  @action
  setBaseUrl(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  @action
  setMessage(message: MessageToastModel) {
    this.message = message;
  }
}

const appStore = new AppStore();
export default appStore;
