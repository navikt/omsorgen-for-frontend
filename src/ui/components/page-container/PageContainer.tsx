import * as React from 'react';
import Spinner from 'nav-frontend-spinner';
import PageError from '../page-error/PageError';

interface PageContainerProps {
    isLoading?: boolean;
    hasError?: boolean;
    children?: React.ReactNode;
}

const PageContainer = ({ isLoading, hasError, children }: PageContainerProps): JSX.Element => {
    const shouldHideChildren = isLoading || hasError;

    return (
        <>
            {isLoading && <Spinner />}
            {hasError && <PageError message="Noe gikk galt, vennligst prøv igjen senere" />}
            {!shouldHideChildren && children}
        </>
    );
};

export default PageContainer;
