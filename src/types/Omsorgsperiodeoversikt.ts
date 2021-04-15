import Omsorgsperiode from './Omsorgsperiode';
import Vurderingsresultat from './Vurderingsresultat';
import OmsorgsperioderResponse from './OmsorgsperioderResponse';

class Omsorgsperiodeoversikt {
    perioder: Omsorgsperiode[];

    registrertSammeBosted: boolean;

    registrertForeldrerelasjon: boolean;

    tvingManuellVurdering: boolean;

    constructor({
        tvingManuellVurdering,
        omsorgsperioder,
        registrertForeldrerelasjon,
        registrertSammeBosted,
    }: OmsorgsperioderResponse) {
        this.perioder = omsorgsperioder.map((omsorgsperiode) => new Omsorgsperiode(omsorgsperiode));
        this.tvingManuellVurdering = tvingManuellVurdering;
        this.registrertForeldrerelasjon = registrertForeldrerelasjon;
        this.registrertSammeBosted = registrertSammeBosted;
    }

    harPerioderTilVurdering() {
        return this.perioder.some((omsorgspeiode) => omsorgspeiode.manglerVurdering());
    }

    finnVurdertePerioder() {
        return this.perioder.filter((omsorgsperiode) => omsorgsperiode.erVurdert());
    }

    finnPerioderTilVurdering() {
        return this.perioder.filter((omsorgsperiode) => omsorgsperiode.manglerVurdering());
    }
}

export default Omsorgsperiodeoversikt;
