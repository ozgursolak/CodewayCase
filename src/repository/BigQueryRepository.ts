import { BigQuery } from '@google-cloud/bigquery';
import { Service } from "typedi";
import { Constants } from '../constant/Constants';

@Service()
export class BigQueryRepository {
    private bigquery: BigQuery;
  
    constructor() {
        this.bigquery = new BigQuery();
    }

    async getSummary(): Promise<object> {
        const query = ` 
        WITH total_users AS ( 
          SELECT IFNULL(COUNT(DISTINCT user_id), 0) AS total_user_count  FROM  ${Constants.BQ_TABLE_NAME}
        ),
      
        daily_active_user AS (
          SELECT IFNULL(COUNT(DISTINCT user_id), 0) AS daily_active_user_count, DATE(TIMESTAMP_SECONDS(event_time)) AS enterDate 
          FROM  ${Constants.BQ_TABLE_NAME} GROUP BY DATE(TIMESTAMP_SECONDS(event_time))
        ),
      
        daily_new_user AS (
          SELECT  IFNULL(COUNT(DISTINCT user_id), 0) AS daily_new_user_count, a.date  
          FROM ( SELECT user_id, DATE(TIMESTAMP_SECONDS(MIN(event_time))) AS date FROM  ${Constants.BQ_TABLE_NAME} GROUP BY (user_id)) a
          GROUP BY a.date
        ),
      
        daily_avg_session AS ( 
          SELECT AVG(a.sessionDurationsPerDay) AS average_session_duration, a.day FROM
            ( SELECT  DATE(TIMESTAMP_SECONDS(event_time)) AS day, session_id as sessionId, (MAX(event_time) - MIN(event_time)) AS sessionDurationsPerDay 
            FROM  ${Constants.BQ_TABLE_NAME} GROUP BY session_id, DATE(TIMESTAMP_SECONDS(event_time))) a
          GROUP BY a.day 
        ),   
      
        daily_statistics AS (
          SELECT
          ARRAY_AGG(STRUCT(STRING(a.date) AS date, a.average_session_duration, IFNULL(a.daily_active_user_count, 0) AS active_user_count, IFNULL(a.daily_new_user_count, 0) AS new_user_count) ORDER BY a.date ASC) AS  daily_stats 
          FROM (
            SELECT dau.daily_active_user_count, dnw.daily_new_user_count, das.average_session_duration, dau.enterDate AS date  FROM daily_active_user dau
            LEFT JOIN daily_new_user dnw ON dnw.date = dau.enterDate
            LEFT JOIN daily_avg_session das ON das.day = dau.enterDate
          )  a
        )
      
        SELECT  
        total_users.total_user_count AS total_users,
        daily_stats
        FROM total_users
        LEFT JOIN daily_statistics ON true
        `

        const options = {
            query: query,
            location: Constants.BQ_DATA_LOCATION,
        };
         
        const [job] = await this.bigquery.createQueryJob(options);
        const [rows] = await job.getQueryResults();
        
        console.log(`Job ${job.id} returned query succesfully.`);
        
        return rows[0];
    }
}