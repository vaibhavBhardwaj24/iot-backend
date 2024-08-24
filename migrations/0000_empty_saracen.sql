CREATE TABLE IF NOT EXISTS "appTemp" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now(),
	"iotID" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "iot" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" text,
	"brand" text,
	"createdAt" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "appTemp" ADD CONSTRAINT "appTemp_iotID_iot_id_fk" FOREIGN KEY ("iotID") REFERENCES "public"."iot"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
