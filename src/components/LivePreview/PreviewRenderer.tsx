'use client'

import { LivePreview } from '@/components/LivePreview/LivePreview'
import { AboutPageContent } from '@/globals/Pages/About/AboutPageContent'
import { BlogPageContent } from '@/globals/Pages/Blog/BlogPageContent'
import { BlogPostDetailPage } from '@/globals/Pages/Blog/BlogPostDetailPage'
import { ContactPageContent } from '@/globals/Pages/Contact/ContactPageContent'
import { DownloadsPage } from '@/globals/Pages/Downloads/DownloadsPage'
import { HomeContent } from '@/globals/Pages/Home/HomeContent'
import ServicesPage from '@/globals/Pages/Services/ServicesPage'
import { ServicePreviewView } from '@/globals/Pages/Services/ServicePreviewView'
import { WeeklyPageContent } from '@/globals/Pages/WeeklyScheduledServices/WeeklyPageContent'
import { HeaderClient } from '@/globals/Layout/Header/Header.client'
import { FooterClient } from '@/globals/Layout/Footer/Footer.client'
import { AnnouncementClient } from '@/globals/Layout/Announcement/AnnouncementClient'
import type { WeeklyScheduleByDay } from '@/app/(frontend)/aktualni-sluzby/actions'
import type {
  AboutPage,
  Announcement,
  Blog,
  BlogPage,
  ContactPage,
  DownloadsPage as DownloadsPageType,
  Footer,
  Header,
  HomePage,
  Service,
  ServicesPage as ServicesPageType,
  WeeklyScheduledServicesPage,
} from '@/payload-types'

type PreviewRendererProps =
  | { global: 'homePage'; initialData: HomePage; depth: number }
  | { global: 'aboutPage'; initialData: AboutPage; depth: number }
  | { global: 'contactPage'; initialData: ContactPage; depth: number }
  | { global: 'downloadsPage'; initialData: DownloadsPageType; depth: number }
  | { global: 'servicesPage'; initialData: ServicesPageType; depth: number }
  | {
      global: 'weeklyScheduledServicesPage'
      initialData: WeeklyScheduledServicesPage
      depth: number
      weeklySchedule: WeeklyScheduleByDay
      dayDates: Record<keyof WeeklyScheduleByDay, string>
      dayNames: Record<keyof WeeklyScheduleByDay, string>
    }
  | { global: 'blogPage'; initialData: BlogPage; depth: number }
  | { global: 'header'; initialData: Header; depth: number }
  | { global: 'footer'; initialData: Footer; depth: number }
  | { global: 'announcement'; initialData: Announcement; depth: number }
  | { collection: 'services'; initialData: Service; depth: number }
  | { collection: 'blogs'; initialData: Blog; depth: number }
  | { global: string; initialData: unknown; depth: number }

/**
 * Client wrapper pro /preview – Live Preview v reálném čase.
 * Data předává do content komponent jako prop.
 */
export function PreviewRenderer(props: PreviewRendererProps) {
  const { initialData, depth } = props

  const wrap = <T extends Record<string, any>>(data: T, render: (data: T) => React.ReactNode) => (
    <LivePreview initialData={data} depth={depth}>
      {render}
    </LivePreview>
  )

  if ('collection' in props) {
    const { collection } = props

    switch (collection) {
      case 'services':
        return wrap<Service>(props.initialData as Service, (data) => (
          <ServicePreviewView service={data} />
        ))
      case 'blogs':
        return wrap<Blog>(props.initialData as Blog, (data) => (
          <BlogPostDetailPage blogPost={data} relatedPosts={[]} />
        ))
      default:
        return (
          <div className="p-8 text-muted-foreground">
            Náhled pro „{collection}“ zatím není implementován.
          </div>
        )
    }
  }

  const global = props.global
  switch (global) {
    case 'homePage':
      return wrap<HomePage>(initialData as HomePage, (data) => <HomeContent data={data} />)
    case 'aboutPage':
      return wrap<AboutPage>(initialData as AboutPage, (data) => <AboutPageContent data={data} />)
    case 'contactPage':
      return wrap<ContactPage>(initialData as ContactPage, (data) => (
        <ContactPageContent data={data} />
      ))
    case 'downloadsPage':
      return wrap<DownloadsPageType>(initialData as DownloadsPageType, (data) => (
        <DownloadsPage data={data} />
      ))
    case 'servicesPage':
      return wrap<ServicesPageType>(initialData as ServicesPageType, (data) => (
        <ServicesPage data={data} />
      ))
    case 'weeklyScheduledServicesPage': {
      const { initialData, weeklySchedule, dayDates, dayNames } = props as Extract<
        PreviewRendererProps,
        { global: 'weeklyScheduledServicesPage' }
      >
      return wrap<WeeklyScheduledServicesPage>(initialData, (data) => (
        <WeeklyPageContent
          data={data}
          weeklySchedule={weeklySchedule}
          dayDates={dayDates}
          dayNames={dayNames}
        />
      ))
    }
    case 'blogPage':
      return wrap<BlogPage>(initialData as BlogPage, (data) => <BlogPageContent data={data} />)
    case 'header':
      return wrap<Header>(initialData as Header, (data) => <HeaderClient data={data} />)
    case 'footer':
      return wrap<Footer>(initialData as Footer, (data) => <FooterClient data={data} />)
    case 'announcement':
      return wrap<Announcement>(initialData as Announcement, (data) => (
        <AnnouncementClient data={data} />
      ))
    default:
      return (
        <div className="p-8 text-muted-foreground">
          Náhled pro „{global}“ zatím není implementován.
        </div>
      )
  }
}
