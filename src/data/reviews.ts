export interface Review {
  name: string;
  text: string;
  source?: string;
}

// TODO: власник додає реальні відгуки з іменами й текстом (лише за згодою авторів)
export const reviews: Review[] = [];
