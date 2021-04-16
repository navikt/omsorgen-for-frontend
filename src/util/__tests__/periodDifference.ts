import { Period } from '../../types/Period';
import periodDifference from '../../periodDifference';

const period1 = new Period('2028-01-01', '2028-01-05');
const period2 = new Period('2028-01-06', '2028-01-10');
const period3 = new Period('2028-01-03', '2028-01-12');
const period4 = new Period('2028-01-15', '2028-01-20');

describe('periodDifference', () => {
    /*it('should return an empty array if there were no periods in basePeriods', () => {
        const result = periodDifference([], []);
        expect(result.length).toBe(0);
        expect(result).toBeInstanceOf(Array);
    });*/

    it('should return the periods in basePeriods if there were no periodsToExclude', () => {
        const v = periodDifference([period1, period3], [period2, period4]);
        console.log(v);
        /*const basePeriods = [period1];
        const result = periodDifference([period1], []);
        expect(result).toEqual(basePeriods);*/
    });
});
