import { pgTable, uuid, text, timestamp, foreignKey, numeric, real } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"




export const iot = pgTable("iot", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	type: text("type"),
	brand: text("brand"),
	createdAt: timestamp("createdAt", { withTimezone: true, mode: 'string' }).defaultNow(),
	owner: uuid("owner"),
	model: text("model"),
	detail: text("detail"),
	ownerEmail: text("ownerEmail"),
});

export const appTemp = pgTable("appTemp", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("createdAt", { withTimezone: true, mode: 'string' }).defaultNow(),
	iotId: uuid("iotID"),
	surroundingTemp: numeric("surroundingTemp"),
	coilTemp: numeric("coilTemp"),
	surroundingHumidity: numeric("surroundingHumidity"),
	outsideTemp: numeric("outsideTemp"),
	outsideHumidity: numeric("outsideHumidity"),
	outsideCoilTemp: numeric("outsideCoilTemp"),
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

export const efficiencyPoint = pgTable("efficiencyPoint", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	iotId: uuid("iotID"),
	minVal: real("minVal"),
	q20: real("q20"),
	q40: real("q40"),
	q60: real("q60"),
	q80: real("q80"),
	maxVal: real("maxVal"),
},
(table) => {
	return {
		efficiencyPointIotIdIotIdFk: foreignKey({
			columns: [table.iotId],
			foreignColumns: [iot.id],
			name: "efficiencyPoint_iotID_iot_id_fk"
		}).onDelete("cascade"),
	}
});