// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import path from 'path'
import { buildConfig, GlobalConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Header } from './globals/Layout/Header/config'
import { en } from '@payloadcms/translations/languages/en'
import { cs } from '@payloadcms/translations/languages/cs'
import { HomePage } from './globals/Pages/Home/config'
import { Services } from './collections/Services/Services'
import { defaultLexical } from './fields/defaultLexical'
import { Reviews } from './collections/Reviews'
import { Downloads } from './collections/Downloads'
import { Footer } from './globals/Layout/Footer/config'
import { ServicesPage } from './globals/Pages/Services/config'
import { WeeklyScheduledServicesPage } from './globals/Pages/WeeklyScheduledServices/config'
import { AboutPage } from './globals/Pages/About/config'
import { ContactPage } from './globals/Pages/Contact/config'
import { Announcement } from './globals/Layout/Announcement/config'
import { DownloadsPage } from './globals/Pages/Downloads/config'
import { BlogCategories } from './collections/Blog/BlogCategories'
import { Blogs } from './collections/Blog/Blogs'
import { BlogPage } from './globals/Pages/Blog/config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const pagesGlobalsConfig: GlobalConfig[] = [
  HomePage,
  ServicesPage,
  WeeklyScheduledServicesPage,
  AboutPage,
  ContactPage,
  DownloadsPage,
  BlogPage,
]

export default buildConfig({
  admin: {
    components: {
      beforeLogin: ['@/components/admin/BeforeLogin'],
      beforeDashboard: ['@/components/admin/BeforeDashboard'],
      providers: ['@/components/admin/DateInputProvider'],
    },
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    },
  },
  globals: [...pagesGlobalsConfig, Header, Footer, Announcement],
  collections: [Services, Reviews, Downloads, Users, Media, Blogs, BlogCategories],
  editor: defaultLexical,
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString:
        process.env.DATABASE_URI || 'postgresql://payload:payload@localhost:5432/payload',
    },
    idType: 'uuid',
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
  i18n: {
    supportedLanguages: { en, cs },
    fallbackLanguage: 'cs',
  },
  localization: {
    locales: ['cs', 'en'],
    defaultLocale: 'cs',
  },
  telemetry: false,
})
