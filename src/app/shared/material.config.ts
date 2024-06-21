import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";

export const provideMaterialTagsDefaultOptions = () => {
    return [
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: { appearance: 'outline', hideRequiredMarker: true },
        },
    ];
};
