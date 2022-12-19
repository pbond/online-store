export class Webrequest {
  public static async get<T>(endpoint: string): Promise<T> {
    try {
      const response: Response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        console.log(`Sorry, but there is ${response.status} error: ${response.statusText}`);
        throw new Error(`Error! status: ${response.status}`);
      }

      return (await response.json()) as T;
    } catch (error) {
      if (error instanceof Error) {
        console.log('error message: ', error.message);
      } else {
        console.log('unexpected error: ', error);
      }
      return Promise.reject();
    }
  }
}
