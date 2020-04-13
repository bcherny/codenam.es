DELETE from "public"."user_x_room";
ALTER TABLE "public"."user_x_room"
ADD CONSTRAINT UniqueRoomUserPair UNIQUE (room_id, user_id);