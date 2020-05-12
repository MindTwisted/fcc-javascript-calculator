import { isOperator, isStringOfNumbers, isStringOfNumbersWithDotInTheMiddle } from './utils'

class CalculationQueue {
    private readonly queue: string[]

    constructor (initialQueue: string[] = []) {
      this.queue = initialQueue
    }

    public getLastItem (): string {
      return this.queue[this.queue.length - 1]
    }

    public getQueueAsArray (): string[] {
      return [...this.queue]
    }

    public appendToQueue (value: string): CalculationQueue {
      return new CalculationQueue([...this.queue, value])
    }

    public removeOperatorFromTheEndOfTheQueue (): CalculationQueue {
      if (this.isEndsWithOperator()) {
        const currentQueue = this.getQueueAsArray()

        return new CalculationQueue(currentQueue.slice(0, currentQueue.length - 1))
      }

      return new CalculationQueue(this.getQueueAsArray())
    }

    public isFinished (): boolean {
      return this.queue.includes('=')
    }

    public isEndsWithOperator (): boolean {
      return isOperator(this.getLastItem())
    }

    public isEndsWithNumber (): boolean {
      return isStringOfNumbers(this.getLastItem()) || isStringOfNumbersWithDotInTheMiddle(this.getLastItem())
    }

    public isEmpty (): boolean {
      return this.queue.length === 0
    }
}

export default CalculationQueue
