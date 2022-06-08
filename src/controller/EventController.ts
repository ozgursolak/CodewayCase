import 'reflect-metadata'

import { Controller, Get, JsonController } from "routing-controllers";
import { Inject, Service } from "typedi";
import { EventService } from "../service/EventService";

@Controller()
@Service()
export class EventController {

  @Inject()
  private eventService: EventService;
  
  @Get('/')
  async getAll() {
    return await this.eventService.createEventTable();
  }
}