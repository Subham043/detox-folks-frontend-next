const routes = {
  home: "/",
  about: "/about-us",
  category: "/category",
  certifications: "/certifications",
  products: "/products",
  special_products: "/special-products",
  blogs: "/blogs",
  contact: "/contact-us",
  legal: "/legal",
  auth: {
    login: "/login",
    register: "/register",
    forgot_password: "/forgot-password",
    reset_password: "/reset-password",
  },
  account: {
    profile: "/account/profile",
    checkout: "/account/checkout",
    orders: "/account/orders",
  },
};

export const page: typeof routes = routes;
