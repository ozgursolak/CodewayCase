import 'reflect-metadata'

import { createExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import { EventController }from './controller/EventController';

const PORT = 8080;

useContainer(Container);

const routes = [EventController];

const app = createExpressServer(
    {
        controllers: routes,
    }
);

app.listen(PORT, () => 
    { console.log(`Now listening on port ${PORT}`);
});