export interface WeatherAPIResult {
    name: string; 
    weather: [{
      main: string;
      description: string; 
      icon: string; 
    }],
    main: {
      temp: number; 
      temp_max: number; 
      temp_min: number; 
      humidity: number; 
    };
    wind: {
      speed: number; 
    };
    dt: number; 
    timezone: number; 
    sys:{
      country:string
    };
    cod: string
  }