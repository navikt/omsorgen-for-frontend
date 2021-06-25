import { ContainerContract } from './types/ContainerContract';
import renderers from './util/renderers';

interface ExtendedWindow extends Window {
    renderOmsorgenForApp: (id: string, contract: ContainerContract) => void;
}

(window as Partial<ExtendedWindow>).renderOmsorgenForApp = async (appId, data) => {
    const { renderAppInSuccessfulState } = renderers;
    renderAppInSuccessfulState(appId, data);
};
