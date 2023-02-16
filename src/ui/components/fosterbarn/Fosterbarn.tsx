/* eslint-disable react/jsx-props-no-spreading */
import { Delete } from '@navikt/ds-icons';
import { Button, Heading, Panel, Table, TextField } from '@navikt/ds-react';
import validator from '@navikt/fnrvalidator';
import { Box, Margin } from '@navikt/ft-plattform-komponenter';
import React, { useContext, useEffect } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import ContainerContext from '../../context/ContainerContext';

interface FosterbarnProps {
    setFosterbarn: React.Dispatch<React.SetStateAction<string[]>>;
}

const Fosterbarn = ({ setFosterbarn }: FosterbarnProps) => {
    const { readOnly } = useContext(ContainerContext);
    const { control, register } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'fosterbarn',
    });

    const fosterbarnFormValues: { fødselsnummer: string }[] = useWatch({ name: 'fosterbarn', control });

    useEffect(() => {
        const unikeFosterbarn = new Set(fosterbarnFormValues?.map((fosterbarn) => fosterbarn.fødselsnummer));
        setFosterbarn([...unikeFosterbarn]);
    }, [fosterbarnFormValues]);

    return (
        <Box marginBottom={Margin.large}>
            <Panel border>
                <Box marginBottom={Margin.medium}>
                    <Heading level="2" size="medium">
                        Fosterbarn
                    </Heading>
                </Box>
                {fields.length > 0 && (
                    <Box marginBottom={Margin.medium}>
                        <Table>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell scope="col" />
                                    <Table.HeaderCell scope="col">Fødselsnummer</Table.HeaderCell>
                                    <Table.HeaderCell scope="col">Fjern</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            {fields.map((field, index) => (
                                <Table.Row key={field.id}>
                                    <Table.DataCell>{`Fosterbarn ${index + 1}`}</Table.DataCell>
                                    <Table.DataCell>
                                        <TextField
                                            {...register(`fosterbarn.${index}.fødselsnummer`, {
                                                required: true,
                                                minLength: 11,
                                                maxLength: 11,
                                                validate: {
                                                    hasValidFodselsnummer: (value) =>
                                                        validator.fnr(value).status === 'valid' ||
                                                        'Ugyldig fødselsnummer',
                                                },
                                            })}
                                            hideLabel
                                            label="Fødselsnummer"
                                            size="small"
                                            htmlSize={11}
                                        />
                                    </Table.DataCell>
                                    <Table.DataCell>
                                        <Button
                                            variant="tertiary"
                                            onClick={() => remove(index)}
                                            disabled={readOnly}
                                            icon={<Delete />}
                                            aria-label="Fjern fosterbarn"
                                        />
                                    </Table.DataCell>
                                </Table.Row>
                            ))}
                        </Table>
                    </Box>
                )}

                <Button variant="secondary" onClick={() => append({ fødselsnummer: '' })} size="small">
                    Legg til fosterbarn
                </Button>
            </Panel>
        </Box>
    );
};

export default Fosterbarn;
