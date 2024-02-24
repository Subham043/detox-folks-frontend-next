const routes = {
    home: '/',
    about: '/about-us',
    category: '/category',
    products: '/products',
    blogs: '/blogs',
    contact: '/contact-us',
    legal: '/legal',
    auth: {
        login: '/auth/login',
        register: '/auth/register',
        forgot_password: '/auth/forgot-password',
    },
    account: {
        profile: '/account/profile',
    }
}

export const page_routes: typeof routes = routes;