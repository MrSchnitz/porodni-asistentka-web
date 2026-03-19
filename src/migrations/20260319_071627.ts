import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "about_page" ADD COLUMN "my_story_title" varchar;
  ALTER TABLE "about_page" ADD COLUMN "my_story_content" jsonb;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "about_page" DROP COLUMN "my_story_title";
  ALTER TABLE "about_page" DROP COLUMN "my_story_content";`)
}
