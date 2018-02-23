const afangar = [];

const mainDiv = document.getElementById('maingrid');

(function saekjaJson() {
    fetch("afangar.json")
        .then(res => res.json())
        .then(json => {
            json.map(j => afangar.push(new Afangi(j)));
            afangar.map(afangi => {
                const undanfarar = afangi.parents
                if (undanfarar.length) {
                    const undanfararAfanga = [];
                    for (const undanfari of undanfarar) {
                        undanfararAfanga.push(
                            afangar.find(a => a.id === undanfari)
                        );
                    }
                    afangi.parents = undanfararAfanga.slice(0);
                }
                synaDiv(afangi);
            });
            
            teiknaUndanfara();
        })
        .catch(e => console.log("villa:", e));
})();

function synaDiv(afangi) {
    const div = document.createElement('div');
    div.className = "afangar";
    div.className += afangi.tbr ? "" : " nontbr";
    div.className += afangi.core ? " core" : "";
    div.className += ` ${afangi.id.substring(0,4)}`;
    div.style.gridArea = afangi.id.split('0')[0];
    div.id = afangi.id;
    div.innerHTML = afangi.div;
    mainDiv.appendChild(div);
}

function teiknaUndanfara() {
    for (const afangi of afangar) {
        const curDiv = document.getElementById(afangi.id);
        const undanfaraLinur = [];
        if (afangi.parents) {
            for (const undanfari of afangi.parents) {
                const undanfaraLina = new LeaderLine(
                    document.getElementById(undanfari.id),
                    curDiv, {
                        hide: true
                    }
                );
                undanfaraLina.color = "rgba(45, 52, 54,1.0)";
                undanfaraLina.size = 4;
                undanfaraLina.endPlug = "disc";
                undanfaraLina.startPlug = "disc";
                if (afangi.id === 'VAL05') {
                    undanfaraLina.endPlug = "arrow1"
                    undanfaraLina.setOptions({
                        startSocket: 'top'
                    });
                }
                undanfaraLinur.push(undanfaraLina);
            }
        }

        curDiv.addEventListener("mouseover", e => {
            for (const afangi of afangar) {
                if (afangi.id === e.target.id) {
                    curDiv.title = afangi.description;
                    curDiv.dataTooltip = afangi.description;
                    for (l of undanfaraLinur) {
                        l.show("draw");
                    }
                }
            }
        });

        curDiv.addEventListener("mouseleave", e => {
            for (const afangi of afangar) {
                if (afangi.id === e.target.id) {
                    for (l of undanfaraLinur) {
                        l.hide();
                    }
                }
            }
        });
    }
}