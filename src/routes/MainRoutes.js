import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const Users = Loadable(lazy(() => import('views/users')));
const Meals = Loadable(lazy(() => import('views/meals')));
const Orders = Loadable(lazy(() => import('views/orders')));
const AddMeal = Loadable(lazy(() => import('views/meals/add-meal')));
const ViewOrderDetails = Loadable(lazy(() => import('views/orders/view-details')));
const DailyReport = Loadable(lazy(() => import('views/reports/daily-report')));
const MontlyReport = Loadable(lazy(() => import('views/reports/monthly-report')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-typography',
                    element: <UtilsTypography />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-color',
                    element: <UtilsColor />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-shadow',
                    element: <UtilsShadow />
                }
            ]
        },
        {
            path: 'icons',
            children: [
                {
                    path: 'tabler-icons',
                    element: <UtilsTablerIcons />
                }
            ]
        },
        {
            path: 'icons',
            children: [
                {
                    path: 'material-icons',
                    element: <UtilsMaterialIcons />
                }
            ]
        },
        {
            path: 'sample-page',
            element: <SamplePage />
        },
        {
            path: 'users',
            element: <Users />
        },
        {
            path: 'meals',
            element: <Meals />
        },
        {
            path: 'orders',
            element: <Orders />
        },
        {
            path: 'add-meal/:id',
            element: <AddMeal />
        },
        {
            path: 'view-details/:id',
            element: <ViewOrderDetails />
        },
        {
            path: 'daily-report',
            element: <DailyReport />
        },
        {
            path: 'monthly-report',
            element: <MontlyReport />
        }
    ]
};

export default MainRoutes;
