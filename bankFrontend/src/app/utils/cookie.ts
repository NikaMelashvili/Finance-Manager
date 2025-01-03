import {HttpHeaders} from "@angular/common/http";

export function getTokenFromCookie(): string | null {
  const cookieName = 'authToken=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookiesArray = decodedCookie.split(';');

  for (let i = 0; i < cookiesArray.length; i++) {
    let cookie = cookiesArray[i].trim();
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }

  return null;
}

export function attachTokenToHeaders(token: string): HttpHeaders {
  return new HttpHeaders().set('Authorization', `Bearer ${token}`);
}
