import { DeepPartial, PickByValue } from 'utility-types';

export type Type<T> = new (...args: any[]) => T;

type PartialOrPromise<T> = T extends Promise<infer U> ? U : DeepPartial<T> | null;

type PropertyMock<PropertyType> = PropertyType extends (...args: any[]) => any
  ? PropertyType & jest.MockInstance<PartialOrPromise<ReturnType<PropertyType>>, Parameters<PropertyType>>
  : PropertyType;

export type ClassMock<T> = {
  [K in keyof PickByValue<T, Function>]: PropertyMock<T[K]>;
} &
  T;

export function mockClass<Class>(classType: Type<Class>): Type<ClassMock<Class>> {
  class MockedClass {
    constructor() {
      Object.getOwnPropertyNames(classType.prototype)
        .filter(method => !(this as any)[method] && method !== 'constructor')
        .forEach(method => {
          (this as any)[method] = jest.fn().mockName(method);
        });
    }
  }

  return MockedClass as Type<ClassMock<Class>>;
}
