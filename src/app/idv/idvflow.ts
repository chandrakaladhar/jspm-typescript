import {Flow} from '../core/flow';
import {idvIndividualRoute} from './idvroute';

let routeId = 'My Start Point';
let idvFlow;
try {
    idvFlow = new Flow()
        .configureRoute(idvIndividualRoute)
        .initialize(routeId);
    let currentState;
    while (idvFlow.hasNext()) {
        currentState = idvFlow.seekNext();
        console.log('State::::::::', currentState);
    }
} catch (err) {
    console.log(err.stack);
}

/**
 * Look back the earlier traversed path. Whats behind?
 */
//idvFlow.peekPrevious();
/**
 * Lookup the earlier traversed path. Whats ahead?
 */
//idvFlow.peekNext();
/**
 * First Validation happens if successful then moves to previous.
 */
//idvFlow.seekNext();
/**
 * Move to previous. No validation is required.
 */
//idvFlow.seekPrevious();
/**
 * Jump to a particular existing state. Time travel :)
 * Based on view id
 */
//idvFlow.seek(id);
/**
 * Peek/Get the traversed state for this id
 */
//idvFlow.peek(id);
/**
 * boolean value indicating the navigated previous value
 */
//idvFlow.hasPrevious();
/**
 * boolean value indicating the navigated next value
 */
//idvFlow.hasNext();
/**
 * Gets the current state
 */
//idvFlow.current();
