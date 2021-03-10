import React, { useState } from 'react';
import { ContainerContract } from '../types/ContainerContract';
import NavigationWithDetailView from './components/navigation-with-detail-view/NavigationWithDetailView';
import Periodenavigasjon from './components/periodenavigasjon/Periodenavigasjon';
import { Omsorgsperiode, VurdertOmsorgsperiode } from '../types/OppgittOmsorgsperiode';
import OmsorgsperiodeVurderingsdetaljer from './components/omsorgsperiode-vurderingsdetaljer/OmsorgsperiodeVurderingsdetaljer';
import VurderingAvOmsorgsperioderForm from './components/vurdering-av-omsorgsperioder-form/VurderingAvOmsorgsperioderForm';

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
                        onPeriodeValgt={setValgtPeriode}
                    />
                )}
                detailSection={() => {
                    if (!valgtPeriode) {
                        return null;
                    }
                    if ((valgtPeriode as VurdertOmsorgsperiode).resultat) {
                        return (
                            <OmsorgsperiodeVurderingsdetaljer omsorgsperiode={valgtPeriode as VurdertOmsorgsperiode} />
                        );
                    }
                    return (
                        <VurderingAvOmsorgsperioderForm omsorgsperiode={valgtPeriode} onSubmit={() => console.log(1)} />
                    );
                }}
            />
        </div>
    );
};

export default MainComponent;
