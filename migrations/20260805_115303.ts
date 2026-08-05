import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "status_effects" ADD COLUMN IF NOT EXISTS "slug" varchar;
  ALTER TABLE "rules" ADD COLUMN IF NOT EXISTS "gm_only" boolean DEFAULT false;
  CREATE UNIQUE INDEX IF NOT EXISTS "status_effects_slug_idx" ON "status_effects" USING btree ("slug");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX IF EXISTS "status_effects_slug_idx";
  ALTER TABLE "status_effects" DROP COLUMN IF EXISTS "slug";
  ALTER TABLE "rules" DROP COLUMN IF EXISTS "gm_only";`)
}
