import React from 'react';
import { render } from 'react-dom';
import MainComponent from '../ui/MainComponent';

const renderAppInSuccessfulState = (appId: string) =>
    render(<MainComponent />, document.getElementById(appId));

export default {
    renderAppInSuccessfulState,
};
