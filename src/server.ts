import { createExpressServer } from 'routing-controllers';
import { EventController }from './controller/EventController';

const PORT = 8080;

const routes = [EventController];

const app = createExpressServer(
    {
        controllers: routes,
    }
);

app.listen(PORT, () => 
    { console.log(`Now listening on port ${PORT}`);
});