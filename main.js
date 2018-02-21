let afangar = [];

let mainDiv = document.getElementById('maingrid');

function saekjaJson() {
    fetch("afangar.json")
        .then(res => res.json())
        .then(json => {
            for (let j of json) {
                afangar.push(new Afangi(j));
            }

            for (let afangi of afangar) {
                parents = afangi.parents
                if (parents.length > 0) {
                    newParents = [];
                    for (let p of parents) {
                        for (let afs of afangar) {
                            if (p === afs.id) {
                                newParents.push(Object.assign({}, afs));
                            }
                        }
                    }
                    afangi.parents = newParents.slice(0);
                }
            }
            synaGognDiv();
        }).catch(e => console.log("villa", e));
}
saekjaJson();

function synaGognDiv() {
    for (a of afangar) {
        const div = document.createElement('div');
        div.className = "afangar";
        div.className += a.tbr ? "" : " nontbr";
        div.className += a.core ? " core" : "";
        div.className += ` ${a.id.substring(0,4)}`;
        div.style.gridArea = a.id.split('0')[0];
        div.id = a.id;
        div.innerHTML = a.div;
        mainDiv.appendChild(div);
    }
    teiknaUndanfara();
}

function teiknaUndanfara() {
    for (a of afangar) {
        let curDiv = document.getElementById(a.id);
        let lines = [];
        if (a.parents) {
            for (u of a.parents) {
                let line = new LeaderLine(
                    document.getElementById(u.id),
                    curDiv, {
                        hide: true
                    }
                );
                line.color = "rgba(45, 52, 54,1.0)";
                line.size = 4;
                line.endPlug = "disc";
                line.startPlug = "disc";
                if (a.id === 'VAL05') {
                    line.endPlug = "arrow1"
                    line.setOptions({
                        startSocket: 'top'
                    });
                }

                lines.push(line);
            }
        }

        curDiv.addEventListener("mouseover", e => {
            for (b of afangar) {
                if (b.id === e.target.id) {
                    curDiv.title = b.description;
                    curDiv.dataTooltip = b.description;
                    for (l of lines) {
                        l.show("draw");
                    }
                }
            }
        });

        curDiv.addEventListener("mouseleave", e => {
            for (b of afangar) {
                if (b.id === e.target.id) {
                    for (l of lines) {
                        l.hide();
                    }
                }
            }
        });
    }
}