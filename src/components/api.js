class Api {                                //класс API для работы с сервером
    constructor(contentType) {                              
      this._contentType = contentType;                      //контент тайп
    }
  
    _checkStatus(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  
    getInfo(lat, lng, epoha, year) {                                                        //метод для получения карточек
    return fetch(`https://www.geomagnet.ru/calc/?lat=${lat}&lng=${lng}&data=${year}.${epoha}&alt=0&h=4`, {
      method: 'GET',
      headers: {
        'Content-Type': this._contentType
      }
    })
    .then((res) =>{
      return this._checkStatus(res);
    });
    }
  }
  

  export const api = new Api('application/json');