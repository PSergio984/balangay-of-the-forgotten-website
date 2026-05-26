import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_bosses_moveset_type" AS ENUM('Single Target', 'AoE', 'Buff', 'Ultimate', 'Passive');
  CREATE TYPE "public"."enum_characters_role" AS ENUM('Damage', 'Tank', 'Healer', 'Ranged');
  CREATE TYPE "public"."enum_news_category" AS ENUM('Lore', 'Game Update', 'Event', 'Milestone');
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
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
  
  CREATE TABLE "bosses_moveset" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"type" "enum_bosses_moveset_type",
  	"description" varchar
  );
  
  CREATE TABLE "bosses" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" jsonb,
  	"stats_hp" numeric NOT NULL,
  	"stats_atk" numeric NOT NULL,
  	"stats_mag" numeric NOT NULL,
  	"stats_def" numeric NOT NULL,
  	"location_id" integer,
  	"image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "minibosses" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" jsonb,
  	"stats_hp" numeric NOT NULL,
  	"stats_atk" numeric NOT NULL,
  	"stats_mag" numeric NOT NULL,
  	"stats_def" numeric NOT NULL,
  	"parent_boss_id" integer,
  	"location_id" integer,
  	"image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "relics" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" jsonb,
  	"effect" varchar,
  	"source_boss_id" integer,
  	"found_at_id" integer,
  	"image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "locations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" jsonb,
  	"parent_id" integer,
  	"image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "characters_presets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"stats_hp" numeric NOT NULL,
  	"stats_atk" numeric NOT NULL,
  	"stats_mag" numeric NOT NULL,
  	"stats_def" numeric NOT NULL
  );
  
  CREATE TABLE "characters_moveset" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"cooldown" numeric
  );
  
  CREATE TABLE "characters" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"role" "enum_characters_role" NOT NULL,
  	"description" jsonb,
  	"image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "news" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"category" "enum_news_category" NOT NULL,
  	"content" jsonb NOT NULL,
  	"published_date" timestamp(3) with time zone NOT NULL,
  	"image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "media_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "bosses_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "minibosses_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "relics_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "locations_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "characters_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "news_id" integer;
  ALTER TABLE "bosses_moveset" ADD CONSTRAINT "bosses_moveset_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."bosses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "bosses" ADD CONSTRAINT "bosses_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "bosses" ADD CONSTRAINT "bosses_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "minibosses" ADD CONSTRAINT "minibosses_parent_boss_id_bosses_id_fk" FOREIGN KEY ("parent_boss_id") REFERENCES "public"."bosses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "minibosses" ADD CONSTRAINT "minibosses_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "minibosses" ADD CONSTRAINT "minibosses_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "relics" ADD CONSTRAINT "relics_source_boss_id_bosses_id_fk" FOREIGN KEY ("source_boss_id") REFERENCES "public"."bosses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "relics" ADD CONSTRAINT "relics_found_at_id_locations_id_fk" FOREIGN KEY ("found_at_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "relics" ADD CONSTRAINT "relics_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "locations" ADD CONSTRAINT "locations_parent_id_locations_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "locations" ADD CONSTRAINT "locations_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "characters_presets" ADD CONSTRAINT "characters_presets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."characters"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "characters_moveset" ADD CONSTRAINT "characters_moveset_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."characters"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "characters" ADD CONSTRAINT "characters_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news" ADD CONSTRAINT "news_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "bosses_moveset_order_idx" ON "bosses_moveset" USING btree ("_order");
  CREATE INDEX "bosses_moveset_parent_id_idx" ON "bosses_moveset" USING btree ("_parent_id");
  CREATE INDEX "bosses_location_idx" ON "bosses" USING btree ("location_id");
  CREATE INDEX "bosses_image_idx" ON "bosses" USING btree ("image_id");
  CREATE INDEX "bosses_updated_at_idx" ON "bosses" USING btree ("updated_at");
  CREATE INDEX "bosses_created_at_idx" ON "bosses" USING btree ("created_at");
  CREATE UNIQUE INDEX "minibosses_slug_idx" ON "minibosses" USING btree ("slug");
  CREATE INDEX "minibosses_parent_boss_idx" ON "minibosses" USING btree ("parent_boss_id");
  CREATE INDEX "minibosses_location_idx" ON "minibosses" USING btree ("location_id");
  CREATE INDEX "minibosses_image_idx" ON "minibosses" USING btree ("image_id");
  CREATE INDEX "minibosses_updated_at_idx" ON "minibosses" USING btree ("updated_at");
  CREATE INDEX "minibosses_created_at_idx" ON "minibosses" USING btree ("created_at");
  CREATE UNIQUE INDEX "relics_slug_idx" ON "relics" USING btree ("slug");
  CREATE INDEX "relics_source_boss_idx" ON "relics" USING btree ("source_boss_id");
  CREATE INDEX "relics_found_at_idx" ON "relics" USING btree ("found_at_id");
  CREATE INDEX "relics_image_idx" ON "relics" USING btree ("image_id");
  CREATE INDEX "relics_updated_at_idx" ON "relics" USING btree ("updated_at");
  CREATE INDEX "relics_created_at_idx" ON "relics" USING btree ("created_at");
  CREATE UNIQUE INDEX "locations_slug_idx" ON "locations" USING btree ("slug");
  CREATE INDEX "locations_parent_idx" ON "locations" USING btree ("parent_id");
  CREATE INDEX "locations_image_idx" ON "locations" USING btree ("image_id");
  CREATE INDEX "locations_updated_at_idx" ON "locations" USING btree ("updated_at");
  CREATE INDEX "locations_created_at_idx" ON "locations" USING btree ("created_at");
  CREATE INDEX "characters_presets_order_idx" ON "characters_presets" USING btree ("_order");
  CREATE INDEX "characters_presets_parent_id_idx" ON "characters_presets" USING btree ("_parent_id");
  CREATE INDEX "characters_moveset_order_idx" ON "characters_moveset" USING btree ("_order");
  CREATE INDEX "characters_moveset_parent_id_idx" ON "characters_moveset" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "characters_slug_idx" ON "characters" USING btree ("slug");
  CREATE INDEX "characters_image_idx" ON "characters" USING btree ("image_id");
  CREATE INDEX "characters_updated_at_idx" ON "characters" USING btree ("updated_at");
  CREATE INDEX "characters_created_at_idx" ON "characters" USING btree ("created_at");
  CREATE UNIQUE INDEX "news_slug_idx" ON "news" USING btree ("slug");
  CREATE INDEX "news_image_idx" ON "news" USING btree ("image_id");
  CREATE INDEX "news_updated_at_idx" ON "news" USING btree ("updated_at");
  CREATE INDEX "news_created_at_idx" ON "news" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_bosses_fk" FOREIGN KEY ("bosses_id") REFERENCES "public"."bosses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_minibosses_fk" FOREIGN KEY ("minibosses_id") REFERENCES "public"."minibosses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_relics_fk" FOREIGN KEY ("relics_id") REFERENCES "public"."relics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_characters_fk" FOREIGN KEY ("characters_id") REFERENCES "public"."characters"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_bosses_id_idx" ON "payload_locked_documents_rels" USING btree ("bosses_id");
  CREATE INDEX "payload_locked_documents_rels_minibosses_id_idx" ON "payload_locked_documents_rels" USING btree ("minibosses_id");
  CREATE INDEX "payload_locked_documents_rels_relics_id_idx" ON "payload_locked_documents_rels" USING btree ("relics_id");
  CREATE INDEX "payload_locked_documents_rels_locations_id_idx" ON "payload_locked_documents_rels" USING btree ("locations_id");
  CREATE INDEX "payload_locked_documents_rels_characters_id_idx" ON "payload_locked_documents_rels" USING btree ("characters_id");
  CREATE INDEX "payload_locked_documents_rels_news_id_idx" ON "payload_locked_documents_rels" USING btree ("news_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "bosses_moveset" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "bosses" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "minibosses" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "relics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "locations" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "characters_presets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "characters_moveset" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "characters" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "news" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "media" CASCADE;
  DROP TABLE "bosses_moveset" CASCADE;
  DROP TABLE "bosses" CASCADE;
  DROP TABLE "minibosses" CASCADE;
  DROP TABLE "relics" CASCADE;
  DROP TABLE "locations" CASCADE;
  DROP TABLE "characters_presets" CASCADE;
  DROP TABLE "characters_moveset" CASCADE;
  DROP TABLE "characters" CASCADE;
  DROP TABLE "news" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_media_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_bosses_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_minibosses_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_relics_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_locations_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_characters_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_news_fk";
  
  DROP INDEX "payload_locked_documents_rels_media_id_idx";
  DROP INDEX "payload_locked_documents_rels_bosses_id_idx";
  DROP INDEX "payload_locked_documents_rels_minibosses_id_idx";
  DROP INDEX "payload_locked_documents_rels_relics_id_idx";
  DROP INDEX "payload_locked_documents_rels_locations_id_idx";
  DROP INDEX "payload_locked_documents_rels_characters_id_idx";
  DROP INDEX "payload_locked_documents_rels_news_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "media_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "bosses_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "minibosses_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "relics_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "locations_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "characters_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "news_id";
  DROP TYPE "public"."enum_bosses_moveset_type";
  DROP TYPE "public"."enum_characters_role";
  DROP TYPE "public"."enum_news_category";`)
}
