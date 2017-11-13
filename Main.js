/**
 * Created by Igor on 07.11.2017.
 */
var filepath = "atms.json";
var currentPage = 1;
var len;
var data;

function readJSON(filepath) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", filepath, false);
    rawFile.send(null);
    return rawFile.responseText;
}

function ParseJSON() {
    var JSONString = readJSON(filepath);
    var JSONStringCut = JSONString.substring(JSONString.indexOf('['));
    var data = JSON.parse(JSONStringCut);
    return data;
}

function extractData(ind) {
    var newEl = document.createElement('div');
    newEl.className='ATMInfoDiv';

    var indnumb = document.createElement('div');
    indnumb.className='ind';
    indnumb.appendChild(document.createTextNode(ind+1));

    var address = document.createElement('span');
    address.className='address';
    address.appendChild(document.createTextNode("address:"));

    var street = document.createElement('span');
    street.className='street';
    street.appendChild(document.createTextNode("street:"));

    var atmstreet = document.createElement('span');
    atmstreet.className='atmstreet';
    atmstreet.appendChild(document.createTextNode(data[ind].address.street));

    var housenumber = document.createElement('span');
    housenumber.className='housenumber';
    housenumber.appendChild(document.createTextNode("housenumber:"));

    var atmhousenumber = document.createElement('span');
    atmhousenumber.className='atmhousenumber';
    atmhousenumber.appendChild(document.createTextNode(data[ind].address.housenumber));

    var postalcode = document.createElement('span');
    postalcode.className='postalcode';
    postalcode.appendChild(document.createTextNode("postalcode:"));

    var atmpostalcode = document.createElement('span');
    atmpostalcode.className='atmpostalcode';
    atmpostalcode.appendChild(document.createTextNode(data[ind].address.postalcode));

    var city = document.createElement('span');
    city.className='city';
    city.appendChild(document.createTextNode("city:"));

    var atmcity = document.createElement('span');
    atmcity.className='atmcity';
    atmcity.appendChild(document.createTextNode(data[ind].address.city));

    var geolocation = document.createElement('div');
    geolocation.className='geolocation';
    geolocation.appendChild(document.createTextNode("geolocation:"));

    var lat = document.createElement('span');
    lat.className='lat';
    lat.appendChild(document.createTextNode("lat:"));

    var atmlat = document.createElement('span');
    atmlat.className='atmlat';
    atmlat.appendChild(document.createTextNode(data[ind].address.geoLocation.lat));

    var lng = document.createElement('span');
    lng.className='lng';
    lng.appendChild(document.createTextNode("lng:"));

    var atmlng = document.createElement('span');
    atmlng.className='atmlng';
    atmlng.appendChild(document.createTextNode(data[ind].address.geoLocation.lng));

    var distance = document.createElement('div');
    distance.className='distance';
    distance.appendChild(document.createTextNode("distance:"));

    var atmdistance = document.createElement('span');
    atmdistance.className='atmdistance';
    atmdistance.appendChild(document.createTextNode(data[ind].distance));

    var type = document.createElement('div');
    type.className='type';
    type.appendChild(document.createTextNode("type:"));

    var atmtype = document.createElement('span');
    atmtype.className='atmtype';
    atmtype.appendChild(document.createTextNode(data[ind].type));

    newEl.appendChild(indnumb);
    newEl.appendChild(address);
    newEl.appendChild(street);
    newEl.appendChild(atmstreet);
    newEl.appendChild(housenumber);
    newEl.appendChild(atmhousenumber);
    newEl.appendChild(postalcode);
    newEl.appendChild(atmpostalcode);
    newEl.appendChild(city);
    newEl.appendChild(atmcity);
    newEl.appendChild(geolocation);
    newEl.appendChild(lat);
    newEl.appendChild(atmlat);
    newEl.appendChild(lng);
    newEl.appendChild(atmlng);
    newEl.appendChild(distance);
    newEl.appendChild(atmdistance);
    newEl.appendChild(type);
    newEl.appendChild(atmtype);


    var elem = document.getElementById("main");
    elem.appendChild(newEl);
}

function createNavs(len) {
    var elem = document.getElementById("NavDiv");
    elem.innerHTML="";
    if(len<=70) {
        for(var i=0; i < len/10; i++)
        {
            createNavButton(i);
        }
    }
    else {
        if(currentPage>2)
            createNavButtonFirst(elem);
        if(currentPage>10)
            createNavButtonLeft(elem);
        if(currentPage>3)
            createNavDots(elem);
        if(currentPage>2)
            createNavButton(currentPage-1,elem);

        createNavButton(currentPage, elem);

        if(currentPage<=len/10)
            createNavButton(currentPage+1, elem);
        if(currentPage<=len/10-3)
            createNavDots(elem);
        if(currentPage<=len/10-10)
            createNavButtonRight(elem);
        if(currentPage<=len/10-2)
            createNavButtonLast(elem);
    }
}

function createNavButton(ind, elem) {
    var newBtn = document.createElement("button");
    newBtn.className="navbtn";
    newBtn.innerText=ind;
    var str="showpage("+ind+")";
    newBtn.setAttribute("onclick", str);
    elem.appendChild(newBtn);
}

function createNavButtonFirst(elem) {
    var newBtn = document.createElement("button");
    newBtn.className="navbtn";
    newBtn.innerText="<<";
    newBtn.setAttribute("onclick", "showpage(1)");
    elem.appendChild(newBtn);
}

function createNavButtonLast(elem) {
    var newBtn = document.createElement("button");
    newBtn.className="navbtn";
    newBtn.innerText=">>";
    var str="showpage("+((len-len%10)/10+1)+")";
    newBtn.setAttribute("onclick", str);
    elem.appendChild(newBtn);
}

function createNavButtonLeft(elem) {
    var newBtn = document.createElement("button");
    newBtn.className="navbtn";
    newBtn.innerText="<";
    var str="showpage("+(currentPage-10)+")";
    newBtn.setAttribute("onclick", str);
    elem.appendChild(newBtn);
}

function createNavButtonRight(elem) {
    var newBtn = document.createElement("button");
    newBtn.className="navbtn";
    newBtn.innerText=">";
    var str="showpage("+(currentPage+10)+")";
    newBtn.setAttribute("onclick", str);
    elem.appendChild(newBtn);
}

function createNavDots(elem) {
    var newBtn = document.createElement("button");
    newBtn.className="navbtndots";
    newBtn.setAttribute("disabled", "true");
    newBtn.innerText="...";
    elem.appendChild(newBtn);
}

function main() {
    data = ParseJSON();
    if(data.length>0) {
        len=data.length;
        showpage(1, data);
    }
    else alert("Error! Empty LSON!");
}

function showpage(ind) {
    currentPage=ind;
    console.log(ind);
    var elem = document.getElementById("main");
    elem.innerHTML="";
    for(var i=10*(ind-1); i<((10*ind<len)?(10*ind):len); i++) {
        extractData(i);
    }
    createNavs(len);
}