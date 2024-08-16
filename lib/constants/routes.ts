import { SidebarLink } from '@/lib/types';

export const REGISTRATION_ROUTE_FORM = '/register?formStep=2';
export const LOGIN_ROUTE = '/login';
export const REGISTRATION_ROUTE = '/register';
export const LOGOUT_ROUTE = '/logout';

export const HOME_ROUTE = '/home';
export const FEATURE_FLAGS = '/feature-flag';
export const INPUTS_ROUTE = '/inputs';
export const COUNTRY_CITY_ROUTE = `${INPUTS_ROUTE}/country-city`;
export const MULTISELECT_ROUTE = `${INPUTS_ROUTE}/multiselect`;
export const CALENDAR_PICKER_ROUTE = `${INPUTS_ROUTE}/calendar-picker`;

export const PUBLIC_ROUTES = [REGISTRATION_ROUTE, LOGIN_ROUTE, LOGOUT_ROUTE, REGISTRATION_ROUTE, LOGIN_ROUTE];

export const sidebarLinks: SidebarLink[] = [
  {
    id: 'nav-home',
    imgURL: '/icons/home.svg',
    route: HOME_ROUTE,
    label: 'Home',
  },
  {
    id: 'nav-feature-flags',
    imgURL: '/icons/monitor.svg',
    route: FEATURE_FLAGS,
    label: 'Feature Flags Demo',
  },
  {
    id: 'nav-available-inputs',
    imgURL: '/icons/edit.svg',
    route: INPUTS_ROUTE,
    label: 'Inputs',
    routes: [
      {
        id: 'nav-available-inputs-country-city',
        route: COUNTRY_CITY_ROUTE,
        label: 'Country & City',
      },
      {
        id: 'nav-available-inputs-multiselect',
        route: MULTISELECT_ROUTE,
        label: 'Multi Option Select',
      },
      {
        id: 'nav-available-inputs-calendar',
        route: CALENDAR_PICKER_ROUTE,
        label: 'Calendar Picker',
      },
    ],
  },
];
