import JsCookie from 'js-cookie';

const COOKIE_OPTIONS={
      expires: 1,
}

export const saveCookie = (key: string, value: string, options:typeof COOKIE_OPTIONS = COOKIE_OPTIONS) => {
    JsCookie.set(key, value, options);
}

export const getCookie = (key: string) => {
    return JsCookie.get(key);
}

export const COOKIE_KEYS = {
    ACCESS_COOKIE:'IGAME_ACCESS_TOKEN',
}