import { Element } from 'nav-frontend-typografi';
import React from 'react';
import styles from './labelledContent.less';

interface LabelledContentProps {
    label: string;
    content: React.ReactNode;
}

const LabelledContent = ({ label, content }: LabelledContentProps) => (
    <div className={styles.labelledContent}>
        <Element className={styles.labelledContent__label}>{label}</Element>
        <div className={styles.labelledContent__content}>{content}</div>
    </div>
);

export default LabelledContent;
