const afangar = [];

const mainDiv = document.getElementById('maingrid');

(function saekjaJson() {
    fetch("afangar.json")
        .then(res => res.json())
        .then(json => {
            json.filter(j => j.active)
                .forEach(afangi => afangar.push(new Afangi(afangi)));

            afangar.forEach(afangi => {
                afangi.parents = afangi.parents.map(p => afangar.find(a => a.id === p));
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
    afangar.forEach(afangi => {
        const curDiv = document.getElementById(afangi.id);
        const undanfaraLinur = afangi.parents.map(undanfari => {
            const undanfaraLina = new LeaderLine(
                document.getElementById(undanfari.id),
                curDiv, {
                    hide: true,
                    color: "rgba(45, 52, 54,1.0)",
                    size: 4,
                    endPlug: "disc",
                    startPlug: "disc"
                }
            );

            if (afangi.id === 'VAL05') {
                undanfaraLina.endPlug = "arrow1"
                undanfaraLina.setOptions({
                    startSocket: 'top'
                });
            }
            return undanfaraLina;
        })

        curDiv.addEventListener("mouseover", e => {
            if(afangar.find(a => a.id === e.target.id)) {
                curDiv.title = afangi.description;
                //curDiv.dataTooltip = afangi.description;
                undanfaraLinur.forEach(l => l.show("draw"));
            }
        });

        curDiv.addEventListener("mouseleave", e => {
            if(afangar.find(a => a.id === e.target.id)) {
                undanfaraLinur.forEach(l => l.hide());
            }
        });
    });
}