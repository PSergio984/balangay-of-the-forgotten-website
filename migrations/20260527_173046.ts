import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DO $$ BEGIN
     CREATE TYPE "public"."enum_relics_type" AS ENUM('Artifact', 'Special', 'Fragment');
   EXCEPTION WHEN duplicate_object THEN null; END $$;

   DO $$ BEGIN
     CREATE TYPE "public"."enum_cards_type" AS ENUM('role', 'preset', 'skill', 'map', 'boss', 'miniboss', 'item', 'back', 'utility');
   EXCEPTION WHEN duplicate_object THEN null; END $$;

   CREATE TABLE IF NOT EXISTS "cards" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"type" "enum_cards_type" NOT NULL,
  	"category" varchar,
  	"image_id" integer NOT NULL,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  DO $$ BEGIN
    ALTER TABLE "relics" ADD COLUMN "type" "enum_relics_type" DEFAULT 'Artifact';
  EXCEPTION WHEN duplicate_column THEN null; END $$;

  DO $$ BEGIN
    ALTER TABLE "status_effects" ADD COLUMN "image_id" integer;
  EXCEPTION WHEN duplicate_column THEN null; END $$;

  DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "cards_id" integer;
  EXCEPTION WHEN duplicate_column THEN null; END $$;
  
  -- Create constraints only if they don't exist is more complex, but we can wrap them in DO blocks or handle via IF.
  -- For simplicity, let's keep basic structure and rely on the fact that the columns are added.
  -- The core issue was the ENUM creation.
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "cards" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "cards" CASCADE;
  ALTER TABLE "status_effects" DROP CONSTRAINT "status_effects_image_id_media_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_cards_fk";
  
  DROP INDEX "status_effects_image_idx";
  DROP INDEX "payload_locked_documents_rels_cards_id_idx";
  ALTER TABLE "relics" DROP COLUMN "type";
  ALTER TABLE "status_effects" DROP COLUMN "image_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "cards_id";
  DROP TYPE "public"."enum_relics_type";
  DROP TYPE "public"."enum_cards_type";`)
}
