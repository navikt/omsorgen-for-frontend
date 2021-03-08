import React from 'react';
import { ContainerContract } from '../types/ContainerContract';
import OmsorgenForSummary from './components/OmsorgenForSummary';
import OmsorgenForForm from './components/OmsorgenForForm';

interface MainComponentProps {
    data: ContainerContract;
}

const MainComponent = ({ data: { readOnly, perioderSomMåVurderes } }: MainComponentProps) => {
    if (readOnly) {
        return <OmsorgenForSummary />;
    }
    return <OmsorgenForForm perioderSomMåVurderes={perioderSomMåVurderes} />;
};
export default MainComponent;
