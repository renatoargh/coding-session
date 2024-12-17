export class IdProvider {
  private current: number = 1

  getNext() {
    return this.current++
  }
}
