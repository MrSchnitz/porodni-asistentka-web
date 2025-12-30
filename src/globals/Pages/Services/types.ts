import { ContactPage, Courses, Schedules, Service, ServicesPage } from '@/payload-types'

export type Course = NonNullable<Courses>[number]

export type Schedule = NonNullable<Schedules>[number]

export type ScheduleItems = NonNullable<Schedule['scheduleItems']>

export type ScheduleStatus = NonNullable<Schedules>[number]['status']

export type AdditionalInfo = NonNullable<Service['additionalInfo']>[number]

export type LessonsSection = NonNullable<Course['lessonsSection']>

export type ServicePageSections = NonNullable<ServicesPage['serviceSections']>

export type ContactPageInfo = NonNullable<ContactPage['contactInfo']>[number]

export type ContactPageNote = NonNullable<ContactPage['note']>