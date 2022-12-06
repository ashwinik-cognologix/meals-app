// assets
import { IconKey } from '@tabler/icons';
import ReportIcon from '@mui/icons-material/Report';

// constant
const icons = {
    IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const reports = {
    id: 'reports',
    title: 'Reports',
    type: 'group',

    children: [
        {
            id: 'daily-report',
            title: 'Daily Report',
            type: 'item',
            url: 'daily-report',
            target: false,
            breadcrumbs: false
        },
        {
            id: 'monthly',
            title: 'Monthly Report',
            type: 'item',
            url: 'monthly-report',
            target: false,
            breadcrumbs: false
        }
    ]
};

export default reports;
