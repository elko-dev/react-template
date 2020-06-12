const key: string | undefined = process.env.REACT_APP_ENV;

type urlOptions = {
  [key: string]: string;
};
const urlMap: urlOptions = {
  local: 'localhost:4000',
  dev: '<DEV_BASE_URL>',
  stage: '<STAGE_BASE_URL>',
  prod: '<PROD_BASE_URL>',
};

export const environment = {
  apiBase: getUrl(),
};

function getUrl(): string {
  if (!key) {
    console.error(
      'REACT_APP_ENV variable was undefined.  We need this to select the correct environment specific variables'
    );
    return '';
  }
  console.log(key);
  return urlMap[key];
}
