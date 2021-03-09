import React, { useState } from 'react';
import { ContainerContract } from '../types/ContainerContract';
import NavigationWithDetailView from './components/navigation-with-detail-view/NavigationWithDetailView';
import Periodenavigasjon from './components/periodenavigasjon/Periodenavigasjon';
import { Omsorgsperiode, VurdertOmsorgsperiode } from '../types/OppgittOmsorgsperiode';
import OmsorgenForForm from './components/OmsorgenForForm';
import OmsorgenForSummary from './components/OmsorgenForSummary';

interface MainComponentProps {
    data: ContainerContract;
}

const MainComponent = ({
    data: { readOnly, omsorgsperioderTilVurdering, vurderteOmsorgsperioder },
}: MainComponentProps) => {
    const [valgtPeriode, setValgtPeriode] = useState<Omsorgsperiode | VurdertOmsorgsperiode>(null);
    return (
        <div style={{ maxWidth: '1204px' }}>
            <NavigationWithDetailView
                navigationSection={() => (
                    <Periodenavigasjon
                        perioderTilVurdering={omsorgsperioderTilVurdering}
                        vurdertePerioder={vurderteOmsorgsperioder}
                        onPeriodeValgt={(p) => setValgtPeriode(p)}
                    />
                )}
                detailSection={() => {
                    if (!valgtPeriode) {
                        return null;
                    }
                    if ((valgtPeriode as VurdertOmsorgsperiode).resultat) {
                        return <OmsorgenForSummary omsorgsperiode={valgtPeriode as VurdertOmsorgsperiode} />;
                    }
                    return <OmsorgenForForm omsorgsperiode={valgtPeriode} />;
                }}
            />
        </div>
    );
};

export default MainComponent;
