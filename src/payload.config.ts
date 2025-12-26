// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
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
import { Footer } from './globals/Layout/Footer/config'
import { ServicesPage } from './globals/Pages/Services/config'
import { WeeklyScheduledServicesPage } from './globals/Pages/WeeklyScheduledServices/config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const pagesGlobalsConfig: GlobalConfig[] = [HomePage, ServicesPage, WeeklyScheduledServicesPage]

export default buildConfig({
  admin: {
    components: {
      beforeLogin: ['@/components/BeforeLogin'],
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  globals: [...pagesGlobalsConfig, Header, Footer],
  collections: [Services, Reviews, Users, Media],
  editor: defaultLexical,
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
  i18n: {
    supportedLanguages: { en, cs },
    fallbackLanguage: 'en',
  },
  localization: {
    locales: ['cs', 'en'],
    defaultLocale: 'cs',
  },
  telemetry: false,
})
