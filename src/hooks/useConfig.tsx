import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Cookies from "js-cookie";
import jsYaml from "js-yaml";

export type AppConfig = {
  title: string;
  description: string;
  github_link?: string;
  video_fit?: "cover" | "contain";
  settings: UserSettings;
  show_qr?: boolean;
};

export type UserSettings = {
  editable: boolean;
  theme_color: string;
  chat: boolean;
  inputs: {
    camera: boolean;
    mic: boolean;
  };
  outputs: {
    audio: boolean;
    video: boolean;
  };
  ws_url: string;
  token: string;
};

const defaultConfig: AppConfig = {
  title: "BEE",
  description: "Bee agent",
  settings: {
    editable: true,
    theme_color: "cyan",
    chat: true,
    inputs: {
      camera: false,
      mic: true,
    },
    outputs: {
      audio: true,
      video: false,
    },
    ws_url: "",
    token: "",
  },
  show_qr: false,
};

const useAppConfig = (): AppConfig => {
  return useMemo(() => {
    try {
      const envConfig = import.meta.env.VITE_APP_CONFIG;
      if (envConfig) {
        const parsedConfig = jsYaml.load(envConfig) as AppConfig;
        if (parsedConfig.settings === undefined) {
          parsedConfig.settings = defaultConfig.settings;
        }
        if (parsedConfig.settings.editable === undefined) {
          parsedConfig.settings.editable = true;
        }
        return parsedConfig;
      }
    } catch (e) {
      console.error("Error parsing app config:", e);
    }
    return defaultConfig;
  }, []);
};

type ConfigData = {
  config: AppConfig;
  setUserSettings: (settings: UserSettings) => void;
};

const ConfigContext = createContext<ConfigData | undefined>(undefined);

export const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const appConfig = useAppConfig();
  const [localColorOverride, setLocalColorOverride] = useState<string | null>(
    null
  );

  const getSettingsFromCookies = useCallback(() => {
    const appConfigFromSettings = appConfig;
    if (appConfigFromSettings.settings.editable === false) {
      return null;
    }
    const jsonSettings = Cookies.get("lk_settings");
    if (!jsonSettings) {
      return null;
    }
    try {
      return JSON.parse(jsonSettings) as UserSettings;
    } catch {
      return null;
    }
  }, [appConfig]);

  const setCookieSettings = useCallback((us: UserSettings) => {
    const json = JSON.stringify(us);
    Cookies.set("lk_settings", json, { expires: 365, path: "/" });
  }, []);

  const getConfig = useCallback(() => {
    const appConfigFromSettings = appConfig;

    if (appConfigFromSettings.settings.editable === false) {
      if (localColorOverride) {
        appConfigFromSettings.settings.theme_color = localColorOverride;
      }
      return appConfigFromSettings;
    }

    const newCookieSettings = getSettingsFromCookies();
    if (!newCookieSettings) {
      return appConfigFromSettings;
    }
    appConfigFromSettings.settings = newCookieSettings;
    return { ...appConfigFromSettings };
  }, [appConfig, getSettingsFromCookies, localColorOverride]);

  const setUserSettings = useCallback(
    (settings: UserSettings) => {
      const appConfigFromSettings = appConfig;
      if (appConfigFromSettings.settings.editable === false) {
        setLocalColorOverride(settings.theme_color);
        return;
      }
      setCookieSettings(settings);
      _setConfig((prev) => ({
        ...prev,
        settings,
      }));
    },
    [appConfig, setCookieSettings]
  );

  const [config, _setConfig] = useState<AppConfig>(getConfig());

  useEffect(() => {
    _setConfig(getConfig());
  }, [getConfig]);

  return (
    <ConfigContext.Provider value={{ config, setUserSettings }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = React.useContext(ConfigContext);
  if (context === undefined) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context;
};
