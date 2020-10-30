import { WeatherStationModule } from './weather-station.module';

describe('WeatherStationModule', () => {
  let weatherStationModule: WeatherStationModule;

  beforeEach(() => {
    weatherStationModule = new WeatherStationModule();
  });

  it('should create an instance', () => {
    expect(WeatherStationModule).toBeTruthy();
  });
});
