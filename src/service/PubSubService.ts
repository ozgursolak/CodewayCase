import { PubSub, Topic } from "@google-cloud/pubsub";
import { Service } from "typedi";
import { Constants } from "../constant/Constants";
import { LogRequest } from "../model/request/LogRequest";

@Service()
export class PubSubService {
    private pubSubClient: PubSub;
    private topic: Topic;
 
    constructor() {
        this.pubSubClient = new PubSub();   
    }

    async createPubSubTopic(): Promise<boolean> {
        const topic = this.pubSubClient.topic(Constants.TOPIC_ID);

        const topicData = await topic.get()
        const topicExists = topicData[0];
        
        this.topic = topicExists ? topicExists : (await this.pubSubClient.createTopic(Constants.TOPIC_ID))[0]

        return true;
    }

    async publishMessage(logRequest: LogRequest): Promise<boolean> { 
        const data = JSON.stringify(logRequest)
        const dataBuffer = Buffer.from(data);

        try {
            const messageId = await this.topic.publishMessage({ data: dataBuffer });

            console.log(`Message ${messageId} published.`);
        } catch (error) {
            console.error(`Received error while publishing: ${error.message}`);
            process.exitCode = 1;
        }

        return true;
    }
}