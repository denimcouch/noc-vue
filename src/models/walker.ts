import p5 from 'p5'
import { setP5Fill, setP5Stroke } from '@/utils/p5-theme'

export interface WalkerTheme {
  strokeColor: string
  fillColor: string
}

export const walkerBiases = ['random', 'towardsMouse'] as const
export type WalkerBias = (typeof walkerBiases)[number]

/**
 * A class that represents a walker in a p5.js canvas
 * @param x - The x-coordinate of the walker
 * @param y - The y-coordinate of the walker
 * @param p - The p5.js instance
 * @param theme - The theme of the walker
 *
 * @example
 * ```ts
 * const theme = { strokeColor: '#000000', fillColor: '#000000' }
 * const walker = new Walker(100, 100, p, theme)
 * walker.show()
 * walker.step()
 * ```
 */
export class Walker {
  x: number
  y: number
  p: p5
  bias: WalkerBias
  theme: WalkerTheme

  constructor(x: number, y: number, p: p5, bias?: WalkerBias, theme?: WalkerTheme) {
    this.x = x
    this.y = y
    this.p = p
    this.bias = bias || 'random'
    this.theme = theme || { strokeColor: '#000000', fillColor: '#000000' }
  }

  public show() {
    setP5Stroke(this.p, this.theme.strokeColor)
    setP5Fill(this.p, this.theme.fillColor)
    this.p.point(this.x, this.y)
  }

  public step() {
    switch (this.bias) {
      case 'random':
        this.randomWalk()
        break
      case 'towardsMouse':
        this.towardsMouseWalk()
        break
    }
  }

  private randomWalk() {
    this.x += this.p.random(-1, 1)
    this.y += this.p.random(-1, 1)
  }

  private towardsMouseWalk() {
    const random = this.p.random(1)
    if (random < 0.5) {
      const mouseX = this.p.mouseX
      const mouseY = this.p.mouseY
      const dx = mouseX - this.x
      const dy = mouseY - this.y

      if (Math.abs(dx) > Math.abs(dy)) {
        this.x += dx > 0 ? 1 : -1
      } else {
        this.y += dy > 0 ? 1 : -1
      }
    } else {
      this.randomWalk()
    }
  }
}

// 4-direction random walk
// const choice = Math.floor(this.p.random(4)) // 0, 1, 2, 3

// switch (choice) {
//   case 0:
//     this.x++
//     break
//   case 1:
//     this.x--
//     break
//   case 2:
//     this.y++
//     break
//   case 3:
//     this.y--
//     break
// }

// 8-direction random walk
// const xstep = this.p.random(-1, 1)
// const ystep = this.p.random(-1, 1)
// this.x += this.p.random(-1, 1)
// this.y += this.p.random(-1, 1)

// 8-direction random walk with bias towards direction
// const random = this.p.random(1)
// if (random < 0.4) {
//   this.x++
// } else if (random < 0.6) {
//   this.x--
// } else if (random < 0.8) {
//   this.y++
// } else {
//   this.y--
// }
