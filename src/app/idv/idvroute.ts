import {RouteStop, Route} from '../core/flow';
export let idvIndividualRoute: Route;
let routeStops: RouteStop[];
routeStops = [{
    id: 'ct::id',
    name: 'create',
    direction: (viewModel) => 'ct::id2'
}, {
    id: 'ct::id2',
    name: 'create',
    direction: (viewModel) => 'ct::id3'

}, {
    id: 'ct::id3',
    name: 'create',
    direction: (viewModel) => 'ct::id3'
}];

idvIndividualRoute = new Route().addStops(routeStops);
