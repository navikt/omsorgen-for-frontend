import dayjs, { Dayjs } from 'dayjs';
import { Period } from './types/Period';
import { isSameOrBefore } from './util/dateUtils';

const makeArrayWithoutDuplicates = (array: any[]) => {
    const arrayWithoutDuplicates = [];
    array.forEach((value) => {
        if (!arrayWithoutDuplicates.includes(value)) {
            arrayWithoutDuplicates.push(value);
        }
    });
    return arrayWithoutDuplicates;
};

const getArrayDifference = (baseArray: any[], otherArray: any[]) => {
    return baseArray.filter((value) => otherArray.includes(value) === false);
};

export function getPeriodAsListOfDays(period: Period): string[] {
    const fom = dayjs(period.fom).utc(true);
    const tom = dayjs(period.tom).utc(true);

    const list = [];
    for (let currentDate = fom; isSameOrBefore(currentDate, tom); currentDate = currentDate.add(1, 'day')) {
        list.push(currentDate.format('YYYY-MM-DD'));
    }

    return list;
}

export function getPeriodsAsListOfDays(period: Period[]) {
    const days = period.map(getPeriodAsListOfDays).flat();
    return makeArrayWithoutDuplicates(days);
}

const isDayAfter = (d1: Dayjs, d2: Dayjs) => {
    const dayAfterD1 = d1.add(1, 'day').utc(true).startOf('day');
    const d2Day = d2.utc(true).startOf('day');
    return dayAfterD1.isSame(d2Day);
};

function getDaySequencesAsListOfPeriods(daySequences: string[][]): Period[] {
    return daySequences.map((daySequence) => {
        const firstDay = daySequence[0];
        const lastDay = daySequence[daySequence.length - 1];
        return new Period(firstDay, lastDay);
    });
}

// assumes no duplicates & sorted by day
export function convertListOfDaysToPeriods(days: string[]): Period[] {
    if (days.length === 0) {
        return [];
    }

    const daySplit = [];
    let currentSplit = [];
    for (let i = 0; i < days.length; i++) {
        const currentSplitCount = currentSplit.length;
        if (currentSplitCount === 0) {
            currentSplit.push(days[i]);
        } else {
            const currentDay = dayjs(days[i]).utc(true);
            const previousDay = dayjs(currentSplit[currentSplitCount - 1]).utc(true);
            if (isDayAfter(previousDay, currentDay)) {
                currentSplit.push(days[i]);
            } else {
                daySplit.push(currentSplit);
                currentSplit = [days[i]];
            }
        }
    }
    daySplit.push(currentSplit);

    return getDaySequencesAsListOfPeriods(daySplit);
}

function daySorter(d1: string, d2: string) {
    const day1 = dayjs(d1).utc(true);
    const day2 = dayjs(d2).utc(true);
    if (day1.isBefore(day2)) {
        return -1;
    }
    if (day2.isBefore(day1)) {
        return 1;
    }
    return 0;
}

function periodDifference(basePeriods: Period[], periodsToExclude: Period[]) {
    const baseListOfDays = getPeriodsAsListOfDays(basePeriods).sort(daySorter);
    const daysToExclude = getPeriodsAsListOfDays(periodsToExclude).sort(daySorter);
    const daysToInclude = getArrayDifference(baseListOfDays, daysToExclude);
    return convertListOfDaysToPeriods(daysToInclude);
}

export default periodDifference;
