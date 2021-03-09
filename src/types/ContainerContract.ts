import { Omsorgsperiode, VurdertOmsorgsperiode } from './OppgittOmsorgsperiode';

export interface ContainerContract {
    omsorgsperioderTilVurdering: Omsorgsperiode[];
    vurderteOmsorgsperioder: VurdertOmsorgsperiode[];
    readOnly: boolean;
}
