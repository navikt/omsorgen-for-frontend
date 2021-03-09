import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Omsorgsperiode } from '../../types/OppgittOmsorgsperiode';
import PeriodpickerList from '../form/wrappers/PeriodpickerList';
import RadioGroup from '../form/wrappers/RadioGroup';
import TextArea from '../form/wrappers/TextArea';
import AddButton from './add-button/AddButton';
import Box, { Margin } from './box/Box';
import DetailView from './detail-view/DetailView';
import Form from './form/Form';
import LabelledContent from './labelled-content/LabelledContent';
import DeleteButton from './delete-button/DeleteButton';
import { Period } from '../../types/Period';
import Relajson from '../../types/Relasjon';

interface OmsorgenForFormProps {
    omsorgsperiode: Omsorgsperiode;
}

const OmsorgenForForm = ({ omsorgsperiode }: OmsorgenForFormProps): JSX.Element => {
    const formMethods = useForm({
        defaultValues: {
            perioder: [omsorgsperiode.periode],
        },
    });

    return (
        <DetailView title="Vurdering av omsorg">
            <FormProvider {...formMethods}>
                <Box marginTop={Margin.xLarge}>
                    <LabelledContent label="Oppgitt relasjon i søknaden" content={omsorgsperiode.relasjon} />
                </Box>
                {omsorgsperiode.relasjon === Relajson.ANNET && (
                    <Box marginTop={Margin.xLarge}>
                        <LabelledContent label="Beskrivelse fra søker" content={omsorgsperiode.relasjonsbeskrivelse} />
                    </Box>
                )}
                <Form onSubmit={formMethods.handleSubmit} buttonLabel="Bekreft og fortsett">
                    <Box marginTop={Margin.xLarge}>
                        <TextArea
                            label="Vurder om søker har omsorgen for barnet etter § 9-10, første ledd."
                            name="vurderOmsorgen"
                        />
                    </Box>
                    <Box marginTop={Margin.xLarge}>
                        <RadioGroup
                            question="Har søker omsorgen for barnet i denne perioder?"
                            radios={[
                                { value: 'hele', label: 'Ja, hele perioden' },
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
                </Form>
            </FormProvider>
        </DetailView>
    );
};

export default OmsorgenForForm;
