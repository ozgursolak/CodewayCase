import { Controller, Get } from "routing-controllers";


@Controller()
export class EventController {
  
  @Get('/users')
  getAll() {
    return 'This action returns all users';
  }
}