DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('user', 'admin', 'both');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"user_id" serial PRIMARY KEY NOT NULL,
	"full_name" varchar NOT NULL,
	"imageUrl" varchar,
	"email" varchar NOT NULL,
	"password" varchar,
	"contact_phone" varchar,
	"address" text,
	"role" "role" DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
