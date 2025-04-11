import { Injectable } from '@nestjs/common';
import { Counter, Histogram, collectDefaultMetrics } from 'prom-client';

@Injectable()
export class MetricsService {
  private readonly counter: Counter;
  private readonly httpRequestTimer: Histogram;

  constructor() {
    collectDefaultMetrics();
    this.counter = new Counter({
      name: 'booking_counter',
      help: 'Booking Metrics',
      labelNames: ['status', 'code'],
    });

    this.httpRequestTimer = new Histogram({
      name: 'http_request_duration_seconds',
      help: 'Duration of HTTP requests in seconds',
      labelNames: ['route', 'method', 'code'],
    });
  }

  increment(status: string, code: string) {
    this.counter.labels(status, code).inc();
  }

  startTimer() {
    return this.httpRequestTimer.startTimer();
  }
}
