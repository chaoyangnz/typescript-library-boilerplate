import { ClassMock, Type, mockClass } from './class-mock';

class SampleService {
  a = 'string property'

  func1(): void {
    this.a += '';
  }

  func2(): number {
    return 2;
  }

  func3(b: string): string {
    return this.a + b;
  }

  func4(b: string, c: number): string {
    return this.a + b + c;
  }

  async func5() {
    return Promise.resolve(1);
  }
}

describe('mock plain javascript class', () => {
  const SampleServiceMockClass: Type<ClassMock<SampleService>> = mockClass(SampleService);
  const sampleServiceMock: ClassMock<SampleService> = new SampleServiceMockClass();
  it('should have no compilation error', async () => {
    expect(sampleServiceMock.a).toBeUndefined();

    sampleServiceMock.func1();
    expect(sampleServiceMock.func1).toHaveBeenCalled();

    sampleServiceMock.func2();
    expect(sampleServiceMock.func1).toHaveBeenCalled();

    sampleServiceMock.func3('a');
    expect(sampleServiceMock.func3).toHaveBeenLastCalledWith('a');

    sampleServiceMock.func4('b', 2);
    expect(sampleServiceMock.func4).toHaveBeenLastCalledWith('b', 2);

    sampleServiceMock.func5.mockResolvedValue(5);
    expect(await sampleServiceMock.func5()).toBe(5);
  });
})

