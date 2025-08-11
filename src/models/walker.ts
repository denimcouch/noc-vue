import p5 from 'p5'
import { setP5Fill, setP5Stroke } from '../utils/p5-theme'

export interface WalkerTheme {
  strokeColor: string
  fillColor: string
}

export class Walker {
  x: number
  y: number
  p: p5
  theme: WalkerTheme

  constructor(x: number, y: number, p: p5, theme?: WalkerTheme) {
    this.x = x
    this.y = y
    this.p = p
    this.theme = theme || { strokeColor: '#000000', fillColor: '#000000' }
  }

  show() {
    setP5Stroke(this.p, this.theme.strokeColor)
    setP5Fill(this.p, this.theme.fillColor)
    this.p.point(this.x, this.y)
  }

  step() {
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
    const xstep = this.p.random(-1, 1)
    const ystep = this.p.random(-1, 1)
    this.x += xstep
    this.y += ystep
  }
}
