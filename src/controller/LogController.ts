import { Body, JsonController, Post } from "routing-controllers";
import { Inject, Service } from "typedi";
import { BigQueryService } from "../service/BigQueryService";
import { LogRequest } from "../model/request/LogRequest";
import { PubSubService } from '../service/PubSubService';


@JsonController()
@Service()
export class LogController {

  @Inject()
  private eventService: BigQueryService;

  @Inject()
  private pubSubService: PubSubService;
  
  @Post('/event')
  async createEvent() {
    return await this.eventService.createEventTableIfNotExists();
  }

  @Post('/publish')
  async publishMessageToPubSub(@Body() logRequest: LogRequest) {
    return await this.pubSubService.publishMessage(logRequest);
  }

  @Post('/topic')
  async createPubSubTopic() {
    return await this.pubSubService.createPubSubTopic();
  }
}