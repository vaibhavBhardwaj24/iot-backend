import { relations } from "drizzle-orm/relations";
import { iot, appTemp, efficiencyPoint } from "./schema";

export const appTempRelations = relations(appTemp, ({one}) => ({
	iot: one(iot, {
		fields: [appTemp.iotId],
		references: [iot.id]
	}),
}));

export const iotRelations = relations(iot, ({many}) => ({
	appTemps: many(appTemp),
	efficiencyPoints: many(efficiencyPoint),
}));

export const efficiencyPointRelations = relations(efficiencyPoint, ({one}) => ({
	iot: one(iot, {
		fields: [efficiencyPoint.iotId],
		references: [iot.id]
	}),
}));