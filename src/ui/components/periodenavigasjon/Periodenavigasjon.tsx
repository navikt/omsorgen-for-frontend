import React from 'react';
import { Element, Undertittel } from 'nav-frontend-typografi';
import InteractiveList from '../interactive-list/InteractiveList';
import VurderingsperiodeElement from '../vurderingsperiode/VurderingsperiodeElement';
import { Omsorgsperiode, VurdertOmsorgsperiode } from '../../../types/OppgittOmsorgsperiode';
import PeriodeSomSkalVurderes from '../periode-som-skal-vurderes/PeriodeSomSkalVurderes';
import styles from './periodenavigasjon.less';

interface PeriodenavigasjonProps {
    perioderTilVurdering: Omsorgsperiode[];
    vurdertePerioder: VurdertOmsorgsperiode[];
    onPeriodeValgt: (periode: Omsorgsperiode | VurdertOmsorgsperiode) => void;
}

const Periodenavigasjon = ({
    perioderTilVurdering,
    vurdertePerioder,
    onPeriodeValgt,
}: PeriodenavigasjonProps): JSX.Element => {
    const [activeIndex, setActiveIndex] = React.useState(-1);

    const vurdertePerioderElements = vurdertePerioder.map(({ periode, resultat }) => {
        return <VurderingsperiodeElement periode={periode} resultat={resultat} />;
    });

    const periodeTilVurderingElements = perioderTilVurdering.map(({ periode }) => {
        return <PeriodeSomSkalVurderes periode={periode} />;
    });

    const perioder = [...perioderTilVurdering, ...vurdertePerioder];
    const elements = [...periodeTilVurderingElements, ...vurdertePerioderElements];
    const antallPerioder = elements.length;

    return (
        <div className={styles.vurderingsnavigasjon}>
            <Undertittel>Alle perioder</Undertittel>
            {antallPerioder === 0 && <p>Ingen vurderinger å vise</p>}
            {antallPerioder > 0 && (
                <div className={styles.vurderingsvelgerContainer}>
                    <Element>Periode</Element>
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