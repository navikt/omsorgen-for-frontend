import renderers from './util/renderers';

(window as any).renderOmsorgenForApp = async (appId) => {
    const { renderAppInSuccessfulState } = renderers;
    renderAppInSuccessfulState(appId);
};
