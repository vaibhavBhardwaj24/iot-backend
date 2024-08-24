import { relations } from "drizzle-orm/relations";
import { iot, appTemp } from "./schema";

export const appTempRelations = relations(appTemp, ({one}) => ({
	iot: one(iot, {
		fields: [appTemp.iotId],
		references: [iot.id]
	}),
}));

export const iotRelations = relations(iot, ({many}) => ({
	appTemps: many(appTemp),
}));