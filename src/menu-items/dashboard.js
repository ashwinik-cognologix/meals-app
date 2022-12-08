// assets
import { IconDashboard, IconUsers, IconOrders } from '@tabler/icons';

// constant
const icons = { IconDashboard, IconUsers };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard/default',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'user',
            title: 'Users',
            type: 'item',
            url: '/users',
            icon: icons.IconUsers,
            breadcrumbs: false
        },
        {
            id: 'meal',
            title: 'Meals',
            type: 'item',
            url: '/meals',
            icon: icons.IconUsers,
            breadcrumbs: false
        },
        {
            id: 'order',
            title: 'Orders',
            type: 'item',
            url: '/orders',
            icon: icons.IconUsers,
            breadcrumbs: false
        },
        {
            id: 'coupon',
            title: 'Coupon',
            type: 'item',
            url: '/coupons',
            icon: icons.IconUsers,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
