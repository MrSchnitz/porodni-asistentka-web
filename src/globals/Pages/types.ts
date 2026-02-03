import {
  ContactPage,
  Courses,
  DownloadsPage,
  Schedules,
  Service,
  ServicesPage,
  WeeklyScheduledServicesPage,
} from '@/payload-types'

export type Course = NonNullable<Courses>[number]

export type Schedule = NonNullable<Schedules>[number]

export type ScheduleItems = NonNullable<Schedule['scheduleItems']>

export type ScheduleStatus = NonNullable<Schedules>[number]['status']

export type AdditionalInfo = NonNullable<Service['detail']['additionalInfo']>[number]

export type LessonsSection = NonNullable<Course['lessonsSection']>

export type ServicePageSections = NonNullable<ServicesPage['serviceSections']>

export type ContactPageInfo = NonNullable<ContactPage['contactInfo']>[number]

export type ContactPageNote = NonNullable<ContactPage['note']>

export type WeeklyScheduledServicesInfoSection = NonNullable<
  WeeklyScheduledServicesPage['infoSection']
>

export type ServiceBenefitsSection = NonNullable<Service['detail']['benefitsSection']>

export type ServiceBenefit = NonNullable<ServiceBenefitsSection['benefits']>[number]

export type ServicePackageSection = NonNullable<Service['detail']['packageSection']>

export type ServicePackage = NonNullable<ServicePackageSection['packages']>[number]

export type ServicePackageOffer = NonNullable<ServicePackage['includedOffers']>[number]

export type ImportantItemsSection = NonNullable<DownloadsPage['important']>

export type IconType = NonNullable<Service['icon']>
