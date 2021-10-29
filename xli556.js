const showHome = () => {
    document.getElementById("Home").style.display = "block";
    document.getElementById("Products").style.display = "none";
    document.getElementById("News").style.display = "none";
    document.getElementById("Location").style.display = "none";
    document.getElementById("GuestBook").style.display = "none";

    document.getElementById("logoHome").style.backgroundColor = "lightGrey";
    document.getElementById("logoProducts").style.backgroundColor = "transparent";
    document.getElementById("logoNews").style.backgroundColor = "transparent";
    document.getElementById("logoLocation").style.backgroundColor = "transparent";
    document.getElementById("logoGB").style.backgroundColor = "transparent";
}

const showProducts = () => {
    document.getElementById("Home").style.display = "none";
    document.getElementById("Products").style.display = "block";
    document.getElementById("News").style.display = "none";
    document.getElementById("Location").style.display = "none";
    document.getElementById("GuestBook").style.display = "none";

    document.getElementById("logoHome").style.backgroundColor = "transparent";
    document.getElementById("logoProducts").style.backgroundColor = "lightGrey";
    document.getElementById("logoNews").style.backgroundColor = "transparent";
    document.getElementById("logoLocation").style.backgroundColor = "transparent";
    document.getElementById("logoGB").style.backgroundColor = "transparent";
}

const showNews = () => {
    document.getElementById("Home").style.display = "none";
    document.getElementById("Products").style.display = "none";
    document.getElementById("News").style.display = "block";
    document.getElementById("Location").style.display = "none";
    document.getElementById("GuestBook").style.display = "none";

    document.getElementById("logoHome").style.backgroundColor = "transparent";
    document.getElementById("logoProducts").style.backgroundColor = "transparent";
    document.getElementById("logoNews").style.backgroundColor = "lightGrey";
    document.getElementById("logoLocation").style.backgroundColor = "transparent";
    document.getElementById("logoGB").style.backgroundColor = "transparent";
}

const showLocation = () => {
    document.getElementById("Home").style.display = "none";
    document.getElementById("Products").style.display = "none";
    document.getElementById("News").style.display = "none";
    document.getElementById("Location").style.display = "block";
    document.getElementById("GuestBook").style.display = "none";

    document.getElementById("logoHome").style.backgroundColor = "transparent";
    document.getElementById("logoProducts").style.backgroundColor = "transparent";
    document.getElementById("logoNews").style.backgroundColor = "transparent";
    document.getElementById("logoLocation").style.backgroundColor = "lightGrey";
    document.getElementById("logoGB").style.backgroundColor = "transparent";
}

const showGuestBook = () => {
    document.getElementById("Home").style.display = "none";
    document.getElementById("Products").style.display = "none";
    document.getElementById("News").style.display = "none";
    document.getElementById("Location").style.display = "none";
    document.getElementById("GuestBook").style.display = "block";

    document.getElementById("logoHome").style.backgroundColor = "transparent";
    document.getElementById("logoProducts").style.backgroundColor = "transparent";
    document.getElementById("logoNews").style.backgroundColor = "transparent";
    document.getElementById("logoLocation").style.backgroundColor = "transparent";
    document.getElementById("logoGB").style.backgroundColor = "lightGrey";
}

window.onload = showHome;


// News page information
const showNewsInfo = (news) => {
    let ourNews = document.getElementById("ourNews");
    let newscontent = "";
    
    const addRecord = (record) => {
        newscontent += "<img width=30% src=" + record.enclosureField.urlField + ">" + "<br>" + "<a href=" + record.linkField + ">" + record.titleField + "</a>" + "<br>" + record.pubDateField + "<br>" + record.descriptionField + "<hr><br>";
    }
    news.forEach(addRecord);
    ourNews.innerHTML = newscontent;
}

const getNewsInfo = () => {
    const fetchPromise = fetch('http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/news', {
        headers: {
            "Accept": "application/json",
        },
    });
    
    const streamPromise = fetchPromise.then((response) => response.json());
    streamPromise.then( (data) => showNewsInfo(data) );
}




// Location page information
const showLocationInfo = (info) => {
    let arr = info.split('\n');
    let arrNew = [];
    let dic = {};
    for (let i=0; i<arr.length; i++) {
        if (arr[i].includes("TEL:") || arr[i].includes("TEL;") || arr[i].includes("ADR:") || arr[i].includes("ADR;") || arr[i].includes("EMAIL:") || arr[i].includes("EMAIL;")) {
            arrNew += [arr[i]];
            let lastIndex = arr[i].lastIndexOf(":");
            let s1 = arr[i].substring(0, lastIndex);
            
            let s2 = arr[i].substring(lastIndex + 1);
    
            dic[s1] = s2;
        }
    }
    let locationContent = "";
    let arr1 = Object.keys(dic);

    let tel = "";
    let adr = "";
    let email = "";
    
    if (arr1[0].includes("TEL")) {
        tel = dic[arr1[0]];
    } else if (arr1[1].includes("TEL")) {
        tel = dic[arr1[1]];
    } else if (arr1[2].includes("TEL")) {
        tel = dic[arr1[2]];
    }
    
    if (arr1[0].includes("ADR")) {
        adr = dic[arr1[0]];
    } else if (arr1[1].includes("ADR")) {
        adr = dic[arr1[1]];
    } else if (arr1[2].includes("ADR")) {
        adr = dic[arr1[2]];
    }

    if (arr1[0].includes("EMAIL")) {
        email = dic[arr1[0]];
    } else if (arr1[1].includes("EMAIL")) {
        email = dic[arr1[1]];
    } else if (arr1[2].includes("EMAIL")) {
        email = dic[arr1[2]];
    }

    locationContent += "<a href=tel:" + tel + ">"+ tel + "</a>" + "<br>" + "<a href=mailto:" + email + ">"+ email + "</a><br>" + adr.replace(/;/g, "") + ""; 
    let ours = document.getElementById("shopLocation");
    ours.innerHTML = locationContent;
}

const getLocationInfo = () => {
    const fetchPromise = fetch('http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/vcard', {
        headers: {
            "Accept": "application/json",
        },
    });
    
    const streamPromise = fetchPromise.then((response) => response.text());
    streamPromise.then( (data) => showLocationInfo(data) );
}


// Products page information
const showProInfo = (pro) => {
    const Table = document.getElementById("ourTable");
    let tableContent = "";

    const addRecord = (record) => {
        tableContent += "" + "<img class='imgDiv' src = http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/itemimg?id=" + record.ItemId + "><div class='ProDiv'>" + record.Title + "<br>" + record.Price + "<br>" + record.Origin + "<br><br><button id='buttonDiv'>buy now</button>" + "</div>" + "<hr width=75%>";
    } 
    pro.forEach(addRecord);
    
    Table.innerHTML = tableContent;
}

const getProInfo = () => {
    const fetchPromise = fetch('http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/items', {
        headers: {
            "Accept": "application/json",
        },
    });
    
    const streamPromise = fetchPromise.then((response) => response.json());
    streamPromise.then( (data) => showProInfo(data) );
}

const searchProInfo = () => {
    let searchInfoString = "";
    searchInfoString += document.getElementById("searchbar").value;

    const fetchPromise = fetch('http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/search?term=' + searchInfoString + '', {
        headers: {
            "Accept": "application/json",
        },
    });
    
    const streamPromise = fetchPromise.then((response) => response.json());
    streamPromise.then( (data) => showProInfo(data) );
}


// Guest Book page information - Post Comment

const postCommentInfo = (e) => {
    e.preventDefault;

    let comment = document.getElementById("comment").value;

    let namePart = document.getElementById("name").value;

    const fetchPromise = fetch('http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/comment?name=' + namePart + '', {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify(comment),
    });
    
    const streamPromise = fetchPromise.then((response) => response.json());
    streamPromise.then( (data) => document.getElementById('iframeComment').src += '');

}

//window.onload = getCommentInfo;