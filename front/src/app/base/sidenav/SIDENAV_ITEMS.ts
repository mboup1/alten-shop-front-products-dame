import { SidenavItem } from "app/base/sidenav/sidenav.model";

export const SIDENAV_ITEMS: SidenavItem[] = [
  // {
  //   id: 'home',
  //   link: '/',
  //   labels: { en: 'Home', fr: 'Accueil' },
  //   icon: 'home',
  //   hidden: false,
  // },
  {
    id: 'products',
    link: '/products',
    labels: { en: 'Products', fr: 'Produits' },
    icon: 'shopping-cart',
    hidden: false,
  },
  {
    id: 'admin-products',
    link: '/admin/products',
    labels: { en: 'Admin', fr: 'Admin' },
    icon: 'users',
    // icon: 'cog',
    hidden: false,
  }

];
