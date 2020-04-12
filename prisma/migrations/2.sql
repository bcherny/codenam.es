DELETE from "public"."room";
DELETE from "public"."user";
ALTER TABLE "public"."room"
ADD COLUMN short_id VARCHAR(255) UNIQUE NOT NULL;
ALTER TABLE "public"."user"
ADD COLUMN short_id VARCHAR(255) UNIQUE NOT NULL;

