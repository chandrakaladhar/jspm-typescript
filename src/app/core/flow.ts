import {RouteNotFound, InvalidFlowState, InvalidRoute} from './error';

export interface Direction {
    (model: Model): string;
}

export interface RouteStop {
    id: string;
    name: string;
    direction: Direction;
}

export interface RouteMap {
    [id: string]: RouteStop;
}

export class Route {
    private _routeMap: RouteMap;

    constructor(map?: RouteMap) {
        this._routeMap = map === void 0 ? {} : map;
    }

    public addStops(stops: RouteStop[]): Route {
        if (stops && this._routeMap) {
            for (let stop of stops) {
                this._routeMap[stop.id] = stop;
            }
        }
        return this;
    }

    /**
     * Checks if we have a stop with id
     * @param id
     * @returns {boolean}
     */
    public hasStop(id: string): boolean {
        return !!this._routeMap[id];
    }

    /**
     * get the stop for the current id
     * @param id
     * @returns {RouteStop}
     */
    public fetchStop(id: string): RouteStop {
        return this._routeMap[id];
    }
}

export interface Model {
    isValid(): boolean;
}

export class StopView {
    private _state: Model;
    private _name: string;
    private _id: string;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
    }

    /**
     *
     * @returns {string}
     */
    public get name(): string {
        return this._name;
    }

    /**
     *
     * @returns {string}
     */
    public get id(): string {
        return this._id;
    }

    /**
     * Accessor Method to set state
     * @param model
     */
    public set state(model: Model) {
        if (!model.isValid()) {
            throw new InvalidFlowState('Unable to save state. Invalid State');
        }
        this._state = model;
    }

    /**
     * Accessor Method to access state
     * @returns {Model}
     */
    public get state() {
        return this._state;
    }
}

export class Flow {
    private _dummy: StopView;
    // route has list of stops
    private _route: Route;
    // traversed route
    private _traversedRoute;
    // configure the route map- decision tree

    public configureRoute(route: Route): Flow {
        console.log('Inside Configure route:::::::::::::::::::::', route);
        this._route = route;
        return this;
    }

    /**
     *
     * @param stopId
     * @returns {Flow}
     */
    public initialize(stopId: string): Flow {
        if (!this._route.hasStop(stopId)) {
            throw new RouteNotFound('View does not exist. Please \'configureRoute\' before using initialize.');
        }
        let routeStop: RouteStop = this._route.fetchStop(stopId);
        this._traversedRoute = new TraversedRoute(new StopView(routeStop.id, routeStop.name)); // start to track
        return this;
    }

    /**
     * Look back the earlier traversed path. Whats behind?
     */
    public peekPrevious(): StopView {
        return this._dummy;
    }

    /**
     * Lookup the earlier traversed path. Whats ahead?
     */
    public peekNext(): StopView {
        return this._dummy;
    }

    /**
     * First Validation happens if successful then moves to previous.
     */
    public seekNext(): StopView {
        return this._dummy;
    }

    /**
     * Move to previous. No validation is required.
     */
    public seekPrevious(): StopView {
        return this._dummy;
    }

    /**
     * Jump to a particular existing state. Time travel :)
     * Based on view id
     */
    public seek(id: string): StopView {
        return this._dummy;
    }

    /**
     * Peek/Get the traversed state for this id
     */
    public peek(id: string): StopView {
        return this._dummy;
    }

    /**
     * boolean value indicating the navigated previous value
     */
    public hasPrevious(): boolean {
        return true;
    }

    /**
     * boolean value indicating the navigated next value
     */
    public hasNext(): boolean {
        return true;
    }

    /**
     * Gets the current state
     */
    public current(): StopView {
        return this._dummy;
    }
}

type LeftOrRight = 'left' | 'right';
interface Dictionary<T> {
    [id: string]: T;
}
/**
 * Stores the history.
 */
class TraversedRoute {
    private _currentStop: Tree<StopView>;
    private _tracker: Dictionary<Tree<StopView>> = {};

    constructor(stopView: StopView) {
        if (!(stopView && stopView.id)) throw new InvalidRoute('Invalid Stop');
        this._currentStop = new Tree<StopView>();
        this._currentStop.value = stopView;
        this._track(this._currentStop); //add to tracker
    }

    public addNext(stopView: StopView) {
        return this.addTo('left', stopView);
    }

    public addPrevious(stopView: StopView) {
        return this.addTo('right', stopView);
    }

    public addTo(where: LeftOrRight, stopView: StopView) {
        let partner: LeftOrRight = where === 'left' ? 'right' : 'left';
        let newStop = new Tree<StopView>();
        newStop.value = stopView;
        newStop[where] = this._currentStop;
        newStop[partner] = this._currentStop[partner];
        this._currentStop[partner] = newStop;
        this._currentStop = newStop;
        this._track(this._currentStop); //add to tracker
        return this;
    }

    private _track(node: Tree<StopView>) {
        if (!(node.value && node.value.id)) {
            throw new InvalidRoute('View is empty. It can\'t be added');
        }
        if (this._tracker[node.value.id]) {
            throw new InvalidRoute('Duplicate view can\'t be added');
        }

        this._tracker[node.value.id] = node;
    }

    private _buildTrack(): void {
        let stop = this._firstNode();
        let i = this.length;
        this._tracker = {};
        while (stop && stop.value.id && i-- >= 0) {
            this._tracker[stop.value.id] = stop;
            stop = stop.right;
        }
    }

    public get length(): number {
        let length = 0;
        for (let key in this._tracker) {
            if (this._tracker.hasOwnProperty(key)) {
                length++;
            }
        }
        return length;
    }

    private _firstNode(): Tree<StopView> {
        let stop = this._currentStop;
        let i = this.length;
        while ((stop && stop.left) && i-- >= 0) {
            stop = stop.left;
        }
        return stop;
    }

    // private _lastNode(): Tree<StopView> {
    //     let stop = this._currentStop;
    //     let i = this.length;
    //     while ((stop && stop.right) && i-- >= 0) {
    //         stop = stop.left;
    //     }
    //     return stop;
    // }

    public deLink(where: LeftOrRight) {
        if (this._currentStop) this._currentStop[where] = undefined;
        this._buildTrack();
        return this;
    }

    public current(): StopView {
        return this._currentStop && this._currentStop.value;
    }

    public moveEnd(where: LeftOrRight): StopView {
        let i = this.length; //placing a limit of 1000 to check cyclic error
        while ((this._currentStop && this._currentStop[where]) && i-- >= 0) {
            this._currentStop = this._currentStop[where];
        }
        return this._currentStop.value;
    }

    public moveFirst(): StopView {
        return this.moveEnd('left');
    }

    public moveLast(): StopView {
        return this.moveEnd('right');
    }

    public moveTo(stopId: string): StopView {
        if (this._tracker[stopId]) {
            this._currentStop = this._tracker[stopId];
        }
        return this._currentStop.value;
    }

    public hasVisited(stopId: string): boolean {
        return !!this._tracker[stopId];
    }
}

export class Tree<T> {
    public value: T;
    public left: Tree<T>;
    public right: Tree<T>;
}
