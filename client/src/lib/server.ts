export class Server {
  private static baseurl: string = "http://localhost:15702" as string;

  static baseURL(): string {
    return this.baseurl;
  }
  static setbaseURL(url: string) {
    this.baseurl = url;
  }
}
