'use client';

import axios from 'axios';

export default function AxiosProvider({ children }: { children: React.ReactNode }) {
  axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/';

  return <>{children}</>;
}
