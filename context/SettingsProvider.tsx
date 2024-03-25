import { SetValue } from "@/types/SetValue";
import { type ReactNode, createContext, useContext, useState } from "react";

export type Settings = {
    isDarkTheme: boolean;
};

type SettingsContext = {
    settings: Settings;
    setSettings: SetValue<Settings>;
};

const SettingsCtx = createContext<SettingsContext>({
    settings: {
        isDarkTheme: false,
    },
    setSettings: () => { },
});

export const useSettings = () => useContext(SettingsCtx);

const SettingsContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [settings, setSettings] = useState<Settings>({ isDarkTheme: false });

    return (
        <SettingsCtx.Provider value={{ settings, setSettings }}>
            {children}
        </SettingsCtx.Provider>
    );
};

export default SettingsContextProvider;
