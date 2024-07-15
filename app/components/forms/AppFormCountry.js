import React from "react";
import { useFormikContext } from "formik";

import CountryPickerComponent from "../CountryPickerComponent";
import ErrorMessage from "./ErrorMessage";

function AppFormCountry({ name }) {

    const { setFieldValue, errors, touched } = useFormikContext();

    return (
        <>
            <CountryPickerComponent
                onSelectCountry={(country)=> setFieldValue(name, country)}
            />
            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </>
    );
}

export default AppFormCountry;
