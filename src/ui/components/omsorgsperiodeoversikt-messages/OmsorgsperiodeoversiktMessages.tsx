import React from 'react';
import Alertstripe from 'nav-frontend-alertstriper';
import Omsorgsperiodeoversikt from '../../../types/Omsorgsperiodeoversikt';
import Box, { Margin } from '../box/Box';
import styles from './omsorgsperiodeoversiktMessages.less';
import { getStringMedPerioder } from '../../../util/periodUtils';

interface OmsorgsperiodeoversiktMessagesProps {
    omsorgsperiodeoversikt: Omsorgsperiodeoversikt;
}

const OmsorgsperiodeoversiktMessages = ({ omsorgsperiodeoversikt }: OmsorgsperiodeoversiktMessagesProps) => {
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
