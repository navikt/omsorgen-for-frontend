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
    const [erRedigeringsmodus, setErRedigeringsmodus] = React.useState(false);

    const perioderTilVurdering = omsorgsperiodeoversikt.finnPerioderTilVurdering();
    const vurderteOmsorgsperioder = omsorgsperiodeoversikt.finnVurdertePerioder();

    const velgPeriode = (periode: Omsorgsperiode) => {
        setValgtPeriode(periode);
        setErRedigeringsmodus(false);
    };

    return (
        <>
            <OmsorgsperiodeoversiktMessages omsorgsperiodeoversikt={omsorgsperiodeoversikt} />
            <NavigationWithDetailView
                navigationSection={() => (
                    <Periodenavigasjon
                        perioderTilVurdering={perioderTilVurdering}
                        vurdertePerioder={vurderteOmsorgsperioder}
                        onPeriodeValgt={velgPeriode}
                        harValgtPeriode={valgtPeriode !== null}
                    />
                )}
                detailSection={() => {
                    if (!valgtPeriode) {
                        return null;
                    }
                    if (perioderTilVurdering.includes(valgtPeriode) || erRedigeringsmodus) {
                        return (
                            <VurderingAvOmsorgsperioderForm
                                omsorgsperiode={valgtPeriode}
                                onAvbryt={() => velgPeriode(null)}
                            />
                        );
                    }
                    return (
                        <OmsorgsperiodeVurderingsdetaljer
                            omsorgsperiode={valgtPeriode}
                            onEditClick={() => setErRedigeringsmodus(true)}
                            registrertForeldrerelasjon={omsorgsperiodeoversikt.registrertForeldrerelasjon}
                        />
                    );
                }}
            />
        </>
    );
};

export default Omsorgsperiodeoversikt;
