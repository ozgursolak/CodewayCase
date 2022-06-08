import 'reflect-metadata'

import { Service } from "typedi";

@Service()
export class EventService {

    async logger(a: String): Promise<String> {
        return a;
    }
}