ALTER TABLE "appTemp" ALTER COLUMN "iotID" SET DATA TYPE uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "appTemp" ADD CONSTRAINT "appTemp_iotID_iot_id_fk" FOREIGN KEY ("iotID") REFERENCES "public"."iot"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
