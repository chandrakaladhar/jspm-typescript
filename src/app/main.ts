import {Flow} from './core/flow';
import {idvIndividualRoute} from './idv/idvroute';
import './main.less!';
import './style.css!';
console.log('Inside Main.ts:::::::::::::::::');
let routeId = 'ct::id';
let idvFlow;
try {
    idvFlow = new Flow()
        .configureRoute(idvIndividualRoute)
        .initialize(routeId);
    console.log('Inside Main.ts:::', idvFlow);
    let currentState;
    if (idvFlow.hasNext()) {
        currentState = idvFlow.seekNext();
        console.log('State::::::::', currentState);
    }
} catch (err) {
    console.log(err.stack);
}
