import { numeric, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const iot = pgTable("iot", {
  id: uuid("id").defaultRandom().primaryKey().notNull(), // id as uuid
  applianceType: text("type"),
  applianceBrand: text("brand"),
  createdAt: timestamp("createdAt", {
    withTimezone: true,
    mode: "string",
  }).defaultNow(),
});

export const appTemp = pgTable("appTemp", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  createdAt: timestamp("createdAt", {
    withTimezone: true,
    mode: "string",
  }).defaultNow(),
  surroundingTemp: numeric("surroundingTemp"),
  coilTemp: numeric("coilTemp"),
  surroundingHumidity: numeric("surroundingHumidity"),
  iotID: uuid("iotID").references(() => iot.id, {
    onDelete: "cascade",
  }), // iotID as uuid and references iot.id
});
