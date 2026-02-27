import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('cs', 'en');
  CREATE TYPE "public"."enum_services_schedules_schedule_items_status" AS ENUM('scheduled', 'inProgress', 'booked', 'cancelled');
  CREATE TYPE "public"."enum_services_schedules_status" AS ENUM('scheduled', 'inProgress', 'booked', 'cancelled');
  CREATE TYPE "public"."enum_services_service_type" AS ENUM('courses', 'lessons');
  CREATE TYPE "public"."enum_payload_folders_folder_type" AS ENUM('downloads', 'media');
  CREATE TYPE "public"."enum_home_page_hero_cta_buttons_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_home_page_hero_cta_buttons_link_reference" AS ENUM('/', '/aktualni-sluzby', '/sluzby', '/o-mne', '/kontakt', '/ke-stazeni', '/blog');
  CREATE TYPE "public"."enum_home_page_services_cta_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_home_page_services_cta_button_link_reference" AS ENUM('/', '/aktualni-sluzby', '/sluzby', '/o-mne', '/kontakt', '/ke-stazeni', '/blog');
  CREATE TYPE "public"."enum_about_page_cta_section_cta_buttons_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_about_page_cta_section_cta_buttons_link_reference" AS ENUM('/', '/aktualni-sluzby', '/sluzby', '/o-mne', '/kontakt', '/ke-stazeni', '/blog');
  CREATE TYPE "public"."enum_contact_page_contact_info_value_type" AS ENUM('text', 'formattedText', 'email', 'phone', 'link');
  CREATE TYPE "public"."enum_header_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_header_nav_items_link_reference" AS ENUM('/', '/aktualni-sluzby', '/sluzby', '/o-mne', '/kontakt', '/ke-stazeni', '/blog');
  CREATE TYPE "public"."enum_announcement_banner_type" AS ENUM('info', 'warning', 'success', 'error');
  CREATE TYPE "public"."enum_announcement_modal_type" AS ENUM('info', 'warning', 'success', 'error');
  CREATE TABLE "services_card_additional_info" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "services_detail_additional_info" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "services_detail_benefits_section_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar
  );
  
  CREATE TABLE "services_detail_package_section_packages_included_offers" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "services_detail_package_section_packages" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"price" varchar
  );
  
  CREATE TABLE "services_detail_announcements_section_announcements" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" jsonb,
  	"date" timestamp(3) with time zone,
  	"image_id" uuid
  );
  
  CREATE TABLE "services_lessons_section_lessons" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" jsonb
  );
  
  CREATE TABLE "services_courses_additional_info" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "services_courses_lessons_section_lessons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" jsonb
  );
  
  CREATE TABLE "services_courses" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" jsonb,
  	"lessons_section_title" varchar DEFAULT 'Obsah',
  	"lessons_section_description" varchar,
  	"lessons_section_show_lesson_numbers" boolean DEFAULT false
  );
  
  CREATE TABLE "services_schedules_schedule_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"start_date" timestamp(3) with time zone NOT NULL,
  	"end_date" timestamp(3) with time zone NOT NULL,
  	"lesson" varchar NOT NULL,
  	"notes" varchar,
  	"status" "enum_services_schedules_schedule_items_status" DEFAULT 'scheduled',
  	"has_limited_spots" boolean DEFAULT false,
  	"number_of_spots" numeric DEFAULT 10
  );
  
  CREATE TABLE "services_schedules" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"course_index" varchar,
  	"status" "enum_services_schedules_status" DEFAULT 'scheduled',
  	"has_limited_spots" boolean DEFAULT false,
  	"number_of_spots" numeric DEFAULT 10
  );
  
  CREATE TABLE "services" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"slug" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"icon_file_icon_id" uuid,
  	"icon_lucide_icon" varchar,
  	"card_description" jsonb NOT NULL,
  	"detail_content" jsonb,
  	"detail_note" jsonb,
  	"detail_benefits_section_enabled" boolean DEFAULT false,
  	"detail_benefits_section_title" varchar DEFAULT 'Výhody',
  	"detail_package_section_enabled" boolean DEFAULT false,
  	"detail_package_section_title" varchar DEFAULT 'Balíčky služeb',
  	"detail_package_section_description" varchar,
  	"detail_announcements_section_enabled" boolean DEFAULT false,
  	"service_type" "enum_services_service_type" DEFAULT 'courses',
  	"lessons_section_title" varchar DEFAULT 'Obsah',
  	"lessons_section_description" varchar,
  	"lessons_section_show_lesson_numbers" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "reviews" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"rating" numeric NOT NULL,
  	"content" jsonb NOT NULL,
  	"author" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "downloads" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"folder_id" uuid,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"alt" varchar NOT NULL,
  	"folder_id" uuid,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_tablet_url" varchar,
  	"sizes_tablet_width" numeric,
  	"sizes_tablet_height" numeric,
  	"sizes_tablet_mime_type" varchar,
  	"sizes_tablet_filesize" numeric,
  	"sizes_tablet_filename" varchar,
  	"sizes_desktop_url" varchar,
  	"sizes_desktop_width" numeric,
  	"sizes_desktop_height" numeric,
  	"sizes_desktop_mime_type" varchar,
  	"sizes_desktop_filesize" numeric,
  	"sizes_desktop_filename" varchar
  );
  
  CREATE TABLE "blogs" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"slug" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"head_image_id" uuid,
  	"content" jsonb NOT NULL,
  	"published_at" timestamp(3) with time zone,
  	"author" varchar,
  	"category_id" uuid,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "blog_categories" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_folders_folder_type" (
  	"order" integer NOT NULL,
  	"parent_id" uuid NOT NULL,
  	"value" "enum_payload_folders_folder_type",
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL
  );
  
  CREATE TABLE "payload_folders" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar NOT NULL,
  	"folder_id" uuid,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" uuid,
  	"reviews_id" uuid,
  	"downloads_id" uuid,
  	"users_id" uuid,
  	"media_id" uuid,
  	"blogs_id" uuid,
  	"blog_categories_id" uuid,
  	"payload_folders_id" uuid
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" uuid
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "home_page_hero_hero_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hero_image_id" uuid
  );
  
  CREATE TABLE "home_page_hero_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_home_page_hero_cta_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_reference" "enum_home_page_hero_cta_buttons_link_reference",
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_services_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "home_page_services_cta_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_home_page_services_cta_button_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_reference" "enum_home_page_services_cta_button_link_reference",
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_reviews_reviews" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "home_page" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"hero_title" varchar NOT NULL,
  	"hero_quote" varchar,
  	"hero_subtitle" varchar,
  	"hero_switch_interval" numeric DEFAULT 6,
  	"services_title" varchar NOT NULL,
  	"services_subtitle" varchar,
  	"reviews_title" varchar NOT NULL,
  	"reviews_subtitle" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_page_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" uuid,
  	"reviews_id" uuid
  );
  
  CREATE TABLE "items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"services_section_icon" varchar,
  	"services_section_title" varchar,
  	"services_section_description" varchar
  );
  
  CREATE TABLE "svc_page" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"page_header_title" varchar NOT NULL,
  	"page_header_subtitle" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "svc_page_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" uuid
  );
  
  CREATE TABLE "announce" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" jsonb,
  	"date" timestamp(3) with time zone,
  	"image_id" uuid
  );
  
  CREATE TABLE "weekly_svc_page" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"page_header_title" varchar NOT NULL,
  	"page_header_subtitle" varchar,
  	"info_section_title" varchar DEFAULT 'Aktuality a oznámení' NOT NULL,
  	"info_section_description" varchar,
  	"info_section_announcements_section_enabled" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about_page_my_values_section_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "about_page_cta_section_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_about_page_cta_section_cta_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_reference" "enum_about_page_cta_section_cta_buttons_link_reference",
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "about_page" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"page_header_title" varchar NOT NULL,
  	"page_header_subtitle" varchar,
  	"image_id" uuid,
  	"title" varchar NOT NULL,
  	"content" jsonb NOT NULL,
  	"my_values_section_show_my_values" boolean,
  	"my_values_section_title" varchar DEFAULT 'Moje hodnoty',
  	"cta_section_title" varchar NOT NULL,
  	"cta_section_subtitle" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_page_contact_info" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"value" varchar,
  	"formatted_value" jsonb,
  	"value_type" "enum_contact_page_contact_info_value_type" DEFAULT 'text'
  );
  
  CREATE TABLE "contact_page" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"page_header_title" varchar NOT NULL,
  	"page_header_subtitle" varchar,
  	"note" jsonb,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "downloads_page_downloads" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"file_id" uuid
  );
  
  CREATE TABLE "downloads_page_important_info_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar NOT NULL
  );
  
  CREATE TABLE "downloads_page" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"page_header_title" varchar NOT NULL,
  	"page_header_subtitle" varchar,
  	"password_hash" varchar,
  	"new_password" varchar,
  	"important_title" varchar DEFAULT 'Důležité informace',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "blog_page_blog_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"blog_post_id" uuid
  );
  
  CREATE TABLE "blog_page" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"page_header_title" varchar NOT NULL,
  	"page_header_subtitle" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_reference" "enum_header_nav_items_link_reference",
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "header" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"logo_img_id" uuid,
  	"logo_lucide_icon" varchar,
  	"header_title" varchar NOT NULL,
  	"header_sub_title" varchar,
  	"phone" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"logo_img_id" uuid,
  	"logo_lucide_icon" varchar,
  	"footer_title" varchar NOT NULL,
  	"footer_sub_title" varchar,
  	"downloads_section_enabled" boolean DEFAULT true,
  	"downloads_section_title" varchar DEFAULT 'Pro klienty',
  	"downloads_section_link" varchar DEFAULT 'Dokumenty ke stažení',
  	"downloads_section_description" varchar DEFAULT 'Přístup k užitečným materiálům a dokumentům pro mé klientky.',
  	"contact_title" varchar DEFAULT 'Kontakt' NOT NULL,
  	"contact_phone" varchar,
  	"contact_email" varchar,
  	"contact_adress" varchar,
  	"bottom_text" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "announcement" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"banner_enabled" boolean DEFAULT false,
  	"modal_enabled" boolean DEFAULT false,
  	"banner_message" jsonb,
  	"banner_type" "enum_announcement_banner_type" DEFAULT 'info',
  	"banner_dismissible" boolean DEFAULT true,
  	"banner_show_once" boolean DEFAULT true,
  	"modal_title" varchar,
  	"modal_message" jsonb,
  	"modal_type" "enum_announcement_modal_type" DEFAULT 'info',
  	"modal_dismissible" boolean DEFAULT true,
  	"modal_show_once" boolean DEFAULT true,
  	"modal_button_text" varchar DEFAULT 'Rozumím',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "services_card_additional_info" ADD CONSTRAINT "services_card_additional_info_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_detail_additional_info" ADD CONSTRAINT "services_detail_additional_info_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_detail_benefits_section_benefits" ADD CONSTRAINT "services_detail_benefits_section_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_detail_package_section_packages_included_offers" ADD CONSTRAINT "services_detail_package_section_packages_included_offers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_detail_package_section_packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_detail_package_section_packages" ADD CONSTRAINT "services_detail_package_section_packages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_detail_announcements_section_announcements" ADD CONSTRAINT "services_detail_announcements_section_announcements_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_detail_announcements_section_announcements" ADD CONSTRAINT "services_detail_announcements_section_announcements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_lessons_section_lessons" ADD CONSTRAINT "services_lessons_section_lessons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_courses_additional_info" ADD CONSTRAINT "services_courses_additional_info_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_courses_lessons_section_lessons" ADD CONSTRAINT "services_courses_lessons_section_lessons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_courses" ADD CONSTRAINT "services_courses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_schedules_schedule_items" ADD CONSTRAINT "services_schedules_schedule_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_schedules"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_schedules" ADD CONSTRAINT "services_schedules_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_icon_file_icon_id_media_id_fk" FOREIGN KEY ("icon_file_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "downloads" ADD CONSTRAINT "downloads_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media" ADD CONSTRAINT "media_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blogs" ADD CONSTRAINT "blogs_head_image_id_media_id_fk" FOREIGN KEY ("head_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blogs" ADD CONSTRAINT "blogs_category_id_blog_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."blog_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_folders_folder_type" ADD CONSTRAINT "payload_folders_folder_type_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_folders" ADD CONSTRAINT "payload_folders_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_reviews_fk" FOREIGN KEY ("reviews_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_downloads_fk" FOREIGN KEY ("downloads_id") REFERENCES "public"."downloads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blogs_fk" FOREIGN KEY ("blogs_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blog_categories_fk" FOREIGN KEY ("blog_categories_id") REFERENCES "public"."blog_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_folders_fk" FOREIGN KEY ("payload_folders_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_hero_hero_images" ADD CONSTRAINT "home_page_hero_hero_images_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_hero_hero_images" ADD CONSTRAINT "home_page_hero_hero_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_hero_cta_buttons" ADD CONSTRAINT "home_page_hero_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_services_services" ADD CONSTRAINT "home_page_services_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_services_cta_button" ADD CONSTRAINT "home_page_services_cta_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_reviews_reviews" ADD CONSTRAINT "home_page_reviews_reviews_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_reviews_fk" FOREIGN KEY ("reviews_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "items" ADD CONSTRAINT "items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections" ADD CONSTRAINT "sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."svc_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "svc_page_rels" ADD CONSTRAINT "svc_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."svc_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "svc_page_rels" ADD CONSTRAINT "svc_page_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "announce" ADD CONSTRAINT "announce_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "announce" ADD CONSTRAINT "announce_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."weekly_svc_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_my_values_section_values" ADD CONSTRAINT "about_page_my_values_section_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_cta_section_cta_buttons" ADD CONSTRAINT "about_page_cta_section_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page_contact_info" ADD CONSTRAINT "contact_page_contact_info_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "downloads_page_downloads" ADD CONSTRAINT "downloads_page_downloads_file_id_downloads_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."downloads"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "downloads_page_downloads" ADD CONSTRAINT "downloads_page_downloads_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."downloads_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "downloads_page_important_info_items" ADD CONSTRAINT "downloads_page_important_info_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."downloads_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_page_blog_posts" ADD CONSTRAINT "blog_page_blog_posts_blog_post_id_blogs_id_fk" FOREIGN KEY ("blog_post_id") REFERENCES "public"."blogs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_page_blog_posts" ADD CONSTRAINT "blog_page_blog_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_logo_img_id_media_id_fk" FOREIGN KEY ("logo_img_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer" ADD CONSTRAINT "footer_logo_img_id_media_id_fk" FOREIGN KEY ("logo_img_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "services_card_additional_info_order_idx" ON "services_card_additional_info" USING btree ("_order");
  CREATE INDEX "services_card_additional_info_parent_id_idx" ON "services_card_additional_info" USING btree ("_parent_id");
  CREATE INDEX "services_detail_additional_info_order_idx" ON "services_detail_additional_info" USING btree ("_order");
  CREATE INDEX "services_detail_additional_info_parent_id_idx" ON "services_detail_additional_info" USING btree ("_parent_id");
  CREATE INDEX "services_detail_benefits_section_benefits_order_idx" ON "services_detail_benefits_section_benefits" USING btree ("_order");
  CREATE INDEX "services_detail_benefits_section_benefits_parent_id_idx" ON "services_detail_benefits_section_benefits" USING btree ("_parent_id");
  CREATE INDEX "services_detail_package_section_packages_included_offers_order_idx" ON "services_detail_package_section_packages_included_offers" USING btree ("_order");
  CREATE INDEX "services_detail_package_section_packages_included_offers_parent_id_idx" ON "services_detail_package_section_packages_included_offers" USING btree ("_parent_id");
  CREATE INDEX "services_detail_package_section_packages_order_idx" ON "services_detail_package_section_packages" USING btree ("_order");
  CREATE INDEX "services_detail_package_section_packages_parent_id_idx" ON "services_detail_package_section_packages" USING btree ("_parent_id");
  CREATE INDEX "services_detail_announcements_section_announcements_order_idx" ON "services_detail_announcements_section_announcements" USING btree ("_order");
  CREATE INDEX "services_detail_announcements_section_announcements_parent_id_idx" ON "services_detail_announcements_section_announcements" USING btree ("_parent_id");
  CREATE INDEX "services_detail_announcements_section_announcements_imag_idx" ON "services_detail_announcements_section_announcements" USING btree ("image_id");
  CREATE INDEX "services_lessons_section_lessons_order_idx" ON "services_lessons_section_lessons" USING btree ("_order");
  CREATE INDEX "services_lessons_section_lessons_parent_id_idx" ON "services_lessons_section_lessons" USING btree ("_parent_id");
  CREATE INDEX "services_courses_additional_info_order_idx" ON "services_courses_additional_info" USING btree ("_order");
  CREATE INDEX "services_courses_additional_info_parent_id_idx" ON "services_courses_additional_info" USING btree ("_parent_id");
  CREATE INDEX "services_courses_lessons_section_lessons_order_idx" ON "services_courses_lessons_section_lessons" USING btree ("_order");
  CREATE INDEX "services_courses_lessons_section_lessons_parent_id_idx" ON "services_courses_lessons_section_lessons" USING btree ("_parent_id");
  CREATE INDEX "services_courses_order_idx" ON "services_courses" USING btree ("_order");
  CREATE INDEX "services_courses_parent_id_idx" ON "services_courses" USING btree ("_parent_id");
  CREATE INDEX "services_schedules_schedule_items_order_idx" ON "services_schedules_schedule_items" USING btree ("_order");
  CREATE INDEX "services_schedules_schedule_items_parent_id_idx" ON "services_schedules_schedule_items" USING btree ("_parent_id");
  CREATE INDEX "services_schedules_order_idx" ON "services_schedules" USING btree ("_order");
  CREATE INDEX "services_schedules_parent_id_idx" ON "services_schedules" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_icon_icon_file_icon_idx" ON "services" USING btree ("icon_file_icon_id");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "reviews_updated_at_idx" ON "reviews" USING btree ("updated_at");
  CREATE INDEX "reviews_created_at_idx" ON "reviews" USING btree ("created_at");
  CREATE INDEX "downloads_folder_idx" ON "downloads" USING btree ("folder_id");
  CREATE INDEX "downloads_updated_at_idx" ON "downloads" USING btree ("updated_at");
  CREATE INDEX "downloads_created_at_idx" ON "downloads" USING btree ("created_at");
  CREATE UNIQUE INDEX "downloads_filename_idx" ON "downloads" USING btree ("filename");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_folder_idx" ON "media" USING btree ("folder_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_tablet_sizes_tablet_filename_idx" ON "media" USING btree ("sizes_tablet_filename");
  CREATE INDEX "media_sizes_desktop_sizes_desktop_filename_idx" ON "media" USING btree ("sizes_desktop_filename");
  CREATE UNIQUE INDEX "blogs_slug_idx" ON "blogs" USING btree ("slug");
  CREATE INDEX "blogs_head_image_idx" ON "blogs" USING btree ("head_image_id");
  CREATE INDEX "blogs_category_idx" ON "blogs" USING btree ("category_id");
  CREATE INDEX "blogs_updated_at_idx" ON "blogs" USING btree ("updated_at");
  CREATE INDEX "blogs_created_at_idx" ON "blogs" USING btree ("created_at");
  CREATE INDEX "blog_categories_updated_at_idx" ON "blog_categories" USING btree ("updated_at");
  CREATE INDEX "blog_categories_created_at_idx" ON "blog_categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_folders_folder_type_order_idx" ON "payload_folders_folder_type" USING btree ("order");
  CREATE INDEX "payload_folders_folder_type_parent_idx" ON "payload_folders_folder_type" USING btree ("parent_id");
  CREATE INDEX "payload_folders_name_idx" ON "payload_folders" USING btree ("name");
  CREATE INDEX "payload_folders_folder_idx" ON "payload_folders" USING btree ("folder_id");
  CREATE INDEX "payload_folders_updated_at_idx" ON "payload_folders" USING btree ("updated_at");
  CREATE INDEX "payload_folders_created_at_idx" ON "payload_folders" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_reviews_id_idx" ON "payload_locked_documents_rels" USING btree ("reviews_id");
  CREATE INDEX "payload_locked_documents_rels_downloads_id_idx" ON "payload_locked_documents_rels" USING btree ("downloads_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_blogs_id_idx" ON "payload_locked_documents_rels" USING btree ("blogs_id");
  CREATE INDEX "payload_locked_documents_rels_blog_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("blog_categories_id");
  CREATE INDEX "payload_locked_documents_rels_payload_folders_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_folders_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "home_page_hero_hero_images_order_idx" ON "home_page_hero_hero_images" USING btree ("_order");
  CREATE INDEX "home_page_hero_hero_images_parent_id_idx" ON "home_page_hero_hero_images" USING btree ("_parent_id");
  CREATE INDEX "home_page_hero_hero_images_hero_image_idx" ON "home_page_hero_hero_images" USING btree ("hero_image_id");
  CREATE INDEX "home_page_hero_cta_buttons_order_idx" ON "home_page_hero_cta_buttons" USING btree ("_order");
  CREATE INDEX "home_page_hero_cta_buttons_parent_id_idx" ON "home_page_hero_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "home_page_services_services_order_idx" ON "home_page_services_services" USING btree ("_order");
  CREATE INDEX "home_page_services_services_parent_id_idx" ON "home_page_services_services" USING btree ("_parent_id");
  CREATE INDEX "home_page_services_cta_button_order_idx" ON "home_page_services_cta_button" USING btree ("_order");
  CREATE INDEX "home_page_services_cta_button_parent_id_idx" ON "home_page_services_cta_button" USING btree ("_parent_id");
  CREATE INDEX "home_page_reviews_reviews_order_idx" ON "home_page_reviews_reviews" USING btree ("_order");
  CREATE INDEX "home_page_reviews_reviews_parent_id_idx" ON "home_page_reviews_reviews" USING btree ("_parent_id");
  CREATE INDEX "home_page_rels_order_idx" ON "home_page_rels" USING btree ("order");
  CREATE INDEX "home_page_rels_parent_idx" ON "home_page_rels" USING btree ("parent_id");
  CREATE INDEX "home_page_rels_path_idx" ON "home_page_rels" USING btree ("path");
  CREATE INDEX "home_page_rels_services_id_idx" ON "home_page_rels" USING btree ("services_id");
  CREATE INDEX "home_page_rels_reviews_id_idx" ON "home_page_rels" USING btree ("reviews_id");
  CREATE INDEX "items_order_idx" ON "items" USING btree ("_order");
  CREATE INDEX "items_parent_id_idx" ON "items" USING btree ("_parent_id");
  CREATE INDEX "sections_order_idx" ON "sections" USING btree ("_order");
  CREATE INDEX "sections_parent_id_idx" ON "sections" USING btree ("_parent_id");
  CREATE INDEX "svc_page_rels_order_idx" ON "svc_page_rels" USING btree ("order");
  CREATE INDEX "svc_page_rels_parent_idx" ON "svc_page_rels" USING btree ("parent_id");
  CREATE INDEX "svc_page_rels_path_idx" ON "svc_page_rels" USING btree ("path");
  CREATE INDEX "svc_page_rels_services_id_idx" ON "svc_page_rels" USING btree ("services_id");
  CREATE INDEX "announce_order_idx" ON "announce" USING btree ("_order");
  CREATE INDEX "announce_parent_id_idx" ON "announce" USING btree ("_parent_id");
  CREATE INDEX "announce_image_idx" ON "announce" USING btree ("image_id");
  CREATE INDEX "about_page_my_values_section_values_order_idx" ON "about_page_my_values_section_values" USING btree ("_order");
  CREATE INDEX "about_page_my_values_section_values_parent_id_idx" ON "about_page_my_values_section_values" USING btree ("_parent_id");
  CREATE INDEX "about_page_cta_section_cta_buttons_order_idx" ON "about_page_cta_section_cta_buttons" USING btree ("_order");
  CREATE INDEX "about_page_cta_section_cta_buttons_parent_id_idx" ON "about_page_cta_section_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "about_page_image_idx" ON "about_page" USING btree ("image_id");
  CREATE INDEX "contact_page_contact_info_order_idx" ON "contact_page_contact_info" USING btree ("_order");
  CREATE INDEX "contact_page_contact_info_parent_id_idx" ON "contact_page_contact_info" USING btree ("_parent_id");
  CREATE INDEX "downloads_page_downloads_order_idx" ON "downloads_page_downloads" USING btree ("_order");
  CREATE INDEX "downloads_page_downloads_parent_id_idx" ON "downloads_page_downloads" USING btree ("_parent_id");
  CREATE INDEX "downloads_page_downloads_file_idx" ON "downloads_page_downloads" USING btree ("file_id");
  CREATE INDEX "downloads_page_important_info_items_order_idx" ON "downloads_page_important_info_items" USING btree ("_order");
  CREATE INDEX "downloads_page_important_info_items_parent_id_idx" ON "downloads_page_important_info_items" USING btree ("_parent_id");
  CREATE INDEX "blog_page_blog_posts_order_idx" ON "blog_page_blog_posts" USING btree ("_order");
  CREATE INDEX "blog_page_blog_posts_parent_id_idx" ON "blog_page_blog_posts" USING btree ("_parent_id");
  CREATE INDEX "blog_page_blog_posts_blog_post_idx" ON "blog_page_blog_posts" USING btree ("blog_post_id");
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX "header_logo_logo_img_idx" ON "header" USING btree ("logo_img_id");
  CREATE INDEX "footer_logo_logo_img_idx" ON "footer" USING btree ("logo_img_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "services_card_additional_info" CASCADE;
  DROP TABLE "services_detail_additional_info" CASCADE;
  DROP TABLE "services_detail_benefits_section_benefits" CASCADE;
  DROP TABLE "services_detail_package_section_packages_included_offers" CASCADE;
  DROP TABLE "services_detail_package_section_packages" CASCADE;
  DROP TABLE "services_detail_announcements_section_announcements" CASCADE;
  DROP TABLE "services_lessons_section_lessons" CASCADE;
  DROP TABLE "services_courses_additional_info" CASCADE;
  DROP TABLE "services_courses_lessons_section_lessons" CASCADE;
  DROP TABLE "services_courses" CASCADE;
  DROP TABLE "services_schedules_schedule_items" CASCADE;
  DROP TABLE "services_schedules" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "reviews" CASCADE;
  DROP TABLE "downloads" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "blogs" CASCADE;
  DROP TABLE "blog_categories" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_folders_folder_type" CASCADE;
  DROP TABLE "payload_folders" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "home_page_hero_hero_images" CASCADE;
  DROP TABLE "home_page_hero_cta_buttons" CASCADE;
  DROP TABLE "home_page_services_services" CASCADE;
  DROP TABLE "home_page_services_cta_button" CASCADE;
  DROP TABLE "home_page_reviews_reviews" CASCADE;
  DROP TABLE "home_page" CASCADE;
  DROP TABLE "home_page_rels" CASCADE;
  DROP TABLE "items" CASCADE;
  DROP TABLE "sections" CASCADE;
  DROP TABLE "svc_page" CASCADE;
  DROP TABLE "svc_page_rels" CASCADE;
  DROP TABLE "announce" CASCADE;
  DROP TABLE "weekly_svc_page" CASCADE;
  DROP TABLE "about_page_my_values_section_values" CASCADE;
  DROP TABLE "about_page_cta_section_cta_buttons" CASCADE;
  DROP TABLE "about_page" CASCADE;
  DROP TABLE "contact_page_contact_info" CASCADE;
  DROP TABLE "contact_page" CASCADE;
  DROP TABLE "downloads_page_downloads" CASCADE;
  DROP TABLE "downloads_page_important_info_items" CASCADE;
  DROP TABLE "downloads_page" CASCADE;
  DROP TABLE "blog_page_blog_posts" CASCADE;
  DROP TABLE "blog_page" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "announcement" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_services_schedules_schedule_items_status";
  DROP TYPE "public"."enum_services_schedules_status";
  DROP TYPE "public"."enum_services_service_type";
  DROP TYPE "public"."enum_payload_folders_folder_type";
  DROP TYPE "public"."enum_home_page_hero_cta_buttons_link_type";
  DROP TYPE "public"."enum_home_page_hero_cta_buttons_link_reference";
  DROP TYPE "public"."enum_home_page_services_cta_button_link_type";
  DROP TYPE "public"."enum_home_page_services_cta_button_link_reference";
  DROP TYPE "public"."enum_about_page_cta_section_cta_buttons_link_type";
  DROP TYPE "public"."enum_about_page_cta_section_cta_buttons_link_reference";
  DROP TYPE "public"."enum_contact_page_contact_info_value_type";
  DROP TYPE "public"."enum_header_nav_items_link_type";
  DROP TYPE "public"."enum_header_nav_items_link_reference";
  DROP TYPE "public"."enum_announcement_banner_type";
  DROP TYPE "public"."enum_announcement_modal_type";`)
}
