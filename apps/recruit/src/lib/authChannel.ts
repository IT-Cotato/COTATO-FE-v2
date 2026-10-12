/**
 * 탭 간 로그인/로그아웃 동기화
 * HttpOnly 쿠키는 JS에서 읽을 수 없고 변경 이벤트도 없어 storage 이벤트를 대체할 수 없으므로,
 * 상태를 바꾼 탭이 BroadcastChannel로 다른 탭에 알린다.
 */

const AUTH_CHANNEL_NAME = 'cotato-recruit-auth';

export type AuthEvent = 'login' | 'logout';

const isSupported = () => typeof BroadcastChannel !== 'undefined';

export const broadcastAuthEvent = (event: AuthEvent) => {
  if (!isSupported()) return;
  const channel = new BroadcastChannel(AUTH_CHANNEL_NAME);
  channel.postMessage(event);
  channel.close();
};

/** @returns 구독 해제 함수 */
export const subscribeAuthEvent = (listener: (event: AuthEvent) => void) => {
  if (!isSupported()) return () => {};
  const channel = new BroadcastChannel(AUTH_CHANNEL_NAME);
  channel.onmessage = (message: MessageEvent<AuthEvent>) =>
    listener(message.data);
  return () => channel.close();
};
