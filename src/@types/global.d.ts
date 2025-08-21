declare global {
  interface Window {
    APP_CONFIG: {
      BACKEND_ENDPOINT: string;
      APP_ENV: string;
    };
  }
}

export {};

