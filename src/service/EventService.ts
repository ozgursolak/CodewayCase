import { Dataset, Table, TableResponse } from '@google-cloud/bigquery';
import 'reflect-metadata'

import { Service } from "typedi";
const {BigQuery} = require('@google-cloud/bigquery');
const bigquery = new BigQuery();

@Service()
export class EventService {

    async createEventTable(): Promise<boolean> {
        const datasetId = "codeway";
        const tableId = "events";
        const schema = 'Name:string, Age:integer, Weight:float, IsMagic:boolean';
        const options = {
            schema: schema,
        };
         
        const [dataset] = await bigquery.dataset(datasetId).get({ autoCreate: true });
        const table = dataset.table(tableId);

        table.exists().then(async (data: any[]) => {
            const exists = data[0];
            if (!exists) {
                await dataset.createTable(tableId, options)
            }
        });
      
        return true;
    }
}