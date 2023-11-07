import { lazy } from 'react';
import Role from '../pages/Role';
import Permission from '../pages/Permission';
import ListUser from '../pages/ListUser';
import Store from '../pages/Store';
import Report from '../pages/Report';
import Calendar from '../pages/Calendar';

// const Calendar = lazy(() => import('../pages/UiElements/Calendar'));
const Chart = lazy(() => import('../pages/UiElements/Chart'));
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Profile = lazy(() => import('../pages/UiElements/Profile'));
const Settings = lazy(() => import('../pages/UiElements/Settings'));
const Tables = lazy(() => import('../pages/UiElements/Tables'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));

const coreRoutes = [
  // {
  //   path: '/calendar',
  //   title: 'Calender',
  //   component: Calendar,
  // },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/forms/form-elements',
    title: 'Forms Elements',
    component: FormElements,
  },
  {
    path: '/forms/form-layout',
    title: 'Form Layouts',
    component: FormLayout,
  },
  {
    path: '/tables',
    title: 'Tables',
    component: Tables,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/chart',
    title: 'Chart',
    component: Chart,
  },
  {
    path: '/ui/alerts',
    title: 'Alerts',
    component: Alerts,
  },
  {
    path: '/ui/buttons',
    title: 'Buttons',
    component: Buttons,
  },
  {
    path: '/role',
    title: 'Nhóm người dùng',
    component: Role,
  },
  {
    path: '/permission',
    title: 'Quản lý quyền',
    component: Permission,
  },
  {
    path: '/users',
    title: 'Quản lý nhân viên',
    component: ListUser,
  },
  {
    path: '/store',
    title: 'Quản lý cửa hàng',
    component: Store,
  },
  {
    path: '/report',
    title: 'Báo cáo viếng thăm CH',
    component: Report,
  },
  {
    path: '/calendar',
    title: 'Lịch làm việc',
    component: Calendar,
  },
];

const routes = [...coreRoutes];
export default routes;
