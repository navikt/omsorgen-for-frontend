import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Omsorgsperiode } from '../../../types/OppgittOmsorgsperiode';
import DetailView from '../detail-view/DetailView';
import Box, { Margin } from '../box/Box';
import LabelledContent from '../labelled-content/LabelledContent';
import Relasjon from '../../../types/Relasjon';
import Form from '../form/Form';
import RadioGroup from '../../form/wrappers/RadioGroup';
import TextArea from '../../form/wrappers/TextArea';
import PeriodpickerList from '../../form/wrappers/PeriodpickerList';
import { Period } from '../../../types/Period';
import DeleteButton from '../delete-button/DeleteButton';
import AddButton from '../add-button/AddButton';
import { getPeriodDifference } from '../../../util/dateUtils';
import { prettifyPeriod } from '../../../util/formats';

interface VurderingAvOmsorgsperioderFormProps {
    omsorgsperiode: Omsorgsperiode;
    onSubmit: () => void;
}

interface VurderingAvOmsorgsperioderFormState {
    begrunnelse: string;
    perioder: Period[];
}

const VurderingAvOmsorgsperioderForm = ({
    omsorgsperiode,
    onSubmit,
}: VurderingAvOmsorgsperioderFormProps): JSX.Element => {
    const formMethods = useForm({
        defaultValues: {
            perioder: [{ period: omsorgsperiode.periode }],
        },
    });

    const perioder = formMethods.watch('perioder');
    const formatertePerioder = perioder.map((periode) => periode.period);
    const resterendePerioder =
        formatertePerioder.length > 0 && getPeriodDifference(omsorgsperiode.periode, formatertePerioder);

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
                <Form onSubmit={formMethods.handleSubmit(onSubmit)} buttonLabel="Bekreft og fortsett">
                    <Box marginTop={Margin.xLarge}>
                        <TextArea
                            label="Vurder om søker har omsorgen for barnet etter § 9-10, første ledd."
                            name="vurderOmsorgen"
                        />
                    </Box>
                    <Box marginTop={Margin.xLarge}>
                        <RadioGroup
                            question="Har søker omsorgen for barnet i denne perioden?"
                            radios={[
                                { value: 'ja', label: 'Ja' },
                                { value: 'deler', label: 'Ja, i deler av perioden' },
                                { value: 'nei', label: 'Nei' },
                            ]}
                            name="harSøkerOmsorgenForIPeriode"
                        />
                    </Box>
                    <Box marginTop={Margin.xLarge}>
                        <PeriodpickerList
                            name="perioder"
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
                    {resterendePerioder.length > 0 && (
                        <Box marginTop={Margin.xLarge}>
                            <LabelledContent
                                label="Resterende perioder har søkeren ikke omsorgen for barnet:"
                                content={resterendePerioder.map((periode) => (
                                    <p>{prettifyPeriod(periode)}</p>
                                ))}
                            />
                        </Box>
                    )}
                </Form>
            </FormProvider>
        </DetailView>
    );
};

export default VurderingAvOmsorgsperioderForm;
