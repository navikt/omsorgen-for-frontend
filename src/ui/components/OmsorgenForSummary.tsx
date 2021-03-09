import React from 'react';
import { VurdertOmsorgsperiode } from '../../types/OppgittOmsorgsperiode';
import Relajson from '../../types/Relasjon';
import Box, { Margin } from './box/Box';
import DetailView from './detail-view/DetailView';
import LabelledContent from './labelled-content/LabelledContent';

interface OmsorgenForSummaryProps {
    omsorgsperiode: VurdertOmsorgsperiode;
}

const OmsorgenForSummary = ({ omsorgsperiode }: OmsorgenForSummaryProps) => {
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
        </DetailView>
    );
};

export default OmsorgenForSummary;
