import { Period } from '@navikt/k9-period-utils';
import Vurderingsresultat from './Vurderingsresultat';

class Omsorgsperiode {
    periode: Period;

    relasjon: string;

    relasjonsbeskrivelse?: string;

    resultat: Vurderingsresultat;

    resultatEtterAutomatikk: Vurderingsresultat;

    begrunnelse?: string;

    constructor({
        periode,
        resultatEtterAutomatikk,
        resultat,
        relasjonsbeskrivelse,
        begrunnelse,
        relasjon,
    }: Partial<Omsorgsperiode>) {
        this.periode = new Period(periode.fom, periode.tom);
        this.resultatEtterAutomatikk = resultatEtterAutomatikk;
        this.resultat = resultat;
        this.relasjonsbeskrivelse = relasjonsbeskrivelse;
        this.begrunnelse = begrunnelse;
        this.relasjon = relasjon;
    }

    erOppfylt() {
        return (
            this.resultat === Vurderingsresultat.OPPFYLT || this.resultatEtterAutomatikk === Vurderingsresultat.OPPFYLT
        );
    }

    erIkkeOppfylt() {
        return (
            this.resultat === Vurderingsresultat.IKKE_OPPFYLT ||
            this.resultatEtterAutomatikk === Vurderingsresultat.IKKE_OPPFYLT
        );
    }

    erAutomatiskVurdert() {
        return (
            this.resultatEtterAutomatikk === Vurderingsresultat.OPPFYLT ||
            this.resultatEtterAutomatikk === Vurderingsresultat.IKKE_OPPFYLT
        );
    }

    erManueltVurdert() {
        return this.resultat === Vurderingsresultat.OPPFYLT || this.resultat === Vurderingsresultat.IKKE_OPPFYLT;
    }

    erVurdert() {
        return this.erManueltVurdert() || this.erAutomatiskVurdert();
    }

    manglerVurdering() {
        return (
            this.resultat === Vurderingsresultat.IKKE_VURDERT &&
            this.resultatEtterAutomatikk === Vurderingsresultat.IKKE_VURDERT
        );
    }

    hentResultat() {
        if (this.resultat === Vurderingsresultat.IKKE_VURDERT) {
            return this.resultatEtterAutomatikk;
        }
        if (this.resultatEtterAutomatikk === Vurderingsresultat.IKKE_VURDERT) {
            return this.resultat;
        }
        return this.resultat || this.resultatEtterAutomatikk;
    }
}

export default Omsorgsperiode;
