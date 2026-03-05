import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services_card_additional_info" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "services_card_additional_info" ALTER COLUMN "value" DROP NOT NULL;
  ALTER TABLE "services_detail_additional_info" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "services_detail_additional_info" ALTER COLUMN "value" DROP NOT NULL;
  ALTER TABLE "services" ALTER COLUMN "card_description" DROP NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services_card_additional_info" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "services_card_additional_info" ALTER COLUMN "value" SET NOT NULL;
  ALTER TABLE "services_detail_additional_info" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "services_detail_additional_info" ALTER COLUMN "value" SET NOT NULL;
  ALTER TABLE "services" ALTER COLUMN "card_description" SET NOT NULL;`)
}
