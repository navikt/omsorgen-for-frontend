import Omsorgsperiode from '../../src/types/Omsorgsperiode';
import { Period } from '../../src/types/Period';
import Vurderingsresultat from '../../src/types/Vurderingsresultat';

const omsorgsperioder: Omsorgsperiode[] = [
    new Omsorgsperiode({
        begrunnelse: null,
        periode: new Period('2021-03-20', '2021-03-25'),
        relasjon: 'Annet',
        relasjonsbeskrivelse: 'Nabo',
        resultat: Vurderingsresultat.IKKE_VURDERT,
        resultatEtterAutomatikk: Vurderingsresultat.IKKE_VURDERT,
    }),
    new Omsorgsperiode({
        begrunnelse: 'Fordi foo og bar',
        periode: new Period('2021-03-16', '2021-03-20'),
        relasjon: 'Annet',
        relasjonsbeskrivelse: 'Nabo',
        resultat: Vurderingsresultat.IKKE_OPPFYLT,
        resultatEtterAutomatikk: Vurderingsresultat.IKKE_VURDERT,
    }),
    new Omsorgsperiode({
        periode: new Period('2021-03-09', '2021-03-15'),
        resultat: Vurderingsresultat.IKKE_VURDERT,
        resultatEtterAutomatikk: Vurderingsresultat.OPPFYLT,
    }),
    new Omsorgsperiode({
        begrunnelse: 'Fordi ditt og datt',
        periode: new Period('2021-03-01', '2021-03-05'),
        relasjon: 'Far',
        relasjonsbeskrivelse: null,
        resultat: Vurderingsresultat.OPPFYLT,
        resultatEtterAutomatikk: Vurderingsresultat.OPPFYLT,
    }),
    new Omsorgsperiode({
        begrunnelse: 'Fordi sånn og sånn',
        periode: new Period('2021-02-01', '2021-02-05'),
        relasjon: 'Far',
        relasjonsbeskrivelse: null,
        resultat: Vurderingsresultat.OPPFYLT,
        resultatEtterAutomatikk: Vurderingsresultat.OPPFYLT,
    }),
];

export default omsorgsperioder;
