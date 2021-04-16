import { Period } from '../types/Period';
import { prettifyPeriod } from './formats';

export const getStringMedPerioder = (perioder: Period[]): string => {
    if (perioder.length === 1) {
        return `perioden ${prettifyPeriod(perioder[0])}`;
    }

    let perioderString = '';
    perioder.forEach((periode, index) => {
        const prettyPeriod = prettifyPeriod(periode);
        if (index === 0) {
            perioderString = prettyPeriod;
        } else if (index === perioder.length - 1) {
            perioderString = `${perioderString} og ${prettyPeriod}`;
        } else {
            perioderString = `${perioderString}, ${prettyPeriod}`;
        }
    });

    return `periodene ${perioderString}`;
};

export const sortPeriodsByFomDate = (period1: Period, period2: Period): number => {
    if (period1.startsBefore(period2)) {
        return 1;
    }
    if (period2.startsBefore(period1)) {
        return -1;
    }
    return 0;
};
