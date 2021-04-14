import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import Omsorgsperiode from '../../../types/Omsorgsperiode';
import { Period } from '../../../types/Period';
import Relasjon from '../../../types/Relasjon';
import Vurderingsresultat from '../../../types/Vurderingsresultat';
import { prettifyPeriod } from '../../../util/formats';
import ContainerContext from '../../context/ContainerContext';
import PeriodpickerList from '../../form/wrappers/PeriodpickerList';
import RadioGroup from '../../form/wrappers/RadioGroup';
import TextArea from '../../form/wrappers/TextArea';
import AddButton from '../add-button/AddButton';
import Box, { Margin } from '../box/Box';
import DeleteButton from '../delete-button/DeleteButton';
import DetailView from '../detail-view/DetailView';
import Form from '../form/Form';
import LabelledContent from '../labelled-content/LabelledContent';
import periodDifference from '../../../periodDifference';

export enum FieldName {
    BEGRUNNELSE = 'begrunnelse',
    HAR_SØKER_OMSORGEN_FOR_I_PERIODE = 'harSøkerOmsorgenForIPeriode',
    PERIODER = 'perioder',
}

enum RadioOptions {
    JA = 'ja',
    JA_DELER = 'jaDeler',
    NEI = 'nei',
}

interface FormPeriod {
    period: Period;
}

const finnResterendePerioder = (perioderFraForm: FormPeriod[], periodeTilVurdering: Period) => {
    const formatertePerioderFraForm = perioderFraForm.map((periode) => periode.period);
    const resterendePerioder =
        formatertePerioderFraForm.length > 0 && periodDifference([periodeTilVurdering], formatertePerioderFraForm);

    return resterendePerioder;
};

interface VurderingAvOmsorgsperioderFormProps {
    omsorgsperiode: Omsorgsperiode;
    onSubmit: () => void;
}

interface VurderingAvOmsorgsperioderFormState {
    [FieldName.BEGRUNNELSE]: string;
    [FieldName.PERIODER]: FormPeriod[];
    [FieldName.HAR_SØKER_OMSORGEN_FOR_I_PERIODE]: RadioOptions;
}

const VurderingAvOmsorgsperioderForm = ({ omsorgsperiode }: VurderingAvOmsorgsperioderFormProps): JSX.Element => {
    const { onFinished } = React.useContext(ContainerContext);

    const formMethods = useForm({
        defaultValues: {
            [FieldName.PERIODER]: [{ period: omsorgsperiode.periode }],
        },
    });

    const handleSubmit = (formState: VurderingAvOmsorgsperioderFormState) => {
        const { begrunnelse, perioder, harSøkerOmsorgenForIPeriode } = formState;
        let perioderMedEllerUtenOmsorg;
        let perioderUtenOmsorg = [];
        if (harSøkerOmsorgenForIPeriode === RadioOptions.JA_DELER) {
            perioderMedEllerUtenOmsorg = perioder.map(({ period }) => ({
                periode: period,
                resultat: Vurderingsresultat.OPPFYLT,
                begrunnelse,
            }));

            const resterendePerioder = finnResterendePerioder(perioder, omsorgsperiode.periode);
            perioderUtenOmsorg = resterendePerioder.map((periode) => ({
                periode,
                resultat: Vurderingsresultat.IKKE_OPPFYLT,
                begrunnelse,
            }));
        } else {
            perioderMedEllerUtenOmsorg = [
                {
                    periode: omsorgsperiode.periode,
                    resultat:
                        harSøkerOmsorgenForIPeriode === RadioOptions.JA
                            ? Vurderingsresultat.OPPFYLT
                            : Vurderingsresultat.IKKE_OPPFYLT,
                    begrunnelse,
                },
            ];
        }

        const kombinertePerioder = perioderMedEllerUtenOmsorg.concat(perioderUtenOmsorg);
        console.log(kombinertePerioder);
        onFinished({ omsorgsperioder: kombinertePerioder });
    };

    const perioder = formMethods.watch(FieldName.PERIODER);
    const harSøkerOmsorgenFor = formMethods.watch(FieldName.HAR_SØKER_OMSORGEN_FOR_I_PERIODE);
    const resterendePerioder = finnResterendePerioder(perioder, omsorgsperiode.periode);

    return (
        <DetailView title="Vurdering av omsorg">
            <FormProvider {...formMethods}>
                <Box marginTop={Margin.xLarge}>
                    <LabelledContent label="Oppgitt relasjon i søknaden" content={omsorgsperiode.relasjon} />
                </Box>
                {omsorgsperiode.relasjon === Relasjon.ANNET && (
                    <Box marginTop={Margin.xLarge}>
                        <LabelledContent label="Beskrivelse fra søker" content={omsorgsperiode.relasjonsbeskrivelse} />
                    </Box>
                )}
                <Form onSubmit={formMethods.handleSubmit(handleSubmit)} buttonLabel="Bekreft og fortsett">
                    <Box marginTop={Margin.xLarge}>
                        <TextArea
                            label="Vurder om søker har omsorgen for barnet etter § 9-10, første ledd."
                            name={FieldName.BEGRUNNELSE}
                        />
                    </Box>
                    <Box marginTop={Margin.xLarge}>
                        <RadioGroup
                            question="Har søker omsorgen for barnet i denne perioden?"
                            radios={[
                                { value: RadioOptions.JA, label: 'Ja' },
                                { value: RadioOptions.JA_DELER, label: 'Ja, i deler av perioden' },
                                { value: RadioOptions.NEI, label: 'Nei' },
                            ]}
                            name={FieldName.HAR_SØKER_OMSORGEN_FOR_I_PERIODE}
                        />
                    </Box>
                    {harSøkerOmsorgenFor === RadioOptions.JA_DELER && (
                        <Box marginTop={Margin.xLarge}>
                            <PeriodpickerList
                                name={FieldName.PERIODER}
                                legend="I hvilke perioder har søker omsorgen for barnet?"
                                fromDatepickerProps={{ label: 'Fra', ariaLabel: 'Fra' }}
                                toDatepickerProps={{ label: 'Til', ariaLabel: 'Til' }}
                                defaultValues={[new Period(omsorgsperiode.periode.fom, omsorgsperiode.periode.tom)]}
                                renderContentAfterElement={(index, numberOfItems, fieldArrayMethods) => {
                                    return (
                                        <>
                                            {numberOfItems > 1 && (
                                                <DeleteButton
                                                    onClick={() => {
                                                        fieldArrayMethods.remove(index);
                                                    }}
                                                />
                                            )}
                                        </>
                                    );
                                }}
                                renderAfterFieldArray={(fieldArrayMethods) => (
                                    <Box marginTop={Margin.large}>
                                        <AddButton
                                            label="Legg til periode"
                                            onClick={() => fieldArrayMethods.append({ fom: '', tom: '' })}
                                            id="leggTilPeriodeKnapp"
                                        />
                                    </Box>
                                )}
                            />
                        </Box>
                    )}
                    {resterendePerioder.length > 0 && (
                        <Box marginTop={Margin.xLarge}>
                            <AlertStripeInfo>
                                <LabelledContent
                                    label="Resterende perioder har søkeren ikke omsorgen for barnet:"
                                    content={resterendePerioder.map((periode) => (
                                        <p key={`${periode.fom}-${periode.tom}`} style={{ margin: 0 }}>
                                            {prettifyPeriod(periode)}
                                        </p>
                                    ))}
                                />
                            </AlertStripeInfo>
                        </Box>
                    )}
                </Form>
            </FormProvider>
        </DetailView>
    );
};

export default VurderingAvOmsorgsperioderForm;
