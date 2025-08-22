CREATE TABLE "serial_number" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	"created_by" integer,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "serial_number_code_unique" UNIQUE("code")
);
--> statement-breakpoint
DROP TABLE "cmms" CASCADE;--> statement-breakpoint
DROP TABLE "electrical_testing_processes" CASCADE;--> statement-breakpoint
ALTER TABLE "serial_number" ADD CONSTRAINT "serial_number_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "auto_category";