import { SidenavItem } from "app/base/sidenav/sidenav.model";

export const SIDENAV_ITEMS: SidenavItem[] = [
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
    hidden: false,
  },

  {
    id: 'cart-items',
    link: '/admin/cart-items',
    labels: { en: 'Items', fr: 'Articles du Panier' },
    icon: 'shopping-cart',
    hidden: true,
  },

];
