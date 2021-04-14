import { Period } from './Period';
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
        this.periode = periode;
        this.resultatEtterAutomatikk = resultatEtterAutomatikk;
        this.resultat = resultat;
        this.relasjonsbeskrivelse = relasjonsbeskrivelse;
        this.begrunnelse = begrunnelse;
        this.relasjon = relasjon;
    }

    erVurdert() {
        return (
            this.resultat === Vurderingsresultat.OPPFYLT ||
            this.resultat === Vurderingsresultat.IKKE_OPPFYLT ||
            this.resultatEtterAutomatikk === Vurderingsresultat.OPPFYLT ||
            this.resultatEtterAutomatikk === Vurderingsresultat.IKKE_OPPFYLT
        );
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
