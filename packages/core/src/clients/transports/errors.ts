import { BaseError } from '../../utils'

export class UrlRequiredError extends BaseError {
  constructor() {
    super(
      'No URL was provided to the Transport. Please provide a valid RPC URL to the Transport.',
      {
        docsPath: '/TODO',
      },
    )
  }
}
