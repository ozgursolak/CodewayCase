
import { BigQuery } from '@google-cloud/bigquery';
import { Service } from "typedi";
import { Constants } from '../constant/Constants';

@Service()
export class BigQueryService {
    private bigquery: BigQuery;

    constructor() {
        this.bigquery = new BigQuery();
    }

    async createEventTableIfNotExists(): Promise<boolean> {
        const schema = [
            {name: 'type', type: 'STRING', mode: 'REQUIRED'},
            {name: 'session_id', type: 'STRING', mode: 'REQUIRED'},
            {name: 'event_name', type: 'STRING', mode: 'REQUIRED'},
            {name: 'event_time', type: 'INTEGER', mode: 'REQUIRED'},
            {name: 'page', type: 'STRING', mode: 'REQUIRED'},
            {name: 'country', type: 'STRING', mode: 'REQUIRED'},
            {name: 'region', type: 'STRING', mode: 'REQUIRED'},
            {name: 'city', type: 'STRING', mode: 'REQUIRED'},
            {name: 'user_id', type: 'STRING', mode: 'REQUIRED'},
        ]
        
        const options = {
            schema: schema,
        };
         
        const [dataset] = await this.bigquery.dataset(Constants.DATASET_ID).get({ autoCreate: true });
        const table = dataset.table(Constants.TABLE_ID);

        table.exists().then(async (data: any[]) => {
            const exists = data[0];
            if (!exists) {
                await dataset.createTable(Constants.TABLE_ID, options)
            }
        });
      
        return true;
    }
}