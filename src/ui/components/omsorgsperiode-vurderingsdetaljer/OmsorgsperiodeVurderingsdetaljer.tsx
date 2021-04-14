import React from 'react';
import Omsorgsperiode from '../../../types/Omsorgsperiode';
import Relajson from '../../../types/Relasjon';
import Vurderingsresultat from '../../../types/Vurderingsresultat';
import { prettifyPeriod } from '../../../util/formats';
import Box, { Margin } from '../box/Box';
import DetailView from '../detail-view/DetailView';
import LabelledContent from '../labelled-content/LabelledContent';
import WriteAccessBoundContent from '../write-access-bound-content/WriteAccessBoundContent';
import LinkButton from '../link-button/LinkButton';
import styles from './omsorgsperiodeVurderingsdetaljer.less';

interface OmsorgsperiodeVurderingsdetaljerProps {
    omsorgsperiode: Omsorgsperiode;
    onEditClick: () => void;
    registrertForeldrerelasjon: boolean;
}

const OmsorgsperiodeVurderingsdetaljer = ({
    omsorgsperiode,
    onEditClick,
    registrertForeldrerelasjon,
}: OmsorgsperiodeVurderingsdetaljerProps) => {
    const begrunnelse =
        omsorgsperiode.begrunnelse || registrertForeldrerelasjon ? 'Søker er folkeregistrert forelder' : '';
    return (
        <DetailView
            title="Vurdering av omsorg"
            contentAfterTitleRenderer={() => (
                <WriteAccessBoundContent
                    contentRenderer={() => (
                        <LinkButton className={styles.endreLink} onClick={onEditClick}>
                            Rediger vurdering
                        </LinkButton>
                    )}
                />
            )}
        >
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
                    content={begrunnelse}
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
