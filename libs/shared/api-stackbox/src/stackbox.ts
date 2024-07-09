import {
  EnvironmentProviders,
  Provider,
  importProvidersFrom,
} from '@angular/core';
import {
  StackboxApiModule,
  StackboxConfiguration,
  StackboxConfigurationParameters,
} from './lib';

export function provideStackboxApi(
  configuration: StackboxConfigurationParameters
): (Provider | EnvironmentProviders)[] {
  return [
    importProvidersFrom(
      StackboxApiModule.forRoot(() => new StackboxConfiguration(configuration))
    ),
  ];
}
