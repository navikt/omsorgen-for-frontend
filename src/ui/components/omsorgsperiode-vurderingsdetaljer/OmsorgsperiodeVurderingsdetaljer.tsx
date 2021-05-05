import React from 'react';
import Omsorgsperiode from '../../../types/Omsorgsperiode';
import Relajson from '../../../types/Relasjon';
import Box, { Margin } from '../box/Box';
import DetailView from '../detail-view/DetailView';
import LabelledContent from '../labelled-content/LabelledContent';
import WriteAccessBoundContent from '../write-access-bound-content/WriteAccessBoundContent';
import LinkButton from '../link-button/LinkButton';
import styles from './omsorgsperiodeVurderingsdetaljer.less';
import Relasjon from '../../../types/Relasjon';

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
    const begrunnelseRenderer = () => {
        let label = 'Vurder om søker har omsorgen for barnet etter § 9-10, første ledd.';
        let begrunnelse = '';
        if (omsorgsperiode.erManueltVurdert()) {
            begrunnelse = omsorgsperiode.begrunnelse;
        } else if (omsorgsperiode.erAutomatiskVurdert()) {
            if (registrertForeldrerelasjon) {
                begrunnelse = 'Søker er folkeregistrert forelder';
            } else {
                begrunnelse = 'Søker er ikke folkeregistrert forelder';
            }
            label = 'Automatisk vurdert';
        }
        return <LabelledContent label={label} content={begrunnelse} />;
    };

    const resultatRenderer = () => {
        if (omsorgsperiode.erOppfylt()) {
            return 'Ja';
        }
        if (omsorgsperiode.erIkkeOppfylt()) {
            return 'Nei';
        }
        return null;
    };

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
            {omsorgsperiode.erManueltVurdert() && (
                <>
                    <Box marginTop={Margin.xLarge}>
                        <LabelledContent label="Oppgitt relasjon i søknaden" content={omsorgsperiode.relasjon} />
                    </Box>
                    {omsorgsperiode.relasjon.toUpperCase() === Relasjon.ANNET.toUpperCase() && (
                        <Box marginTop={Margin.xLarge}>
                            <LabelledContent
                                label="Beskrivelse fra søker"
                                content={omsorgsperiode.relasjonsbeskrivelse}
                            />
                        </Box>
                    )}
                </>
            )}
            <Box marginTop={Margin.xLarge}>{begrunnelseRenderer()}</Box>
            <Box marginTop={Margin.xLarge}>
                <LabelledContent label="Har søker omsorgen for barnet i denne perioden?" content={resultatRenderer()} />
            </Box>
            <Box marginTop={Margin.xLarge}>
                <LabelledContent label="Perioder" content={omsorgsperiode.periode.prettifyPeriod()} />
            </Box>
        </DetailView>
    );
};

export default OmsorgsperiodeVurderingsdetaljer;
