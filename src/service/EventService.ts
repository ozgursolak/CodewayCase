import 'reflect-metadata'

import { Service } from "typedi";
const {BigQuery} = require('@google-cloud/bigquery');
const bigquery = new BigQuery();

@Service()
export class EventService {

    async createTableEvents(): Promise<boolean> {
        const datasetId = "codeway";
        const tableId = "events";
        const schema = 'Name:string, Age:integer, Weight:float, IsMagic:boolean';
        const options = {
            schema: schema,
        };
      
        // Create a new table in the dataset
        const [table] = await bigquery
        .dataset(datasetId)
        .createTable(tableId, options);
      
        console.log(`Table ${table.id} created.`);

        return true;
    }
}