export const menuItems = [
    {
        id: 1,
        label: "menuitems.navigation.text",
        isTitle: true
    },
    {
        id: 2,
        label: "menuitems.trangchu.text",
        icon: "ri-dashboard-line",
        link: '/'
    }, {
        id: 3,
        label: "Cấu hình",
        icon: "ri-dashboard-line",
        link: '/cauhinh/'
    },
    {
        id: 4,
        label: "Sản phẩm",
        icon: "ri-dashboard-line",
        link: '/sanpham/'
    },
    {
        id: 90,
        label: 'menuitems.icons.text',
        icon: 'ri-markup-line',
        isMenuCollapsed: false,
        subItems: [
            {
                id: 91,
                label: 'menuitems.icons.list.feather',
                link: '/icons/feather'
            },
            {
                id: 92,
                label: 'menuitems.icons.list.remix',
                link: '/icons/remix'
            },
            {
                id: 93,
                label: 'menuitems.icons.list.boxicons',
                link: '/icons/boxicons'
            },
            {
                id: 94,
                label: 'menuitems.icons.list.materialdesign',
                link: '/icons/mdi'
            },
            {
                id: 95,
                label: 'menuitems.icons.list.fontawesome',
                link: '/icons/font-awesome'
            },
            {
                id: 96,
                label: 'menuitems.icons.list.weather',
                link: '/icons/weather'
            }
        ]
    }
];

