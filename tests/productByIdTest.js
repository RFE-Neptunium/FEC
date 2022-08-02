import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';

export const requests = new Counter('http_reqs');

export const options = {
  vus: 100,
  duration: '15s',
};

const number = Math.floor(Math.random() * (100) + 1);

const url = `http://localhost:3000/products/${number}`;

export default function () {
  const res = http.get(url);
  sleep(1);
  check(res, {
    'is status 200': r => r.statis === 200,
    'transaction time < 200ms': r => r.timings.duration < 200,
    'transaction time < 500ms': r => r.timings.duration < 500,
    'transaction time < 1000ms': r => r.timings.duration < 1000,
    'transaction time < 2000ms': r => r.timings.duration < 2000,
  });
};