let isDev = false;
export const showVerboseErrors = () => isDev === true;

// in case self.location produces some error, default to production
try {
    isDev = self.location.hostname === 'localhost' || self.location.hostname === '127.0.0.1';
}
catch (err) {
    isDev = false;
}

/**
 * Urls for the client site builder
 * DO NOT ADD TRAILING SLASHES
 */
export const SiteUrl =      isDev ? 'http://127.0.0.1:1130'         : 'https://fp-auth-proxy.matt-f33.workers.dev';
// note that for development, this also needs to be updated in codegen.yml
export const GraphqlUrl =   isDev ? 'http://localhost:1130/data-api/graphql' : 'https://fp-auth-proxy.matt-f33.workers.dev/data-api/graphql'; 

if (isDev) {
    console.log('%c\nDevelopment Mode\n', 'color: red; font-size: 20px; font-weight: normal;')
    console.table({ GraphqlUrl, SiteUrl });
}
else {
    console.log('%c\n💫 Stellar\n', ' font-size: 20px; font-weight: normal;')
}

/**
 * 
 */
export const meanFragmentSizeInKb = 0.5;