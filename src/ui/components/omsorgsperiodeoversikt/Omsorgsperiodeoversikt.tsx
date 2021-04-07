import React from 'react';
import OmsorgsperiodeoversiktType from '../../../types/Omsorgsperiodeoversikt';
import Omsorgsperiode from '../../../types/Omsorgsperiode';
import OmsorgsperiodeoversiktMessages from '../omsorgsperiodeoversikt-messages/OmsorgsperiodeoversiktMessages';
import NavigationWithDetailView from '../navigation-with-detail-view/NavigationWithDetailView';
import Periodenavigasjon from '../periodenavigasjon/Periodenavigasjon';
import OmsorgsperiodeVurderingsdetaljer from '../omsorgsperiode-vurderingsdetaljer/OmsorgsperiodeVurderingsdetaljer';
import VurderingAvOmsorgsperioderForm from '../vurdering-av-omsorgsperioder-form/VurderingAvOmsorgsperioderForm';

interface OmsorgsperiodeoversiktProps {
    omsorgsperiodeoversikt: OmsorgsperiodeoversiktType;
}

const Omsorgsperiodeoversikt = ({ omsorgsperiodeoversikt }: OmsorgsperiodeoversiktProps) => {
    const [valgtPeriode, setValgtPeriode] = React.useState<Omsorgsperiode>(null);

    const perioderTilVurdering = omsorgsperiodeoversikt.finnPerioderTilVurdering();
    const vurderteOmsorgsperioder = omsorgsperiodeoversikt.finnVurdertePerioder();

    return (
        <>
            <OmsorgsperiodeoversiktMessages omsorgsperiodeoversikt={omsorgsperiodeoversikt} />
            <NavigationWithDetailView
                navigationSection={() => (
                    <Periodenavigasjon
                        perioderTilVurdering={perioderTilVurdering}
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
                        <VurderingAvOmsorgsperioderForm omsorgsperiode={valgtPeriode} onSubmit={() => console.log(1)} />
                    );
                }}
            />
        </>
    );
};

export default Omsorgsperiodeoversikt;
