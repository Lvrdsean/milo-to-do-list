import React from "react";

export type SetValue<T> =
    | React.Dispatch<React.SetStateAction<T>>
    | ((value: T) => void);
