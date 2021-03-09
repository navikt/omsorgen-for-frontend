import renderers from './util/renderers';

(window as any).renderOmsorgenForApp = async (appId, data) => {
    const { renderAppInSuccessfulState } = renderers;
    renderAppInSuccessfulState(appId, data);
};
