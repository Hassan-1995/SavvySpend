import React from 'react';
import { useFormikContext } from 'formik';

import DateInput from '../DateInput';
import ErrorMessage from './ErrorMessage';

function AppFormDate({ name }) {

    const { setFieldValue, errors, touched } = useFormikContext();

    return (
        <>
            <DateInput
                onDateChange={(date)=> setFieldValue(name, date)}
            />
            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </>
    );
}



export default AppFormDate;