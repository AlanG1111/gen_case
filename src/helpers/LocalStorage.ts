/**
 * @description Class containing methods to work with localStorage
 */
export class LocalStorage {
  static getVideoProgress(id: string) {
    return localStorage.getItem(`video-${id}`);
  }
  static setVideoProgress(id: string, currentTime: number) {
    localStorage.setItem(`video-${id}`, currentTime.toString());
  }
}
