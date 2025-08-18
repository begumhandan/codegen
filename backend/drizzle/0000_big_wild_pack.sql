CREATE TABLE "cmms" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	"level" integer NOT NULL,
	"category" text NOT NULL,
	"created_by" integer,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "cmms_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "electrical_testing_processes" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	"level" integer NOT NULL,
	"category" text NOT NULL,
	"created_by" integer,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "electrical_testing_processes_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"role" text NOT NULL,
	"auto_category" text NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "cmms" ADD CONSTRAINT "cmms_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "electrical_testing_processes" ADD CONSTRAINT "electrical_testing_processes_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;