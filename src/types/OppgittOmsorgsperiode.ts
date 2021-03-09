import { Period } from './Period';
import Vurderingsresultat from './Vurderingsresultat';

export interface Omsorgsperiode {
    periode: Period;
    relasjon: string;
    relasjonsbeskrivelse?: string;
}

export interface VurdertOmsorgsperiode extends Omsorgsperiode {
    resultat: Vurderingsresultat;
    begrunnelse: string;
}
