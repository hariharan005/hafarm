declare module "canvas-confetti" {
  export interface Options {
    particleCount?: number;
    angle?: number;
    spread?: number;
    origin?: { x: number; y?: number };
    gravity?: number;
    scalar?: number;
    ticks?: number;
    startVelocity?: number;
    decay?: number;
    drift?: number;
    colors?: string[];
    shapes?: string[];

    // 👇 extend with emoji support
    emojis?: string[];
    emojiSize?: number;
  }

  export default function confetti(options?: Options): Promise<null>;
}
