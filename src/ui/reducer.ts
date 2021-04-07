import Omsorgsperiodeoversikt from '../types/Omsorgsperiodeoversikt';

interface MainComponentState {
    omsorgsperiodeoversikt: Omsorgsperiodeoversikt;
    omsorgsperiodeoversiktHarFeilet: boolean;
    isLoading: boolean;
}

interface Action {
    type: 'ok' | 'failed' | 'pending';
    omsorgsperiodeoversikt?: Omsorgsperiodeoversikt;
}

const mainComponentReducer = (state: MainComponentState, action: Action): Partial<MainComponentState> => {
    switch (action.type) {
        case 'ok':
            return {
                omsorgsperiodeoversikt: action.omsorgsperiodeoversikt,
                omsorgsperiodeoversiktHarFeilet: false,
                isLoading: false,
            };
        case 'failed':
            return {
                omsorgsperiodeoversikt: null,
                omsorgsperiodeoversiktHarFeilet: true,
                isLoading: false,
            };
        case 'pending':
            return {
                omsorgsperiodeoversikt: null,
                omsorgsperiodeoversiktHarFeilet: false,
                isLoading: true,
            };
        default:
            return { ...state };
    }
};

export default mainComponentReducer;
