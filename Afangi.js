class Afangi {

    constructor(jsonData) {
        this.id = jsonData.id;
        this.name = jsonData.name;
        this.link = jsonData.link;
        this.comment = jsonData.comment;
        this.parents = jsonData.parents;
        this.description = jsonData.description;
        this.core = jsonData.core;
        this.active = jsonData.active;
        this.tbr = jsonData.tbr;
    }

    get div() {
        const comment = this.comment ? `<strong>${this.comment}</strong>` : "";
        let undanfarar = `<div class='undnafarar'><strong>Undanfarar:</strong> </div>`;

        if (this.parents.length > 0) {

            if (this.parents.length === 1) {
                undanfarar = `<div class='undnafarar'><strong>Undanfari:</strong> </div>`;
            }
            if (this.id === "VAL05") {
                undanfarar = ""; 
            }
            this.parents.map(p => undanfarar += `<div class="undanfarar ${p.id.split('0')[0].substring(0,4)}"><b>${p.name}</b><br><a target="_blank" href="${p.link}">${p.id}</a></div>`);
            undanfarar += `</div></div>`;
        } else {
            undanfarar = "";
        }

        let div = `<h4>${this.name} <a target="_blank" href="${this.link}">${this.id}</a></h4>${undanfarar}<br>${comment}`;
        if (this.id === "VAL05") {
            div = `<h4>${this.name}</h4>${undanfarar}`;
        }

        return div;
    }

}