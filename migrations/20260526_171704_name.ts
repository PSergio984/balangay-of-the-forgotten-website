import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_status_effects_type" AS ENUM('Buff', 'Debuff');
  CREATE TABLE "status_effects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"type" "enum_status_effects_type" NOT NULL,
  	"description" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "rules" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"content" jsonb NOT NULL,
  	"order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "status_effects_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "rules_id" integer;
  CREATE INDEX "status_effects_updated_at_idx" ON "status_effects" USING btree ("updated_at");
  CREATE INDEX "status_effects_created_at_idx" ON "status_effects" USING btree ("created_at");
  CREATE UNIQUE INDEX "rules_slug_idx" ON "rules" USING btree ("slug");
  CREATE INDEX "rules_updated_at_idx" ON "rules" USING btree ("updated_at");
  CREATE INDEX "rules_created_at_idx" ON "rules" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_status_effects_fk" FOREIGN KEY ("status_effects_id") REFERENCES "public"."status_effects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_rules_fk" FOREIGN KEY ("rules_id") REFERENCES "public"."rules"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_status_effects_id_idx" ON "payload_locked_documents_rels" USING btree ("status_effects_id");
  CREATE INDEX "payload_locked_documents_rels_rules_id_idx" ON "payload_locked_documents_rels" USING btree ("rules_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "status_effects" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rules" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "status_effects" CASCADE;
  DROP TABLE "rules" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_status_effects_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_rules_fk";
  
  DROP INDEX "payload_locked_documents_rels_status_effects_id_idx";
  DROP INDEX "payload_locked_documents_rels_rules_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "status_effects_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "rules_id";
  DROP TYPE "public"."enum_status_effects_type";`)
}
