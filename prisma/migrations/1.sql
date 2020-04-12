DELETE from "public"."user";
ALTER TABLE "public"."user"
ADD COLUMN user_id VARCHAR(255) UNIQUE NOT NULL;