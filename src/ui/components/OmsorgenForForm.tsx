import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Period } from '../../types/Period';
import PeriodpickerList from '../form/wrappers/PeriodpickerList';

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
                <form onSubmit={(data) => console.log(123)}>
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
                </form>
            </FormProvider>
        </div>
    );
};

export default OmsorgenForForm;
