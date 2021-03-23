import AlertStripe from 'nav-frontend-alertstriper';
import React, { useState } from 'react';
import { ContainerContract } from '../types/ContainerContract';
import Omsorgsperiode from '../types/OppgittOmsorgsperiode';
import { getStringMedPerioder } from '../util/periodUtils';
import Box, { Margin } from './components/box/Box';
import NavigationWithDetailView from './components/navigation-with-detail-view/NavigationWithDetailView';
import OmsorgsperiodeVurderingsdetaljer from './components/omsorgsperiode-vurderingsdetaljer/OmsorgsperiodeVurderingsdetaljer';
import Periodenavigasjon from './components/periodenavigasjon/Periodenavigasjon';
import VurderingAvOmsorgsperioderForm from './components/vurdering-av-omsorgsperioder-form/VurderingAvOmsorgsperioderForm';
import ContainerContext from './context/ContainerContext';
import styles from './mainComponent.less';

interface MainComponentProps {
    data: ContainerContract;
}

const MainComponent = ({ data }: MainComponentProps) => {
    const [valgtPeriode, setValgtPeriode] = useState<Omsorgsperiode>(null);
    const { omsorgsperioder } = data;
    const omsorgsperioderTilVurdering = omsorgsperioder.filter((perioder) => perioder.resultat == null);
    const vurderteOmsorgsperioder = omsorgsperioder.filter((perioder) => perioder.resultat != null);
    const harPerioderTilVurdering = omsorgsperioderTilVurdering?.length > 0;
    const listeMedOmsorgsperioder = harPerioderTilVurdering
        ? omsorgsperioderTilVurdering.map((omsorgsperiode) => omsorgsperiode.periode)
        : [];

    return (
        <ContainerContext.Provider value={data}>
            <div className={styles.mainComponent}>
                {harPerioderTilVurdering && (
                    <Box marginBottom={Margin.large}>
                        <AlertStripe type="advarsel" className={styles.mainComponent__alertstripe}>
                            {`Søker er ikke folkeregistrert forelder. Vurder om søker har omsorgen for barnet i ${getStringMedPerioder(
                                listeMedOmsorgsperioder
                            )}.`}
                        </AlertStripe>
                    </Box>
                )}
                <NavigationWithDetailView
                    navigationSection={() => (
                        <Periodenavigasjon
                            perioderTilVurdering={omsorgsperioderTilVurdering}
                            vurdertePerioder={vurderteOmsorgsperioder}
                            onPeriodeValgt={setValgtPeriode}
                        />
                    )}
                    detailSection={() => {
                        if (!valgtPeriode) {
                            return null;
                        }
                        if (valgtPeriode.resultat) {
                            return <OmsorgsperiodeVurderingsdetaljer omsorgsperiode={valgtPeriode} />;
                        }
                        return (
                            <VurderingAvOmsorgsperioderForm
                                omsorgsperiode={valgtPeriode}
                                onSubmit={() => console.log(1)}
                            />
                        );
                    }}
                />
            </div>
        </ContainerContext.Provider>
    );
};

export default MainComponent;
