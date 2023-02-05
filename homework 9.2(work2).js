// JSON Данные
const jsonString = `
{
	"list": [
	 {
	  "name": "Petr",
	  "age": "20",
	  "prof": "mechanic"
	 },
	 {
	  "name": "Vladimir",
	  "age": "60",
	  "prof": "pilot"
	 }
	]
   }
   `;
    function JsonTransformation(strJson) {

	//Получение данных
	let data = JSON.parse(strJson);
	
    let list = data.list;
	
	let result = {list: []};
	let objList = new Object();
	    
	list.forEach(function(elem) {
		objList = elem;
		result.list.push(objList);
});
	console.log(result);
}
JsonTransformation(jsonString);