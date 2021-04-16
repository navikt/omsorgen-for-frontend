import React from 'react';
import axios from 'axios';
import { ContainerContract } from '../types/ContainerContract';
import OmsorgsperiodeoversiktType from '../types/Omsorgsperiodeoversikt';
import Omsorgsperiodeoversikt from './components/omsorgsperiodeoversikt/Omsorgsperiodeoversikt';
import { get } from '../util/httpUtils';
import OmsorgsperioderResponse from '../types/OmsorgsperioderResponse';
import PageContainer from './components/page-container/PageContainer';
import mainComponentReducer from './reducer';
import styles from './mainComponent.less';
import ContainerContext from './context/ContainerContext';
import ActionType from './actionTypes';
import Box, { Margin } from './components/box/Box';

interface MainComponentProps {
    data: ContainerContract;
}

const MainComponent = ({ data }: MainComponentProps) => {
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
