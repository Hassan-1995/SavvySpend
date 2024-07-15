import React from 'react';

import { useFormikContext } from 'formik';

import ErrorMessage from './ErrorMessage';
import ContactNumberComponent from '../ContactNumberComponent';

function AppFormContactNumber({ name }) {

    const { setFieldValue, errors, touched } = useFormikContext();

    return (
        <>
            <ContactNumberComponent
                onSelectCode={(dial_code, dial_number)=> setFieldValue(name, {dial_code, dial_number})}
            />
            {/* <ErrorMessage error={errors[name]} visible={touched[name]} /> */}
            <ErrorMessage error={errors[name]?.dial_code || errors[name]?.dial_number} visible={touched[name]} />
        </>
    );
}

export default AppFormContactNumber;