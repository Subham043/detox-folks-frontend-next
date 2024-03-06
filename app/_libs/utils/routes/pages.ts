const routes = {
    home: '/',
    about: '/about-us',
    category: '/category',
    products: '/products',
    special_products: '/special-products',
    blogs: '/blogs',
    contact: '/contact-us',
    legal: '/legal',
    auth: {
        login: '/login',
        register: '/register',
        forgot_password: '/forgot-password',
    },
    account: {
        profile: '/account/profile',
        checkout: '/account/checkout',
        orders: '/account/orders',
    }
}

export const page: typeof routes = routes;