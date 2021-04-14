import Omsorgsperiode from '../../src/types/Omsorgsperiode';
import { Period } from '../../src/types/Period';
import Vurderingsresultat from '../../src/types/Vurderingsresultat';

const omsorgsperioder: Omsorgsperiode[] = [
    new Omsorgsperiode({
        begrunnelse: null,
        periode: new Period('2021-03-16', '2021-03-20'),
        relasjon: 'Annet',
        relasjonsbeskrivelse: 'Tantebarn',
        resultat: Vurderingsresultat.IKKE_VURDERT,
        resultatEtterAutomatikk: Vurderingsresultat.IKKE_VURDERT,
    }),
    new Omsorgsperiode({
        begrunnelse: null,
        periode: new Period('2021-03-09', '2021-03-15'),
        relasjon: 'Annet',
        relasjonsbeskrivelse: 'Tantebarn',
        resultat: Vurderingsresultat.IKKE_VURDERT,
        resultatEtterAutomatikk: Vurderingsresultat.OPPFYLT,
    }),
    new Omsorgsperiode({
        begrunnelse: 'heisann hoppsann',
        periode: new Period('2021-03-01', '2021-03-05'),
        relasjon: 'Far',
        relasjonsbeskrivelse: null,
        resultat: Vurderingsresultat.OPPFYLT,
        resultatEtterAutomatikk: Vurderingsresultat.IKKE_VURDERT,
    }),
];

export default omsorgsperioder;
