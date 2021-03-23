import Omsorgsperiode from './OppgittOmsorgsperiode';

export interface ContainerContract {
    omsorgsperioder: Omsorgsperiode[];
    readOnly: boolean;
    onFinished: (vurdering) => void;
}
