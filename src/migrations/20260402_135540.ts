import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_services_detail_additional_info_preset" AS ENUM('Délka', 'Cena', 'Místo');
  CREATE TYPE "public"."enum_services_detail_cta_buttons_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_services_detail_cta_buttons_link_reference" AS ENUM('/', '/aktualni-sluzby', '/sluzby', '/o-mne', '/kontakt', '/ke-stazeni', '/blog', '/prednasky');
  CREATE TYPE "public"."enum_services_courses_additional_info_preset" AS ENUM('Délka', 'Cena', 'Místo');
  CREATE TYPE "public"."enum_cld_schedules_calendar_items_additional_info_preset" AS ENUM('Místo', 'Délka', 'Cena');
  CREATE TYPE "public"."enum_cld_schedules_calendar_items_status" AS ENUM('scheduled', 'inProgress', 'booked', 'cancelled');
  CREATE TYPE "public"."enum_cld_schedules_status" AS ENUM('scheduled', 'inProgress', 'booked', 'cancelled');
  CREATE TYPE "public"."enum_lectures_page_calendar_items_additional_info_preset" AS ENUM('Místo', 'Délka', 'Cena');
  CREATE TYPE "public"."enum_lectures_page_calendar_items_status" AS ENUM('scheduled', 'inProgress', 'booked', 'cancelled');
  ALTER TYPE "public"."enum_home_page_hero_cta_buttons_link_reference" ADD VALUE '/prednasky';
  ALTER TYPE "public"."enum_home_page_services_cta_button_link_reference" ADD VALUE '/prednasky';
  ALTER TYPE "public"."enum_about_page_cta_section_cta_buttons_link_reference" ADD VALUE '/prednasky';
  ALTER TYPE "public"."enum_header_nav_items_link_reference" ADD VALUE '/prednasky';
  CREATE TABLE "services_detail_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_services_detail_cta_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_reference" "enum_services_detail_cta_buttons_link_reference",
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "cld_schedules_calendar_items_additional_info" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"preset" "enum_cld_schedules_calendar_items_additional_info_preset",
  	"icon" varchar,
  	"title" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "cld_schedules_calendar_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" jsonb,
  	"start_date" timestamp(3) with time zone NOT NULL,
  	"end_date" timestamp(3) with time zone NOT NULL,
  	"status" "enum_cld_schedules_calendar_items_status" DEFAULT 'scheduled',
  	"has_limited_spots" boolean DEFAULT false,
  	"number_of_spots" numeric DEFAULT 10,
  	"sign_up_details" jsonb
  );
  
  CREATE TABLE "cld_schedules" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"course_index" varchar,
  	"status" "enum_cld_schedules_status" DEFAULT 'scheduled',
  	"has_limited_spots" boolean DEFAULT false,
  	"number_of_spots" numeric DEFAULT 10
  );
  
  CREATE TABLE "lectures_page_calendar_items_additional_info" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"preset" "enum_lectures_page_calendar_items_additional_info_preset",
  	"icon" varchar,
  	"title" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "lectures_page_calendar_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" jsonb,
  	"start_date" timestamp(3) with time zone NOT NULL,
  	"end_date" timestamp(3) with time zone NOT NULL,
  	"status" "enum_lectures_page_calendar_items_status" DEFAULT 'scheduled',
  	"has_limited_spots" boolean DEFAULT false,
  	"number_of_spots" numeric DEFAULT 10,
  	"sign_up_details" jsonb
  );
  
  CREATE TABLE "lectures_page" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"page_header_title" varchar NOT NULL,
  	"page_header_subtitle" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "services_detail_additional_info" ADD COLUMN "preset" "enum_services_detail_additional_info_preset";
  ALTER TABLE "services_courses_additional_info" ADD COLUMN "preset" "enum_services_courses_additional_info_preset";
  ALTER TABLE "services_detail_cta_buttons" ADD CONSTRAINT "services_detail_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cld_schedules_calendar_items_additional_info" ADD CONSTRAINT "cld_schedules_calendar_items_additional_info_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cld_schedules_calendar_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cld_schedules_calendar_items" ADD CONSTRAINT "cld_schedules_calendar_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cld_schedules"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cld_schedules" ADD CONSTRAINT "cld_schedules_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lectures_page_calendar_items_additional_info" ADD CONSTRAINT "lectures_page_calendar_items_additional_info_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lectures_page_calendar_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lectures_page_calendar_items" ADD CONSTRAINT "lectures_page_calendar_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lectures_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "services_detail_cta_buttons_order_idx" ON "services_detail_cta_buttons" USING btree ("_order");
  CREATE INDEX "services_detail_cta_buttons_parent_id_idx" ON "services_detail_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "cld_schedules_calendar_items_additional_info_order_idx" ON "cld_schedules_calendar_items_additional_info" USING btree ("_order");
  CREATE INDEX "cld_schedules_calendar_items_additional_info_parent_id_idx" ON "cld_schedules_calendar_items_additional_info" USING btree ("_parent_id");
  CREATE INDEX "cld_schedules_calendar_items_order_idx" ON "cld_schedules_calendar_items" USING btree ("_order");
  CREATE INDEX "cld_schedules_calendar_items_parent_id_idx" ON "cld_schedules_calendar_items" USING btree ("_parent_id");
  CREATE INDEX "cld_schedules_order_idx" ON "cld_schedules" USING btree ("_order");
  CREATE INDEX "cld_schedules_parent_id_idx" ON "cld_schedules" USING btree ("_parent_id");
  CREATE INDEX "lectures_page_calendar_items_additional_info_order_idx" ON "lectures_page_calendar_items_additional_info" USING btree ("_order");
  CREATE INDEX "lectures_page_calendar_items_additional_info_parent_id_idx" ON "lectures_page_calendar_items_additional_info" USING btree ("_parent_id");
  CREATE INDEX "lectures_page_calendar_items_order_idx" ON "lectures_page_calendar_items" USING btree ("_order");
  CREATE INDEX "lectures_page_calendar_items_parent_id_idx" ON "lectures_page_calendar_items" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "services_detail_cta_buttons" CASCADE;
  DROP TABLE "cld_schedules_calendar_items_additional_info" CASCADE;
  DROP TABLE "cld_schedules_calendar_items" CASCADE;
  DROP TABLE "cld_schedules" CASCADE;
  DROP TABLE "lectures_page_calendar_items_additional_info" CASCADE;
  DROP TABLE "lectures_page_calendar_items" CASCADE;
  DROP TABLE "lectures_page" CASCADE;
  ALTER TABLE "home_page_hero_cta_buttons" ALTER COLUMN "link_reference" SET DATA TYPE text;
  DROP TYPE "public"."enum_home_page_hero_cta_buttons_link_reference";
  CREATE TYPE "public"."enum_home_page_hero_cta_buttons_link_reference" AS ENUM('/', '/aktualni-sluzby', '/sluzby', '/o-mne', '/kontakt', '/ke-stazeni', '/blog');
  ALTER TABLE "home_page_hero_cta_buttons" ALTER COLUMN "link_reference" SET DATA TYPE "public"."enum_home_page_hero_cta_buttons_link_reference" USING "link_reference"::"public"."enum_home_page_hero_cta_buttons_link_reference";
  ALTER TABLE "home_page_services_cta_button" ALTER COLUMN "link_reference" SET DATA TYPE text;
  DROP TYPE "public"."enum_home_page_services_cta_button_link_reference";
  CREATE TYPE "public"."enum_home_page_services_cta_button_link_reference" AS ENUM('/', '/aktualni-sluzby', '/sluzby', '/o-mne', '/kontakt', '/ke-stazeni', '/blog');
  ALTER TABLE "home_page_services_cta_button" ALTER COLUMN "link_reference" SET DATA TYPE "public"."enum_home_page_services_cta_button_link_reference" USING "link_reference"::"public"."enum_home_page_services_cta_button_link_reference";
  ALTER TABLE "about_page_cta_section_cta_buttons" ALTER COLUMN "link_reference" SET DATA TYPE text;
  DROP TYPE "public"."enum_about_page_cta_section_cta_buttons_link_reference";
  CREATE TYPE "public"."enum_about_page_cta_section_cta_buttons_link_reference" AS ENUM('/', '/aktualni-sluzby', '/sluzby', '/o-mne', '/kontakt', '/ke-stazeni', '/blog');
  ALTER TABLE "about_page_cta_section_cta_buttons" ALTER COLUMN "link_reference" SET DATA TYPE "public"."enum_about_page_cta_section_cta_buttons_link_reference" USING "link_reference"::"public"."enum_about_page_cta_section_cta_buttons_link_reference";
  ALTER TABLE "header_nav_items" ALTER COLUMN "link_reference" SET DATA TYPE text;
  DROP TYPE "public"."enum_header_nav_items_link_reference";
  CREATE TYPE "public"."enum_header_nav_items_link_reference" AS ENUM('/', '/aktualni-sluzby', '/sluzby', '/o-mne', '/kontakt', '/ke-stazeni', '/blog');
  ALTER TABLE "header_nav_items" ALTER COLUMN "link_reference" SET DATA TYPE "public"."enum_header_nav_items_link_reference" USING "link_reference"::"public"."enum_header_nav_items_link_reference";
  ALTER TABLE "services_detail_additional_info" DROP COLUMN "preset";
  ALTER TABLE "services_courses_additional_info" DROP COLUMN "preset";
  DROP TYPE "public"."enum_services_detail_additional_info_preset";
  DROP TYPE "public"."enum_services_detail_cta_buttons_link_type";
  DROP TYPE "public"."enum_services_detail_cta_buttons_link_reference";
  DROP TYPE "public"."enum_services_courses_additional_info_preset";
  DROP TYPE "public"."enum_cld_schedules_calendar_items_additional_info_preset";
  DROP TYPE "public"."enum_cld_schedules_calendar_items_status";
  DROP TYPE "public"."enum_cld_schedules_status";
  DROP TYPE "public"."enum_lectures_page_calendar_items_additional_info_preset";
  DROP TYPE "public"."enum_lectures_page_calendar_items_status";`)
}
