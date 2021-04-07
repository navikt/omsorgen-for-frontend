import Omsorgsperiode from './Omsorgsperiode';
import Vurderingsresultat from './Vurderingsresultat';

class Omsorgsperiodeoversikt {
    perioder: Omsorgsperiode[];

    constructor(perioder: Omsorgsperiode[]) {
        this.perioder = perioder;
    }

    harPerioderTilVurdering() {
        return this.perioder.some(({ resultat }) => resultat === null);
    }

    finnVurdertePerioder() {
        return this.perioder.filter(
            ({ resultat }) => resultat === Vurderingsresultat.OPPFYLT || resultat === Vurderingsresultat.IKKE_OPPFYLT
        );
    }

    finnPerioderTilVurdering() {
        return this.perioder.filter(({ resultat }) => resultat === null);
    }
}

export default Omsorgsperiodeoversikt;
