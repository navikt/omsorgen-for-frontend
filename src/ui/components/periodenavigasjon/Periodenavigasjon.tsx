import { Element, Undertittel } from 'nav-frontend-typografi';
import React from 'react';
import Omsorgsperiode from '../../../types/Omsorgsperiode';
import { Period } from '../../../types/Period';
import { sortPeriodsByFomDate } from '../../../util/periodUtils';
import Box, { Margin } from '../box/Box';
import InteractiveList from '../interactive-list/InteractiveList';
import PeriodeSomSkalVurderes from '../periode-som-skal-vurderes/PeriodeSomSkalVurderes';
import VurderingsperiodeElement from '../vurderingsperiode/VurderingsperiodeElement';
import styles from './periodenavigasjon.less';

interface PeriodenavigasjonProps {
    perioderTilVurdering: Omsorgsperiode[];
    vurdertePerioder: Omsorgsperiode[];
    onPeriodeValgt: (periode: Omsorgsperiode) => void;
}

const Periodenavigasjon = ({
    perioderTilVurdering,
    vurdertePerioder,
    onPeriodeValgt,
}: PeriodenavigasjonProps): JSX.Element => {
    const [activeIndex, setActiveIndex] = React.useState(-1);

    const vurdertePerioderElements = vurdertePerioder
        .sort((op1, op2) => {
            const omsorgsperiode1 = new Period(op1.periode.fom, op1.periode.tom);
            const omsorgsperiode2 = new Period(op2.periode.fom, op2.periode.tom);
            return sortPeriodsByFomDate(omsorgsperiode1, omsorgsperiode2);
        })
        .map((omsorgsperiode) => {
            const { periode } = omsorgsperiode;
            return <VurderingsperiodeElement periode={periode} resultat={omsorgsperiode.hentResultat()} />;
        });

    const periodeTilVurderingElements = perioderTilVurdering.map(({ periode }) => {
        return <PeriodeSomSkalVurderes periode={periode} />;
    });

    const perioder = [...perioderTilVurdering, ...vurdertePerioder];
    const elements = [...periodeTilVurderingElements, ...vurdertePerioderElements];
    const antallPerioder = elements.length;

    return (
        <div className={styles.vurderingsnavigasjon}>
            <Box marginBottom={Margin.large}>
                <Undertittel className={styles.vurderingsnavigasjon__heading}>Alle perioder</Undertittel>
            </Box>
            {antallPerioder === 0 && <p>Ingen vurderinger å vise</p>}
            {antallPerioder > 0 && (
                <div className={styles.vurderingsvelgerContainer}>
                    <Element className={styles.vurderingsvelgerContainer__periode}>Periode</Element>
                    <InteractiveList
                        elements={elements.map((element, currentIndex) => ({
                            content: element,
                            active: activeIndex === currentIndex,
                            key: `${currentIndex}`,
                            onClick: () => {
                                setActiveIndex(currentIndex);
                                const periodeIndex = elements.indexOf(element);
                                onPeriodeValgt(perioder[periodeIndex]);
                            },
                        }))}
                    />
                </div>
            )}
        </div>
    );
};

export default Periodenavigasjon;
