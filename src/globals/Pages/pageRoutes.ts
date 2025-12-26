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
  weeklyScheduledServicesPage: {
    label: 'Aktuální služby',
    path: '/aktualni-sluzby',
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
