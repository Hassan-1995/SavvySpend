import React from 'react';
import { useFormikContext } from "formik";

import AttachmentComponent from '../AttachmentComponent';
import ErrorMessage from './ErrorMessage';

function AppFormAttachment({ name }) {
    
    const { setFieldValue, errors, touched } = useFormikContext();
    return (
        <>
            <AttachmentComponent
                onSelectAttachment={(attachment)=> setFieldValue(name, attachment)}
            />
            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </>
    );
}

export default AppFormAttachment;