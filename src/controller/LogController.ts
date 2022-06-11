import { Body, Get, JsonController, Post } from "routing-controllers";
import { Inject, Service } from "typedi";
import { BigQueryService } from "../service/BigQueryService";
import { LogRequest } from "../model/request/LogRequest";
import { PubSubService } from '../service/PubSubService';

@JsonController()
@Service()
export class LogController {

  @Inject()
  private bigqueryService: BigQueryService;

  @Inject()
  private pubSubService: PubSubService;

  @Post('/event')
  async createEvent() {
    return await this.bigqueryService.createEventTableIfNotExists();
  }

  @Get('/summary')
  async getSummary() {
    return await this.bigqueryService.getSummary();
  }

  @Post('/topic')
  async createPubSubTopic() {
    return await this.pubSubService.createPubSubTopic();
  }

  @Post('/publish')
  async publishMessageToPubSub(@Body() logRequest: LogRequest) {
    return await this.pubSubService.publishMessage(logRequest);
  }
}