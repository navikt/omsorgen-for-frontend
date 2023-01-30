import { Box, Margin, DetailView, LabelledContent, LinkButton } from '@navikt/ft-plattform-komponenter';
import React from 'react';
import { useIntl } from 'react-intl';
import Omsorgsperiode from '../../../types/Omsorgsperiode';
import Relasjon from '../../../types/Relasjon';
import WriteAccessBoundContent from '../write-access-bound-content/WriteAccessBoundContent';
import styles from './omsorgsperiodeVurderingsdetaljer.css';

interface OmsorgsperiodeVurderingsdetaljerProps {
    omsorgsperiode: Omsorgsperiode;
    onEditClick: () => void;
    registrertForeldrerelasjon: boolean;
}

const OmsorgsperiodeVurderingsdetaljer = ({
    omsorgsperiode,
    onEditClick,
    registrertForeldrerelasjon,
}: OmsorgsperiodeVurderingsdetaljerProps): JSX.Element => {
    const intl = useIntl();
    const begrunnelseRenderer = () => {
        let label = intl.formatMessage({ id: 'vurdering.hjemmel' });
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

    const skalViseRelasjonsbeskrivelse =
        omsorgsperiode.relasjon?.toUpperCase() === Relasjon.ANNET.toUpperCase() && omsorgsperiode.relasjonsbeskrivelse;

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
                    {omsorgsperiode.relasjon && (
                        <Box marginTop={Margin.xLarge}>
                            <LabelledContent label="Oppgitt relasjon i søknaden" content={omsorgsperiode.relasjon} />
                        </Box>
                    )}
                    {skalViseRelasjonsbeskrivelse && (
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
