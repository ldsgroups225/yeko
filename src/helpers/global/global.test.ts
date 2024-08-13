import { isObjectLike, isValidJSON } from './index';

describe('isValidJSON', () => {
  it('should return true for valid JSON string', () => {
    expect(isValidJSON('{"name":"John","age":30,"city":"New York"}')).toBe(true);
    expect(isValidJSON('[]')).toBe(true);
    expect(isValidJSON('"string"')).toBe(true);
    expect(isValidJSON('123')).toBe(true);
    expect(isValidJSON('true')).toBe(true);
    expect(isValidJSON('null')).toBe(true);
  });

  it('should return false for invalid JSON string', () => {
    expect(isValidJSON('{"name":"John","age":30,"city":"New York"')).toBe(false);
    expect(isValidJSON('{')).toBe(false);
    expect(isValidJSON('["unclosed array"')).toBe(false);
    expect(isValidJSON('undefined')).toBe(false);
  });

  it('should return false for non-string input', () => {
    expect(isValidJSON(123)).toBe(false);
    expect(isValidJSON(true)).toBe(false);
    expect(isValidJSON({})).toBe(false);
    expect(isValidJSON([])).toBe(false);
  });

  it('should return false for null input', () => {
    expect(isValidJSON(null)).toBe(false);
  });

  it('should return false for undefined input', () => {
    expect(isValidJSON(undefined)).toBe(false);
  });
});

describe('isObjectLike', () => {
  it('should return true if the value is a plain object', () => {
    expect(isObjectLike({})).toBe(true);
    expect(isObjectLike({ foo: 'bar' })).toBe(true);
  });

  it('should return true if the value is an instance of a class', () => {
    class TestClass {}
    expect(isObjectLike(new TestClass())).toBe(true);
  });

  it('should return false if the value is null', () => {
    expect(isObjectLike(null)).toBe(false);
  });

  it('should return false if the value is a primitive', () => {
    expect(isObjectLike('test')).toBe(false);
    expect(isObjectLike(123)).toBe(false);
    expect(isObjectLike(true)).toBe(false);
    expect(isObjectLike(false)).toBe(false);
    expect(isObjectLike(undefined)).toBe(false);
    expect(isObjectLike(Symbol('test'))).toBe(false);
  });

  it('should return false if the value is a function', () => {
    expect(isObjectLike(() => {})).toBe(false);
    expect(isObjectLike(function () {})).toBe(false);
  });

  it('should return true if the value is an array', () => {
    expect(isObjectLike([1, 2, 3])).toBe(true);
    expect(isObjectLike([])).toBe(true);
  });

  it('should return true for other object-like values', () => {
    expect(isObjectLike(new Date())).toBe(true);
    expect(isObjectLike(/regex/)).toBe(true);
    if (typeof Map !== 'undefined') expect(isObjectLike(new Map())).toBe(true);
    if (typeof Set !== 'undefined') expect(isObjectLike(new Set())).toBe(true);
  });
});
