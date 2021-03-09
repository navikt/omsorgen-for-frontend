import React from 'react';
import { ContainerContract } from '../types/ContainerContract';
import NavigationWithDetailView from './components/navigation-with-detail-view/NavigationWithDetailView';
import Periodenavigasjon from './components/periodenavigasjon/Periodenavigasjon';

interface MainComponentProps {
    data: ContainerContract;
}

const MainComponent = ({
    data: { readOnly, omsorgsperioderTilVurdering, vurderteOmsorgsperioder },
}: MainComponentProps) => {
    return (
        <NavigationWithDetailView
            navigationSection={() => (
                <Periodenavigasjon
                    perioderTilVurdering={omsorgsperioderTilVurdering}
                    vurdertePerioder={vurderteOmsorgsperioder}
                    onPeriodeValgt={(p) => console.log(p)}
                />
            )}
            detailSection={() => <p>blablabla</p>}
        />
    );
};

export default MainComponent;
