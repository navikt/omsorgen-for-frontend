import { get } from '@navikt/k9-http-utils';
import { Box, Margin, PageContainer } from '@navikt/ft-plattform-komponenter';
import axios from 'axios';
import React from 'react';
import '@navikt/ft-plattform-komponenter/dist/style.css';
import '@navikt/ds-css';
import { ContainerContract } from '../types/ContainerContract';
import OmsorgsperiodeoversiktType from '../types/Omsorgsperiodeoversikt';
import OmsorgsperioderResponse from '../types/OmsorgsperioderResponse';
import ActionType from './actionTypes';
import Omsorgsperiodeoversikt from './components/omsorgsperiodeoversikt/Omsorgsperiodeoversikt';
import ContainerContext from './context/ContainerContext';
import styles from './mainComponent.css';
import mainComponentReducer from './reducer';

interface MainComponentProps {
    data: ContainerContract;
}

const MainComponent = ({ data }: MainComponentProps): JSX.Element => {
    const [state, dispatch] = React.useReducer(mainComponentReducer, {
        isLoading: true,
        omsorgsperiodeoversiktHarFeilet: false,
        omsorgsperiodeoversikt: null,
    });

    const { omsorgsperiodeoversikt, isLoading, omsorgsperiodeoversiktHarFeilet } = state;

    const httpCanceler = React.useMemo(() => axios.CancelToken.source(), []);

    const getOmsorgsperioder = () =>
        get<OmsorgsperioderResponse>(data.endpoints.omsorgsperioder, data.httpErrorHandler, {
            cancelToken: httpCanceler.token,
        });

    const handleError = () => {
        dispatch({ type: ActionType.FAILED });
    };

    React.useEffect(() => {
        let isMounted = true;
        getOmsorgsperioder()
            .then((response: OmsorgsperioderResponse) => {
                if (isMounted) {
                    const nyOmsorgsperiodeoversikt = new OmsorgsperiodeoversiktType(response);
                    dispatch({ type: ActionType.OK, omsorgsperiodeoversikt: nyOmsorgsperiodeoversikt });
                }
            })
            .catch(handleError);
        return () => {
            isMounted = false;
            httpCanceler.cancel();
        };
    }, []);

    return (
        <ContainerContext.Provider value={data}>
            <h1 style={{ fontSize: 22 }}>Omsorg</h1>
            <Box marginTop={Margin.large}>
                <PageContainer isLoading={isLoading} hasError={omsorgsperiodeoversiktHarFeilet}>
                    <div className={styles.mainComponent}>
                        <Omsorgsperiodeoversikt omsorgsperiodeoversikt={omsorgsperiodeoversikt} />
                    </div>
                </PageContainer>
            </Box>
        </ContainerContext.Provider>
    );
};

export default MainComponent;
