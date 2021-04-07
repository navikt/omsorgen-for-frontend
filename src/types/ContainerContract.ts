import { HttpErrorHandler } from './HttpErrorHandler';

export interface ContainerContract {
    endpoints: {
        omsorgsperioder: string;
    };
    readOnly: boolean;
    onFinished: (vurdering) => void;
    httpErrorHandler: HttpErrorHandler;
}
