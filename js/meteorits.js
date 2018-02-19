function getData(url, callbackFunc) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callbackFunc(this);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function successAjax(xhttp) {
    // itt a json content, benne a data változóban
    var data = xhttp.responseText;
    // Innen, ide dolgozz... Itt hívd meg a függvényeid stb. A json file tartalma innen érhető csak
    // Live servert használd mindig
    data = JSON.parse(data);


    massFixed(data);
    //createHeader(data);
    createBody(data);
    massSumCalc(data);
    massMinCalc(data);
    massMaxCalc(data);
    //meteorCount(data);
    massTest(data);

}



getData('/js/meteorits.json', successAjax);

/* 
    A kapott JSON file a Föld-be csapódott meteoritok adatait tartalmazza.

    FELADATOK:
    1. Írasd ki egy táblázatba a következő adatait a meteoritoknak:
        id
        mass
        name
        nametype
        recclass
        reclat
        reclong
        year

     Pozitív, ha ezeket az elemeket nem az innerHTML segítségével hozod létre. 

    2. A táblázatban formázd a tömeget 2 tizedes jegy pontosan. Ha kell kerekíts a legközelebbi egészre.
       A matamatikai kerekítés szabályait használd. Ha valahol egész érték van, ott is legyen a 00 kiiratva
       az egész érték után .
       Formázd a dátumot az alábbi formátumba: 1990. 01. 02. 
    
    3. A táblázat fejlécére kattintva növekvő sorrendbe lehessen rendezni a táblázat adatait az alábbi
       meteorit tulajdonságok szerint: id, mass, name, és reclass.
       Az id és a mass szerinti rendezés számok alapján rendezzen.

    4.  Valósítsd meg a rendezést úgy, hogy nem csak növekvő, hanem csökkenő sorrendbe is lehessen az adatokat rendezni.
        Ha az adatok még nincsenek rendezve, akkor az adott fejlév/tulajdonság alapján növekvő sorrendbe rendezze az adatokat kattintásra.
        Amennyiben még egyszer ugyanarra a fejlécre kattintanak, akkor a sorrend legyen csökkenő. És így tovább....
        Amennyiben egy új fejlécre kattintanak, először mindig növekvő sorrend szerint legyenek az  adatok rendezve.

    5. A táblázat alá az alábbi adatokat ki kell iratni/számolni:

        Az összes meteorit összsúlya
        A legkönyebb meteorit súlya
        A legnehezebb meteorit súlya
        A meteoritok súlyának átlaga
        Hány darab meteorit csapódott be 1990-ben
        Hány darab meteorit súlya legalább 10000

        Ezeket az elemeket ne az innerHTML segítségével hozd létre. Használd az ismert node metódusokat. KÖTELEZŐEN!

    6. Legyen szép a táblázat és az adatok. HAsználj CSS-t a formázáshoz.

    7. Töltsd fel az elkészült fileokat egy github repoba, és küld el a repo elérhetőségét.

    8. Szusszanj egyet.

*/
// ---------------- HEADER BEILLESZTÉS ---------------
function createHeader(data) {
    var head = '';
    // for (var k in Object.keys(data[0])) {
    for (i = 2; i < Object.keys(data[0]).length; i++) {
        head += `<th>${Object.keys(data[0])[i]}</th>`;

    }
    document.getElementById('thead1').innerHTML = head;

}



// --------------- BODY BEILLESZTÉS ----------------
function createBody(data) {
    var tableBody = '';
    for (var i = 0; i < data.length; i++) {
        tableBody +=
            `<tr>
        <td> ${data[i].id} </td>
        <td> ${data[i].mass} </td>
        <td> ${data[i].name} </td>
        <td> ${data[i].nametype} </td>
        <td> ${data[i].recclass} </td>
        <td> ${data[i].reclat} </td>
        <td> ${data[i].reclong} </td>
        <td> ${data[i].year} </td>
    </tr>`;
    }
    tableBody += '</tbody>';
    document.getElementById('tbody1').innerHTML = tableBody;
}
// --------------- 2 TIZEDESJELRE ALAKÍTÁS -----------------
function massFixed(data) {
    var num = 0;
    for (var i = 0; i < data.length; i++) {
        data[i].mass = parseFloat(data[i].mass).toFixed(2);
    }
}

function sortByHeaderClick(column) {
    var temp;
    var first;
    var second;

    for (var i = 0; i < data.length - 1; i++) {
        for (var j = i + 1; j < data.length; j++) {

            first = data[i][column];
            second = data[j][column];
            if (column == "mass") {
                first = parseInt(first);
                second = parseInt(second)

            }
            if (first > second) {
                temp = data[i];
                data[i] = data[j];
                data[j] = temp;
            }
        }
    }
    createBody(data);
}

function massSumCalc(data) {
    var massSum = 0;
    var massAvg = 0;
    for (var k in data) {
        if (!Number.isNaN(parseFloat(data[k].mass))) {
            massSum += parseFloat(data[k].mass);

        }
    }
    document.getElementById('sumMass').innerHTML = "Összsúly: " + massSum;
    massAvg = massSum / data.length;
    document.getElementById('avgMass').innerHTML = "Átlagsúly: " + massAvg;
}

function massMinCalc(data) {
    var min = Infinity;
    for (var k in data) {
        if (!Number.isNaN(parseFloat(data[k].mass))) {
            if (parseFloat(data[k].mass) < min) {
                min = parseFloat(data[k].mass);
            }
        }
    }
    document.getElementById('minMass').innerHTML = "Min súly: " + min;
}

function massMaxCalc(data) {
    var max = -Infinity;
    for (var k in data) {
        if (!Number.isNaN(parseFloat(data[k].mass))) {
            if (parseFloat(data[k].mass) > max) {
                max = parseFloat(data[k].mass);
            }
        }
    }
    document.getElementById('maxMass').innerHTML = "Max súly: " + max;
}

function meteorCount(data) {
    var count = 0;
    for (var k in data) {
        if ((data[k].year).getFullYear() == 1990) {
            count++;
        }
    }
    document.getElementById('metCount90').innerHTML = "Max súly: " + count;

}

function massTest(data) {
    var count = 0;
    for (var k in data) {
        if ((parseFloat(data[k].mass)) >= 10000) {
            count++;
        }
    }
    document.getElementById('mettest').innerHTML = "10000 fölötti: " + count;
}