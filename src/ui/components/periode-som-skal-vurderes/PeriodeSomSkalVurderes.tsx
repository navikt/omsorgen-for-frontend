import React from 'react';
import { Period } from '@navikt/k9-period-utils';
import { ContentWithTooltip, WarningIcon } from '@navikt/ft-plattform-komponenter';
import styles from './periodeSomSkalVurderes.css';

interface PeriodeSomSkalVurderesProps {
    periode: Period;
}

const PeriodeSomSkalVurderes = ({ periode }: PeriodeSomSkalVurderesProps): JSX.Element => {
    const period = new Period(periode.fom, periode.tom);
    return (
        <div className={styles.periodeSomSkalVurderes} id="periodeSomSkalVurderes">
            <span className={styles.visuallyHidden}>Type</span>
            <ContentWithTooltip tooltipText="Perioden må vurderes">
                <WarningIcon />
            </ContentWithTooltip>
            <div className={styles.periodeSomSkalVurderes__texts}>
                <div>
                    <p key={`${periode.fom}_${periode.tom}`} className={styles.periodeSomSkalVurderes__texts__period}>
                        {period.prettifyPeriod()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PeriodeSomSkalVurderes;
