import './main';
import {Flow} from './core/flow';
import {idvIndividualRoute} from './idv/idvroute';
describe('A suite', function () {
    it('contains spec with an expectation', function () {
        expect(true).toBe(true);
        console.log('Flow', Flow);
        console.log('idvIndividualRoute', idvIndividualRoute);
    });
});
