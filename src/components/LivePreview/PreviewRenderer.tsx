'use client'

import { LivePreview } from '@/components/LivePreview/LivePreview'
import { AboutPageContent } from '@/features/about/AboutPageContent'
import { BlogPageContent } from '@/features/blog/BlogPageContent'
import { BlogPostDetailPage } from '@/features/blog/BlogPostDetailPage'
import { ContactPageContent } from '@/features/contact/ContactPageContent'
import { DownloadsPageContent } from '@/features/downloads/DownloadsPageContent'
import { HomePageContent } from '@/features/home/HomePageContent'
import { ServicesPageContent } from '@/features/services/ServicesPageContent'
import { ServicePreviewView } from '@/features/services/ServicePreviewView'
import { WeeklyPageContent } from '@/features/weekly-scheduled-services/WeeklyPageContent'
import { HeaderClient } from '@/features/layout/Header/Header.client'
import { FooterClient } from '@/features/layout/Footer/Footer.client'
import { AnnouncementClient } from '@/features/layout/Announcement/AnnouncementClient'
import type { WeeklyScheduleByDay } from '@/app/(frontend)/aktualni-sluzby/actions'
import { ReviewCard } from '@/features/home/components/ReviewCard'
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
  Review,
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
  | { collection: 'reviews'; initialData: Review; depth: number }
  | { global: string; initialData: unknown; depth: number }

/**
 * Client wrapper for /preview – real-time Live Preview.
 * Passes data to content components as prop.
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
      case 'reviews':
        return wrap<Review>(props.initialData as Review, (data) => (
          <div className="p-6 max-w-md">
            <ReviewCard review={data} />
          </div>
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
      return wrap<HomePage>(initialData as HomePage, (data) => <HomePageContent data={data} />)
    case 'aboutPage':
      return wrap<AboutPage>(initialData as AboutPage, (data) => <AboutPageContent data={data} />)
    case 'contactPage':
      return wrap<ContactPage>(initialData as ContactPage, (data) => (
        <ContactPageContent data={data} />
      ))
    case 'downloadsPage':
      return wrap<DownloadsPageType>(initialData as DownloadsPageType, (data) => (
        <DownloadsPageContent data={data} />
      ))
    case 'servicesPage':
      return wrap<ServicesPageType>(initialData as ServicesPageType, (data) => (
        <ServicesPageContent data={data} />
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
