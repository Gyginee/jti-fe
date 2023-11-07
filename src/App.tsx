import { Suspense, lazy, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Login from './pages/Login';
import ECommerce from './pages/Dashboard/ECommerce';
// import SignUp from './pages/Authentication/SignUp';
import { Spin, notification } from 'antd';
import { observer } from 'mobx-react-lite';
import Loader from './common/Loader';
import { UserModel } from './models';
import routes from './routes';
import { apiClient } from './services';
import { appStore } from './stores';
import Constants from './utils/constants';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = notification.useNotification();

  useEffect(() => {
    const userLogin = localStorage.getItem('currentUser');

    apiClient.setBaseUrl(Constants.API_URL);

    if (!userLogin) {
      appStore.setCurrentUser(null);
    } else {
      appStore.setCurrentUser(JSON.parse(userLogin) as UserModel);
    }

    setTimeout(() => {
      appStore.setLoadPage(false);
    }, 1000);
  }, []);

  useEffect(() => {
    appStore.setLoadPage(true);
    if (!appStore.currentUser) {
      navigate('/auth/login');
    } else {
      navigate('/report');
    }
    setTimeout(() => {
      appStore.setLoadPage(false);
    }, 1000);
  }, [appStore.currentUser]);

  useEffect(() => {
    if (appStore.message.timestamp) {
      messageApi[appStore.message.type]({
        message: 'Thông báo',
        description: appStore.message.content,
      });
    }
  }, [appStore.message.timestamp]);

  return appStore.loadPage ? (
    <Loader />
  ) : (
    <Suspense fallback={<Loader />}>
      {contextHolder}
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />

      <Routes>
        <Route path="/auth/login" element={<Login />} />
        {/* <Route path="/auth/signup" element={<SignUp />} /> */}

        <Route element={<DefaultLayout />}>
          <Route index element={<ECommerce />} />
          {routes.map(({ path, component: Component }) => (
            <Route
              key={path}
              path={path}
              element={
                <Suspense fallback={<Loader />}>
                  <Component />
                </Suspense>
              }
            />
          ))}
        </Route>
      </Routes>

      <div
        className={`z-999999 absolute top-0 right-0 left-0 bottom-0 ${
          appStore.loading ? 'flex' : 'hidden'
        } justify-center items-center bg-black bg-opacity-25 `}
      >
        <Spin size="large" />
      </div>
    </Suspense>
  );
}

export default observer(App);
