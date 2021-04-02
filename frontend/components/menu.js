export const menuItems = [
    {
        id: 1,
        label: "menuitems.navigation.text",
        isTitle: true
    },
    {
        id: 2,
        label: "menuitems.trangchu.text",
        icon: "ri-home-8-line",
        link: '/'
    },
    {
        id: 3,
        label: "menuitems.cauhinh.text",
        icon: "ri-settings-2-fill",
        link: '/cauhinh/'
    },
    {
        id: 4,
        label: "menuitems.sanpham.text",
        icon: "ri-stack-line",
        isMenuCollapsed: false,
        subItems: [
            {
                id: 5,
                label: 'menuitems.sanpham.list.index',
                link: '/sanpham'
            },
            {
                id: 6,
                label: 'menuitems.sanpham.list.new',
                link: '/sanpham/new'
            }
        ]
    }, {
        id: 7,
        label: "menuitems.tem.text",
        icon: "ri-printer-line",
        link: '/intem'
    },
    {
        id: 8,
        label: "menuitems.khay.text",
        icon: "ri-archive-line",
        isMenuCollapsed: false,
        subItems: [
            {
                id: 9,
                label: 'menuitems.khay.list.index',
                link: '/khay'
            },
            {
                id: 10,
                label: 'menuitems.khay.list.new',
                link: '/khay'
            },
            {
                id: 11,
                label: 'menuitems.khay.list.check',
                link: '/khay'
            }
        ]
    }
];

