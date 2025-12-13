type PageRoute = Record<
  string,
  {
    label: string
    path: string
  }
>

export const PAGE_ROUTES = {
  homePage: {
    label: 'Úvod',
    path: '/',
  },
  servicesPage: {
    label: 'Služby',
    path: '/sluzby',
  },
  contactPage: {
    label: 'Kontakt',
    path: '/kontakt',
  },
} satisfies PageRoute
