import type { ByteArray, Hex } from '../../types'
import { BaseError } from '../BaseError'
import { hexToBigInt, hexToNumber } from './decodeHex'
import { bytesToHex } from './encodeHex'

type DecodeBytesResponse<TTo> = TTo extends 'string'
  ? string
  : TTo extends 'hex'
  ? Hex
  : TTo extends 'bigint'
  ? bigint
  : TTo extends 'number'
  ? number
  : TTo extends 'boolean'
  ? boolean
  : never

/**
 * @description Decodes a byte array into a UTF-8 string, hex value, number, bigint or boolean.
 */
export function decodeBytes<
  TTo extends 'string' | 'hex' | 'bigint' | 'number' | 'boolean',
>(bytes: ByteArray, to: TTo): DecodeBytesResponse<TTo> {
  if (to === 'number') return bytesToNumber(bytes) as DecodeBytesResponse<TTo>
  if (to === 'bigint') return bytesToBigint(bytes) as DecodeBytesResponse<TTo>
  if (to === 'boolean') return bytesToBool(bytes) as DecodeBytesResponse<TTo>
  if (to === 'string') return bytesToString(bytes) as DecodeBytesResponse<TTo>
  return bytesToHex(bytes) as DecodeBytesResponse<TTo>
}

/**
 * @description Decodes a byte array into a bigint.
 */
export function bytesToBigint(bytes: ByteArray): bigint {
  const hex = bytesToHex(bytes)
  return hexToBigInt(hex)
}

/**
 * @description Decodes a byte array into a boolean.
 */
export function bytesToBool(bytes: ByteArray): boolean {
  if (bytes.length > 1 || bytes[0] > 1)
    throw new InvalidBytesBooleanError(bytes)
  return Boolean(bytes[0])
}

export { bytesToHex }

/**
 * @description Decodes a byte array into a number.
 */
export function bytesToNumber(bytes: ByteArray): number {
  const hex = bytesToHex(bytes)
  return hexToNumber(hex)
}

/**
 * @description Decodes a byte array into a UTF-8 string.
 */
export function bytesToString(bytes: ByteArray): string {
  return new TextDecoder().decode(bytes)
}

////////////////////////////////////////////////////////////
// Errors

class InvalidBytesBooleanError extends BaseError {
  name = 'InvalidBytesBooleanError'
  constructor(bytes: ByteArray) {
    super(
      `Bytes value "${bytes}" is not a valid boolean. The bytes array must contain a single byte of either a 0 or 1 value.`,
    )
  }
}
