import React from 'react';
import TitleWithUnderline from '../title-with-underline/TitleWithUnderline';
import styles from './detailView.less';

interface DetailViewProps {
    title: string;
    children: React.ReactNode;
}

const DetailView = ({ title, children }: DetailViewProps) => (
    <div className={styles.detailView}>
        <TitleWithUnderline>{title}</TitleWithUnderline>
        {children}
    </div>
);

export default DetailView;
