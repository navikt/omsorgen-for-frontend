import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Period } from '../../types/Period';
import PeriodpickerList from '../form/wrappers/PeriodpickerList';
import { prettifyPeriod } from '../../util/formats';
import TextArea from '../form/wrappers/TextArea';

interface OmsorgenForFormProps {
    perioderSomMåVurderes: Period[];
}

const OmsorgenForForm = ({ perioderSomMåVurderes }: OmsorgenForFormProps) => {
    const formMethods = useForm({
        defaultValues: {},
    });

    return (
        <div>
            <FormProvider {...formMethods}>
                Disse periodene må vurderes {perioderSomMåVurderes.map(prettifyPeriod)}
                <form onSubmit={(e) => e.preventDefault()}>
                    <PeriodpickerList
                        name="perioder1"
                        legend="perioder oppfylt"
                        fromDatepickerProps={{ label: 'fra' }}
                        toDatepickerProps={{ label: 'til' }}
                    />
                    <PeriodpickerList
                        name="perioder2"
                        legend="perioder ikke oppfylt"
                        fromDatepickerProps={{ label: 'fra' }}
                        toDatepickerProps={{ label: 'til' }}
                    />
                    <TextArea name="begrunnelse" label="Begrunnelse" />
                    <Hovedknapp>Lagre</Hovedknapp>
                </form>
            </FormProvider>
        </div>
    );
};

export default OmsorgenForForm;
