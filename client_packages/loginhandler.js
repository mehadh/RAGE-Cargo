mp.events.add("client:Weather", (weather) => {
    mp.game.gameplay.setWeatherTypeNowPersist(weather)
    mp.game.gameplay.setOverrideWeather(weather)
}) 
