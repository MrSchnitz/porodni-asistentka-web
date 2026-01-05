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
  aboutPage: {
    label: 'O mně',
    path: '/o-mne',
  },
  contactPage: {
    label: 'Kontakt',
    path: '/kontakt',
  },
  downloadsPage: {
    label: 'Ke stažení',
    path: '/ke-stazeni',
  },
} satisfies PageRoute
