import Omsorgsperiode from '../../src/types/Omsorgsperiode';
import { Period } from '../../src/types/Period';
import Vurderingsresultat from '../../src/types/Vurderingsresultat';

const omsorgsperioder: Omsorgsperiode[] = [
    {
        begrunnelse: null,
        periode: new Period('2021-03-09', '2021-03-15'),
        relasjon: 'Annet',
        relasjonsbeskrivelse: 'Tantebarn',
        resultat: null,
    },
    {
        begrunnelse: 'heisann hoppsann',
        periode: new Period('2021-03-01', '2021-03-05'),
        relasjon: 'Far',
        relasjonsbeskrivelse: null,
        resultat: Vurderingsresultat.OPPFYLT,
    },
];

export default omsorgsperioder;
