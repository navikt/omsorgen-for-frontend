import { Box, Margin } from '@navikt/k9-react-components';
import Alertstripe from 'nav-frontend-alertstriper';
import React from 'react';
import Omsorgsperiodeoversikt from '../../../types/Omsorgsperiodeoversikt';
import { getStringMedPerioder } from '../../../util/periodUtils';
import styles from './omsorgsperiodeoversiktMessages.less';

interface OmsorgsperiodeoversiktMessagesProps {
    omsorgsperiodeoversikt: Omsorgsperiodeoversikt;
}

const OmsorgsperiodeoversiktMessages = ({
    omsorgsperiodeoversikt,
}: OmsorgsperiodeoversiktMessagesProps): JSX.Element => {
    if (omsorgsperiodeoversikt.harPerioderTilVurdering()) {
        const perioderTilVurdering = omsorgsperiodeoversikt.finnPerioderTilVurdering().map(({ periode }) => periode);
        return (
            <Box marginBottom={Margin.large}>
                <Alertstripe type="advarsel" className={styles.alertstripe}>
                    {`Søker er ikke folkeregistrert forelder. Vurder om søker har omsorgen for barnet i ${getStringMedPerioder(
                        perioderTilVurdering
                    )}.`}
                </Alertstripe>
            </Box>
        );
    }
    return null;
};

export default OmsorgsperiodeoversiktMessages;
