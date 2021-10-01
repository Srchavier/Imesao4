import { CacheProvider } from '@emotion/react';
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { SSRCookies, SSRKeycloakProvider } from '@react-keycloak/ssr';
import type { AppContext, AppProps } from 'next/app';
import * as React from 'react';
import { TenantProvider } from '../components/tenantProvider';
import '../styles/globals.css';
import { KEYCLOAK_PUBLIC_CONFIG } from '../utils/auth';
import { parseCookies } from '../utils/cookies';
import createEmotionCache from '../utils/createEmotionCache';
import theme from "../utils/themes";


const clientSideEmotionCache = createEmotionCache();

function MyApp(props: AppProps & { cookies: any, emotionCache: any }) {

  const { Component, emotionCache = clientSideEmotionCache, pageProps, cookies } = props;


  React.useEffect(() => {
    const jssStyles: any = document.querySelector("#jss-server-side");
    jssStyles?.parentElement?.removeChild(jssStyles);

  })
  return (

    <SSRKeycloakProvider
      keycloakConfig={KEYCLOAK_PUBLIC_CONFIG}
      persistor={SSRCookies(cookies)}
      initOptions={{
        onLoad: "check-sso",
        silentCheckSsoRedirectUri:
          typeof window !== "undefined"
            ? `${window.location.origin}/silent-check-sso.html`
            : null,
      }}

    >
      <CacheProvider value={emotionCache}>
        <TenantProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </TenantProvider>
      </CacheProvider>
    </SSRKeycloakProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  return {
    cookies: parseCookies(appContext.ctx.req)
  }
}

export default MyApp
