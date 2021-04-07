import React from 'react';
import Omsorgsperiode from '../../../types/Omsorgsperiode';
import Relajson from '../../../types/Relasjon';
import Vurderingsresultat from '../../../types/Vurderingsresultat';
import { prettifyPeriod } from '../../../util/formats';
import Box, { Margin } from '../box/Box';
import DetailView from '../detail-view/DetailView';
import LabelledContent from '../labelled-content/LabelledContent';

interface OmsorgsperiodeVurderingsdetaljerProps {
    omsorgsperiode: Omsorgsperiode;
}

const OmsorgsperiodeVurderingsdetaljer = ({ omsorgsperiode }: OmsorgsperiodeVurderingsdetaljerProps) => {
    return (
        <DetailView title="Vurdering av omsorg">
            <Box marginTop={Margin.xLarge}>
                <LabelledContent label="Oppgitt relasjon i søknaden" content={omsorgsperiode.relasjon} />
            </Box>
            {omsorgsperiode.relasjon === Relajson.ANNET && (
                <Box marginTop={Margin.xLarge}>
                    <LabelledContent label="Beskrivelse fra søker" content={omsorgsperiode.relasjonsbeskrivelse} />
                </Box>
            )}
            <Box marginTop={Margin.xLarge}>
                <LabelledContent
                    label="Vurder om søker har omsorgen for barnet etter § 9-10, første ledd."
                    content={omsorgsperiode.begrunnelse}
                />
            </Box>
            <Box marginTop={Margin.xLarge}>
                <LabelledContent
                    label="Har søker omsorgen for barnet i denne perioden?"
                    content={omsorgsperiode.resultat === Vurderingsresultat.OPPFYLT ? 'Ja' : 'Nei'}
                />
            </Box>
            <Box marginTop={Margin.xLarge}>
                <LabelledContent
                    label="I hvilken periode har søker omsorgen for barnet?"
                    content={prettifyPeriod(omsorgsperiode.periode)}
                />
            </Box>
        </DetailView>
    );
};

export default OmsorgsperiodeVurderingsdetaljer;
