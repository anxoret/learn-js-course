
import { trimSymbols } from "./trim-symbols";

describe('trimSymbols', () => {
  it('should remove an identical consecutive characters that exceed the specified size', () => {
    expect(trimSymbols('eedaaad', 2)).toEqual('eedaad');
    expect(trimSymbols('xxx', 1)).toEqual('x');
    expect(trimSymbols('xxxaaaaab', 1)).toEqual('xab');
  });

  it('should return empty string if it was passed to function like an argument', () => {
    expect(trimSymbols('', 2)).toEqual('');
  });

  it('should return empty string if "size" equal 0', () => {
    expect(trimSymbols('accbbdd', 0)).toEqual('');
  });

  it('should return the same string if "size" parameter wasn\'t specified', () => {
    expect(trimSymbols('aaa')).toEqual('aaa');
  });
});