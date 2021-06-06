
function myFunction() {
    var cedula = document.getElementById("txtCedula").value;
    var haciendaAPI = "https://api.hacienda.go.cr/fe/ae?identificacion=" + cedula;

    //API Hacienda
    var request = new XMLHttpRequest();
    request.open('GET', haciendaAPI);
    request.onload = function () {
        var jsonResponse = JSON.parse(request.responseText);
        console.log(jsonResponse);

        var nombre = jsonResponse.nombre;
        document.getElementById("Nombre").value = nombre;

        var moroso = jsonResponse.situacion.moroso;
        document.getElementById("Moroso").value = moroso;

        if (jsonResponse.actividades.length == 0) {
            document.getElementById("Descripcion").value = "SIN DESCRIPCION";
        }
        else {
            var x;
            var descripcion = jsonResponse.actividades[0].descripcion;
            for (x = 1; x < jsonResponse.actividades.length; x++) {
                descripcion = descripcion+", \n"+jsonResponse.actividades[x].descripcion;
            }
            document.getElementById("Descripcion").value = descripcion;
        }
    };
    request.send();
}