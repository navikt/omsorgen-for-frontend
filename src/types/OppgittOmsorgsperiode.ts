import { Period } from './Period';
import Vurderingsresultat from './Vurderingsresultat';

interface Omsorgsperiode {
    periode: Period;
    relasjon: string;
    relasjonsbeskrivelse?: string;
    resultat?: Vurderingsresultat;
    begrunnelse?: string;
}

export default Omsorgsperiode;
