import { HttpErrorHandler } from '@navikt/k9-http-utils';

export interface ContainerContract {
    endpoints: {
        omsorgsperioder: string;
    };
    readOnly: boolean;
    onFinished: (vurdering) => void;
    httpErrorHandler: HttpErrorHandler;
}
