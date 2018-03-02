const afangar = [];

const mainDiv = document.getElementById('maingrid');
//const allirUndanfarar = [];

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
            teiknaParUndanfara();
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

function teiknaParUndanfara() {
    const currentLines = Array.from(document.getElementsByClassName('leader-line'));
    currentLines.forEach(l => l.remove());
    afangar.forEach(afangi => {
        const curDiv = document.getElementById(afangi.id);
        const undanfaraLinur = [];
        const undanfaraAfangar = new Set();
        undanfaraAfangar.add(curDiv);
        teikna(afangi, curDiv, undanfaraLinur);
        function teikna(afangi, cDiv, ulinur) {
            afangi.parents.forEach(undanfari => {
                uDiv = document.getElementById(undanfari.id);
                undanfaraAfangar.add(uDiv);
                const undanfaraLina = new LeaderLine(
                    uDiv,
                    cDiv, {
                        hide: true,
                        color: "rgba(45, 52, 54,1.0)",
                        size: 4,
                        endPlug: "none",
                        startPlug: "behind",
                        dash: {animation: true}
                    }
                );

                if (afangi.id === 'VAL05') {
                    undanfaraLina.endPlug = "arrow1"
                    undanfaraLina.setOptions({
                        startSocket: 'top',
                        color: "green",
                        dash: false
                    });
                    ulinur.push(undanfaraLina);
                    return;
                }
                ulinur.push(undanfaraLina);
                teikna(undanfari, document.getElementById(undanfari.id), ulinur);             
            });
        }

        const allirAfangar = Array.from(mainDiv.children);

        curDiv.addEventListener("mouseover", e => {
            if(afangar.find(a => a.id === e.target.id)) {
                curDiv.title = afangi.description;
                // curDiv.dataTooltip = afangi.description;
                undanfaraLinur.forEach(l => l.show("draw"));
            }
            
            allirAfangar.forEach(a => undanfaraAfangar.has(a) ? a.style.opacity = 1 : a.style.opacity = 0.3);
        });

        curDiv.addEventListener("mouseleave", e => {
            if(afangar.find(a => a.id === e.target.id)) {
                undanfaraLinur.forEach(l => l.hide());
            }
            allirAfangar.forEach(a => a.style.opacity = 1.0)
        });
    });

}

const chkUndanfara = document.getElementById('chkUndanfara');
chkUndanfara.addEventListener("click", e => {
    if(e.target.id === 'chkUndanfara') {
        e.target.value = e.target.value === "Sýna meira..." ? e.target.value = "Sýna minna..." : e.target.value = "Sýna meira...";
        undanf = Array.from(document.querySelectorAll('.undanfarar,strong'));
        undanf.forEach(u => u.style.display === 'none' || u.style.display.length === 0 ? u.style.display = 'block' : u.style.display = 'none');

        teiknaParUndanfara();
    }
});

/* function teiknaUndanfara() {
    const currentLines = Array.from(document.getElementsByClassName('leader-line'));
    currentLines.forEach(l => l.remove());
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
    // undanfaraSet.forEach(u => u.print());
} */

