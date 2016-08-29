/**
 * Created by l067164 on 29/04/2016.
 */
export class BaseException extends Error {
    constructor(message = '--') {
        super(message);
        this.message = message;
    }

    public toString() {
        return this.message;
    }
}

export class RouteNotFound extends BaseException {
    constructor(route) {
        super('View does not exist: ' + route.toString());
    }
}

export class InvalidFlowState extends BaseException {
    constructor(state) {
        super('View does not exist: ' + state.toString());
    }
}

export class InvalidRoute extends BaseException {
    constructor(state) {
        super('Invalid Route::: ' + state.toString());
    }
}
