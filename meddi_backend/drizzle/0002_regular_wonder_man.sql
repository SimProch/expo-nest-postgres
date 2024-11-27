CREATE TABLE IF NOT EXISTS "temperature" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"city" varchar NOT NULL,
	"postcode" varchar NOT NULL,
	"temperature" varchar NOT NULL,
	"description" varchar NOT NULL,
	"latitute" varchar NOT NULL,
	"longtitude" varchar NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DROP INDEX IF EXISTS "email_idx";