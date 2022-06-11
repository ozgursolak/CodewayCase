# Codeway Case Study

In this project, I have created a small datapipeline to collect event logs from mobile devices through a HTTP POST endpoint and store those logs in Google BigQuery. 
The main architecture is like following: 

* The logs are published to **google pub service** and then used **dataflow api** to create job in order to export data from pubsub topic to bigquery.

## Important For Setup: 

* After cloning repository, you can create a image with this command: 
  * `docker build --no-cache . -t <your-image-name>`

* Then you can create and run a container via this command: 
  * `docker run -p <PORT>:8080 -d <your-image-name> `  

* After booting the app, you should send a post request to **/topic** endpoint in order to create topic named as **events** in pub sub service.

* Then you can send a post request to **/event** endpoint in order to create **event table** in bigquery service. The logs will be stored in this table.

* After creating a topic in pubsub and a table bigquery, we can publish a message with this endpoint: **/publish**
  
  * The request body is like following:
  ```json
    {
      "type": "deneme",
      "session_id": "9FDA74C2-AB57-4840-87D0-64324772B5A9",
      "event_name": "click",
      "event_time": 189646001,
      "page": "main",
      "country": "TR",
      "region": "Marmara",
      "city": "Istanbul",
      "user_id": "Uu1qJzlfrxYxOS5z1kfAbmSA6pF9"
    }
  ```
 
* After sending data to our pipeline, you can send a get request to **/summary** get summary about the data.

* Note that, in order to use these endpoints, you will need **google application credential** file and you should assign the path of this file to an enviroment variable named as <em><strong>GOOGLE_APPLICATION_CREDENTIALS<em><strong>.

