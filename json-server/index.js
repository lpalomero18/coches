marcas=['Opel','Mercedes','Audi','Volkswagen','Citroen','Renault','Fiat','Seat','Ford','Toyota','Hyundai'];
provincias=['Zaragoza','Huesca','Teruel','La Rioja','Barcelona','Tarragona','Lleida','Girona','Madrid','Valencia','Sevilla'];
modelos=[['Zafira','Corsa','Insignia'],
		['330SL','Clase A','D340','C550'],
		['TT','A3','A4','A6','Roadster'],
		['Passat','Touran','Tiguan','Tourer','Golf','Polo'],
		['C3','C4','C4 cactus','C4 Picasso','C5','DS4','DS5'],
		['Clio','Megane','elegance','Elysee'],
		['Bravo','Brava'],
		['Ateca','Marbella','Ibiza','Leon','Alhambra'],
		['Taurus','Focus','c-max','Escort','KA','Fiesta'],
		['Auris','Prius','Aygo','Yaros'],
		['i30','i40']];
combustibles=['Diesel','Gasolina','Hibrido'];
module.exports = function() {
  var data = { cochesTest: [] }
  // Create 1000 users 
  for (var i = 0; i < 100; i++) {
  	marca=Math.floor(Math.random()*marcas.length);
    data.cochesTest.push(
    	{marca: marcas[marca]
    	,modelo: modelos[marca][Math.floor(Math.random()*modelos[marca].length)]
    	,precio: Math.floor(Math.random()*25000)+1000
    	,ciudad: provincias[Math.floor(Math.random()*provincias.length)]
    	,combustible: combustibles[Math.floor(Math.random()*combustibles.length)]
    	,kilometros:  Math.floor(Math.random()*250000)+5000
    })
  }
  return data
}