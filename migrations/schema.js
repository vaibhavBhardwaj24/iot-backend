import { pgTable, foreignKey, uuid, timestamp, numeric, text } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"




export const appTemp = pgTable("appTemp", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("createdAt", { withTimezone: true, mode: 'string' }).defaultNow(),
	iotId: uuid("iotID"),
	surroundingTemp: numeric("surroundingTemp"),
	coilTemp: numeric("coilTemp"),
	surroundingHumidity: numeric("surroundingHumidity"),
},
(table) => {
	return {
		appTempIotIdIotIdFk: foreignKey({
			columns: [table.iotId],
			foreignColumns: [iot.id],
			name: "appTemp_iotID_iot_id_fk"
		}).onDelete("cascade"),
	}
});

export const iot = pgTable("iot", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	type: text("type"),
	brand: text("brand"),
	createdAt: timestamp("createdAt", { withTimezone: true, mode: 'string' }).defaultNow(),
});