interface User {
  name: {
    first: string;
    last: string;
  };
  login: {
    username: string;
  };
}

export interface ResponseFetch {
  results: [User];
}
