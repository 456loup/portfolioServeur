

// On commence par initialiser les variable essentielles 

const canvas = document.querySelector('.canva');
const contexte = canvas.getContext('2d'); 
const resolution = 20; 
canvas.width = 1800;
canvas.height = 1800; 
const COLS = Math.floor(canvas.width / resolution); 
const ROWS =  Math.floor(canvas.height / resolution) ; 
const tempsAttente = 1; 
const menuChoix = document.getElementById("menu"); 

let compteurIteration = 0; 
let etiquetteIteration = document.getElementById("iteration");


/* Tout les boutons evenements  */
let boutonArret = document.getElementById("ARRET"); 
let boutonContinuer = document.getElementById("CONTINUER"); 
let boutonReDemarrer = document.getElementById("REDEMARRER"); 
let boutonPasApas = document.getElementById("PASAPAS"); 

/* bouton d animation   */

let boutonGlisseur = document.getElementById("GLISSEUR"); 
let boutonClignotant = document.getElementById("CLIGNOTANT"); 
let boutonPentamine = document.getElementById("PENTAMINE"); 
let boutonExpansion = document.getElementById("EXPANSION"); 
let boutonGospel = document.getElementById("LANCEURGOSPEL");
let boutonSeeds = document.getElementById("SEEDS");  
let boutonSpaceFiller = document.getElementById("SPACEFILLER"); 
let boutonChemin = document.getElementById("CHEMIN"); 
let boutonInconnu = document.getElementById("INCONNU" , inconnu); 
let boutonConstructeur = document.getElementById("CONSTRUCTEUR" , constructeur); 



let grilleSauvegarde = new Array(ROWS).fill(null).map( () => new Array(COLS).fill(0) ); 
let grid = buildGridAleatoire(ROWS, COLS); 
let pasAPasse = false; 

let arretVerite = false; 

/* Ajout des évènements correspondants  */

boutonArret.addEventListener('click' , Arret); 
boutonContinuer.addEventListener('click' , continuer); 
boutonReDemarrer.addEventListener('click' , reDemarrer); 
boutonPasApas.addEventListener('click' , pasAPas ); 
boutonSeeds.addEventListener('click' , seedFonc); 


/* Initialiser les figures  */

boutonGlisseur.addEventListener('click' , glisseur); 
boutonClignotant.addEventListener('click' , clignotant); 
boutonPentamine.addEventListener('click' , pentamineFonc);
boutonExpansion.addEventListener('click' , expansion);  
boutonGospel.addEventListener('click' , lanceurGospelFonc ); 
boutonSpaceFiller.addEventListener('click' , spaceFiller);
boutonChemin.addEventListener('click' , chemin );  
boutonInconnu.addEventListener('click' , inconnu)
boutonConstructeur.addEventListener('click' , constructeur); 
/* gestion des evenements  */



function Arret(){

    if(!grilleEstVide()){
        console.log(" ARRET "); 
        PasAPasse = false; 
        grilleSauvegarde = grid; 
        grid = viderGrille();
        etiquetteIteration.innerHTML = "<h1> etiquette iteration " + compteurIteration + " </h1>"; 
    } 
};
function continuer(){

    if(!grilleSauvegardeEstVide() ){
        PasAPasse = false; 
        grid = grilleSauvegarde; 
        requestAnimationFrame(update); 
    } 
};

function reDemarrer(){
    compteurIteration = 0; 
    PasAPasse = false; 
    grid = buildGridAleatoire(ROWS , COLS); 
    requestAnimationFrame(update); 
}; 


function pasAPas(){

        Arret(); 
        grid = grilleSauvegarde; 
        console.log(" FONCTION PAS A PAS ");
        pasAPasse = !pasAPasse; 
        if(pasAPasse){
            grid = nouvelleGeneration(grid); 
            render(grid , contexte); 
            requestAnimationFrame(pasAPas); 
        }else{
            return ; 
        }
}; 

/* Mise en place des configurations de base  */


function constructeur(){

    x = 30; 
    y = 30; 
    compteurIteration = 0;
    PasAPasse = false; 
    grid = viderGrille(); 

    grid[x][y] = 1; 

    /* col 1 */

    grid[x+1][y] = 1;
    grid[x+1][y+2] = 1;


    grid[x+2][y] = 1;
    grid[x+2][y+1] = 1;

    grid[x+6][y-4] = 1;
    grid[x+6][y-3] = 1;
    grid[x+6][y-2] = 1;

    grid[x+7][y-2] = 1;
    grid[x+7][y+2] = 1;
    grid[x+7][y+4] = 1;

    grid[x+8][y-3] = 1;
    grid[x+8][y+2] = 1;
    grid[x+8][y+3] = 1;

    grid[x+9][y+3] = 1;

    requestAnimationFrame(update);  


}

function inconnu(){
    
    x = 30; 
    y = 30; 
    compteurIteration = 0;
    PasAPasse = false; 
    grid = viderGrille(); 

    grid[x][y] = 1; 
    grid[x+2][y] = 1;
    grid[x+2][y+1] = 1;
    grid[x+4][y+2] = 1;
    grid[x+4][y+3] = 1;
    grid[x+4][y+4] = 1;
    grid[x+6][y+3] = 1;
    grid[x+6][y+4] = 1;
    grid[x+6][y+5] = 1;
    grid[x+7][y+4] = 1;

    requestAnimationFrame(update); 

}


function glisseur(){
    compteurIteration = 0;
    PasAPasse = false; 
    grid = viderGrille();  
    grid[20][20] = 1; 
    grid[20][21] = 1; 
    grid[20][22] = 1; 
    grid[21][22] = 1; 
    grid[22][21] = 1; 

    requestAnimationFrame(update); 
}

function chemin(){

    compteurIteration = 0; 
    PasAPasse = false; 
    grid = viderGrille(); 

    x = 4; 
    y = 35; 

    /* colonne 1  */
    grid[x][y] = 1; 
    grid[x][y+4] = 1;
    grid[x][y+5] = 1;
    grid[x][y+17] = 1;
    grid[x][y+18] = 1;
    grid[x][y+22] = 1;

    /* colonne 2  */

    grid[x+1][y+1] = 1;
    grid[x+1][y+4] = 1; 
    grid[x+1][y+5] = 1;
    grid[x+1][y+17] = 1;
    grid[x+1][y+18] = 1;
    grid[x+1][y+21] = 1;
    
    /* colonne 3  */

    grid[x+2][y+1] = 1;
    grid[x+2][y+4] = 1;
    grid[x+2][y+18] = 1; 
    grid[x+2][y+21] = 1;
    
    /* colonne 4  */

    grid[x+3][y+1] = 1; 
    grid[x+3][y+21] = 1;
    
    /* colonne 5  */

    grid[x+4][y+1] = 1; 
    grid[x+4][y+6] = 1; 
    grid[x+4][y+7] = 1; 
    grid[x+4][y+9] = 1;
    grid[x+4][y+13] = 1; 
    grid[x+4][y+15] = 1;
    grid[x+4][y+15] = 1;
    grid[x+4][y+16] = 1;
    grid[x+4][y+21] = 1; 
    
    /* colonne 6  */

    grid[x+5][y-2] = 1; 
    grid[x+5][y+1] = 1;
    grid[x+5][y+7] = 1;
    grid[x+5][y+8] = 1;
    grid[x+5][y+9] = 1;
    grid[x+5][y+13] = 1;
    grid[x+5][y+14] = 1;
    grid[x+5][y+15] = 1;
    grid[x+5][y+21] = 1;
    grid[x+5][y+24] = 1;
    
    /* colonne 7  */

    grid[x+6][y-1] = 1;
    grid[x+6][y] = 1;
    grid[x+6][y+1] = 1;
    grid[x+6][y+8] = 1;
    grid[x+6][y+14] = 1;
    grid[x+6][y+21] = 1;
    grid[x+6][y+22] = 1;
    grid[x+6][y+23] = 1;

    requestAnimationFrame(update); 
}

function clignotant(){

    PasAPasse = false; 
    grid = viderGrille(); 
    compteurIteration = 0;

    grid[20][20] = 1; 
    grid[20][21] = 1; 
    grid[20][22] = 1;
    grid[21][21] = 1; 
    grid[21][22] = 1; 
    grid[21][23] = 1; 

    requestAnimationFrame(update); 
}



function spaceFiller(){

    PasAPasse = false; 
    grid = viderGrille(); 
    compteurIteration = 0;

    let centreSpaceX = 50; 
    let centreSpaceY = 50; 

    /* centre de la map (debut queueu serpent ) */
    grid[centreSpaceX][centreSpaceY] = 1; 

    /* On balaye chaque colonne de gauche a droite */

    grid[centreSpaceX-12][centreSpaceY-11] = 1;
    grid[centreSpaceX-12][centreSpaceY-10] = 1;
    grid[centreSpaceX-12][centreSpaceY-9] = 1;
    grid[centreSpaceX-12][centreSpaceY-5] = 1;
    grid[centreSpaceX-12][centreSpaceY-4] = 1;
    grid[centreSpaceX-12][centreSpaceY-3] = 1;

    /* deuxieme colonne  */

    grid[centreSpaceX-11][centreSpaceY-11] = 1;
    grid[centreSpaceX-11][centreSpaceY-8] = 1;
    grid[centreSpaceX-11][centreSpaceY-6] = 1;
    grid[centreSpaceX-11][centreSpaceY-3] = 1;
    grid[centreSpaceX-11][centreSpaceY] = 1;

    /* TROISIEME COLONNE  */

    grid[centreSpaceX-10][centreSpaceY-11] = 1;
    grid[centreSpaceX-10][centreSpaceY-3] = 1;
    grid[centreSpaceX-10][centreSpaceY] = 1;
    grid[centreSpaceX-10][centreSpaceY+1] = 1;
    grid[centreSpaceX-10][centreSpaceY+2] = 1;
    grid[centreSpaceX-10][centreSpaceY+3] = 1;
    
    /* Quatrieme colonne  */

    grid[centreSpaceX-9][centreSpaceY-11] = 1;
    grid[centreSpaceX-9][centreSpaceY-3] = 1;
    grid[centreSpaceX-9][centreSpaceY+1] = 1;
    grid[centreSpaceX-9][centreSpaceY+2] = 1;
    grid[centreSpaceX-9][centreSpaceY+3] = 1;
    grid[centreSpaceX-9][centreSpaceY+1] = 1;

    /* CINQUIEME COLONNE */

    grid[centreSpaceX-8][centreSpaceY-10] = 1;
    grid[centreSpaceX-8][centreSpaceY-8] = 1;
    grid[centreSpaceX-8][centreSpaceY-6] = 1;
    grid[centreSpaceX-8][centreSpaceY-4] = 1;
    grid[centreSpaceX-8][centreSpaceY+1] = 1;
    grid[centreSpaceX-8][centreSpaceY+5] = 1;

    /* 6 EME COLONNE */

    grid[centreSpaceX-7][centreSpaceY-10] = 1;
    grid[centreSpaceX-7][centreSpaceY-8] = 1;
    grid[centreSpaceX-7][centreSpaceY-6] = 1;
    grid[centreSpaceX-7][centreSpaceY-4] = 1;
    grid[centreSpaceX-7][centreSpaceY+3] = 1;
    grid[centreSpaceX-7][centreSpaceY+4] = 1;
    grid[centreSpaceX-7][centreSpaceY+5] = 1;

    /* 7 EME COLONNE  */

    grid[centreSpaceX-6][centreSpaceY-9] = 1;
    grid[centreSpaceX-6][centreSpaceY-5] = 1;
    grid[centreSpaceX-6][centreSpaceY+1] = 1;
    grid[centreSpaceX-6][centreSpaceY+6] = 1;

    /* 8 EME COLONNE  */

    grid[centreSpaceX-5][centreSpaceY-10] = 1;
    grid[centreSpaceX-5][centreSpaceY-9] = 1;
    grid[centreSpaceX-5][centreSpaceY-8] = 1;
    grid[centreSpaceX-5][centreSpaceY-7] = 1;
    grid[centreSpaceX-5][centreSpaceY-6] = 1;
    grid[centreSpaceX-5][centreSpaceY-5] = 1;
    grid[centreSpaceX-5][centreSpaceY-4] = 1;

    grid[centreSpaceX-5][centreSpaceY+2] = 1;
    grid[centreSpaceX-5][centreSpaceY+3] = 1;
    grid[centreSpaceX-5][centreSpaceY+4] = 1;
    grid[centreSpaceX-5][centreSpaceY+5] = 1;
    grid[centreSpaceX-5][centreSpaceY+6] = 1;
    grid[centreSpaceX-5][centreSpaceY+7] = 1;


    /* 9  EME COLONNE  */
 
    grid[centreSpaceX-4][centreSpaceY+7] = 1;
    grid[centreSpaceX-4][centreSpaceY+8] = 1;

    /* 10 EME COLONNE  */

    grid[centreSpaceX-3][centreSpaceY-11] = 1;
    grid[centreSpaceX-3][centreSpaceY-10] = 1;
    grid[centreSpaceX-3][centreSpaceY-7] = 1;
    grid[centreSpaceX-3][centreSpaceY-4] = 1;
    grid[centreSpaceX-3][centreSpaceY-3] = 1;
    grid[centreSpaceX-3][centreSpaceY-7] = 1;
    grid[centreSpaceX-3][centreSpaceY+2] = 1;
    grid[centreSpaceX-3][centreSpaceY+3] = 1;
    grid[centreSpaceX-3][centreSpaceY+7] = 1;

    /* 10 EME COLONNE */ 

    grid[centreSpaceX-2][centreSpaceY-14] = 1;
    grid[centreSpaceX-2][centreSpaceY-13] = 1;
    grid[centreSpaceX-2][centreSpaceY-10] = 1;
    grid[centreSpaceX-2][centreSpaceY-8] = 1;
    grid[centreSpaceX-2][centreSpaceY-6] = 1;
    grid[centreSpaceX-2][centreSpaceY-4] = 1;
    grid[centreSpaceX-2][centreSpaceY-2] = 1;
    grid[centreSpaceX-2][centreSpaceY+1] = 1;
    grid[centreSpaceX-2][centreSpaceY+4] = 1;
    grid[centreSpaceX-2][centreSpaceY+5] = 1;


    /* 11 EME COLONNE  */

    grid[centreSpaceX-1][centreSpaceY-15] = 1;
    grid[centreSpaceX-1][centreSpaceY-11] = 1;
    grid[centreSpaceX-1][centreSpaceY-10] = 1;
    grid[centreSpaceX-1][centreSpaceY-7] = 1;
    grid[centreSpaceX-1][centreSpaceY-5] = 1;
    grid[centreSpaceX-1][centreSpaceY-3] = 1;
    grid[centreSpaceX-1][centreSpaceY-2] = 1;
    grid[centreSpaceX-1][centreSpaceY-3] = 1;
    grid[centreSpaceX-1][centreSpaceY+3] = 1;
    grid[centreSpaceX-1][centreSpaceY+5] = 1;


    /* 12 EME COLONNE  */

    grid[centreSpaceX][centreSpaceY-16] = 1;
    grid[centreSpaceX][centreSpaceY-12] = 1;
    grid[centreSpaceX][centreSpaceY] = 1;
    grid[centreSpaceX][centreSpaceY+4] = 1;
    grid[centreSpaceX][centreSpaceY+5] = 1;
    grid[centreSpaceX][centreSpaceY+6] = 1;

    /* 13 EME COLONNE  */

    grid[centreSpaceX+1][centreSpaceY-16] = 1;
    grid[centreSpaceX+1][centreSpaceY-10] = 1;
    grid[centreSpaceX+1][centreSpaceY-9] = 1;
    grid[centreSpaceX+1][centreSpaceY-8] = 1;
    grid[centreSpaceX+1][centreSpaceY-7] = 1;
    grid[centreSpaceX+1][centreSpaceY-6] = 1;
    grid[centreSpaceX+1][centreSpaceY-5] = 1;
    grid[centreSpaceX+1][centreSpaceY-4] = 1;
    grid[centreSpaceX+1][centreSpaceY-3] = 1;
    grid[centreSpaceX+1][centreSpaceY-2] = 1;
    grid[centreSpaceX+1][centreSpaceY-1] = 1;
    grid[centreSpaceX+1][centreSpaceY] = 1;
    grid[centreSpaceX+1][centreSpaceY+6] = 1;

    /* 14 EME COLONNE  */

    grid[centreSpaceX+2][centreSpaceY-16] = 1;
    grid[centreSpaceX+2][centreSpaceY-15] = 1;
    grid[centreSpaceX+2][centreSpaceY-14] = 1;
    grid[centreSpaceX+2][centreSpaceY-10] = 1;
    grid[centreSpaceX+2][centreSpaceY+2] = 1;
    grid[centreSpaceX+2][centreSpaceY+6] = 1;

    /* 15 EME COLONNE */ 

    grid[centreSpaceX+3][centreSpaceY-15] = 1;
    grid[centreSpaceX+3][centreSpaceY-13] = 1;
    
    grid[centreSpaceX+3][centreSpaceY-8] = 1;
    grid[centreSpaceX+3][centreSpaceY-7] = 1;
    grid[centreSpaceX+3][centreSpaceY-5] = 1;
    grid[centreSpaceX+3][centreSpaceY-3] = 1;
    grid[centreSpaceX+3][centreSpaceY] = 1;
    grid[centreSpaceX+3][centreSpaceY+1] = 1;
    grid[centreSpaceX+3][centreSpaceY+5] = 1;


    /* 16 EME COLONNE  */
    grid[centreSpaceX+4][centreSpaceY-15] = 1;
    grid[centreSpaceX+4][centreSpaceY-14] = 1;
    grid[centreSpaceX+4][centreSpaceY-11] = 1;
    grid[centreSpaceX+4][centreSpaceY-8] = 1;
    grid[centreSpaceX+4][centreSpaceY-6] = 1;
    grid[centreSpaceX+4][centreSpaceY-4] = 1;
    grid[centreSpaceX+4][centreSpaceY-2] = 1;
    grid[centreSpaceX+4][centreSpaceY] = 1;
    grid[centreSpaceX+4][centreSpaceY+3] = 1;
    grid[centreSpaceX+4][centreSpaceY+4] = 1;

    /* 17 EME COLONNE  */

    grid[centreSpaceX+5][centreSpaceY-17] = 1;
    grid[centreSpaceX+5][centreSpaceY-13] = 1;
    grid[centreSpaceX+5][centreSpaceY-12] = 1;
    grid[centreSpaceX+5][centreSpaceY-7] = 1;
    grid[centreSpaceX+5][centreSpaceY-6] = 1;
    grid[centreSpaceX+5][centreSpaceY-3] = 1;
    grid[centreSpaceX+5][centreSpaceY] = 1;
    grid[centreSpaceX+5][centreSpaceY+1] = 1;
    
    /* 18 EME COLONNE  */

    grid[centreSpaceX+6][centreSpaceY-18] = 1;
    grid[centreSpaceX+6][centreSpaceY-17] = 1;

    /* 19 EME COLONNE  */

    grid[centreSpaceX+7][centreSpaceY-17] = 1;
    grid[centreSpaceX+7][centreSpaceY-16] = 1;
    grid[centreSpaceX+7][centreSpaceY-15] = 1;
    grid[centreSpaceX+7][centreSpaceY-14] = 1;
    grid[centreSpaceX+7][centreSpaceY-13] = 1;
    grid[centreSpaceX+7][centreSpaceY-12] = 1;

    grid[centreSpaceX+7][centreSpaceY-6] = 1;
    grid[centreSpaceX+7][centreSpaceY-5] = 1;
    grid[centreSpaceX+7][centreSpaceY-4] = 1;
    grid[centreSpaceX+7][centreSpaceY-3] = 1;
    grid[centreSpaceX+7][centreSpaceY-2] = 1;
    grid[centreSpaceX+7][centreSpaceY-1] = 1;
    grid[centreSpaceX+7][centreSpaceY] = 1;

    /* 20 EME COLONNE  */

    grid[centreSpaceX+8][centreSpaceY-16] = 1;
    grid[centreSpaceX+8][centreSpaceY-11] = 1;
    grid[centreSpaceX+8][centreSpaceY-5] = 1;
    grid[centreSpaceX+8][centreSpaceY-1] = 1;


    /* 21 EME COLONNE  */

    grid[centreSpaceX+9][centreSpaceY-15] = 1;
    grid[centreSpaceX+9][centreSpaceY-14] = 1;
    grid[centreSpaceX+9][centreSpaceY-13] = 1;
    grid[centreSpaceX+9][centreSpaceY-6] = 1;
    grid[centreSpaceX+9][centreSpaceY-4] = 1;
    grid[centreSpaceX+9][centreSpaceY-2] = 1;
    grid[centreSpaceX+9][centreSpaceY] = 1;

    /* 22 EME COLONNE  */

    grid[centreSpaceX+10][centreSpaceY-15] = 1;
    grid[centreSpaceX+10][centreSpaceY-11] = 1;
    grid[centreSpaceX+10][centreSpaceY-6] = 1;
    grid[centreSpaceX+10][centreSpaceY-4] = 1;
    grid[centreSpaceX+10][centreSpaceY-2] = 1;
    grid[centreSpaceX+10][centreSpaceY] = 1;

    /* 23 EME COLONNE  */

    grid[centreSpaceX+11][centreSpaceY-13] = 1;
    grid[centreSpaceX+11][centreSpaceY-12] = 1;
    grid[centreSpaceX+11][centreSpaceY-11] = 1;

    grid[centreSpaceX+11][centreSpaceY-7] = 1;
    grid[centreSpaceX+11][centreSpaceY+1] = 1;

    /* 24 EME COLONNE  */

    grid[centreSpaceX+12][centreSpaceY-13] = 1;
    grid[centreSpaceX+12][centreSpaceY-12] = 1;
    grid[centreSpaceX+12][centreSpaceY-11] = 1;
    grid[centreSpaceX+12][centreSpaceY-10] = 1;
    grid[centreSpaceX+12][centreSpaceY-7] = 1;
    grid[centreSpaceX+12][centreSpaceY+1] = 1;

    /* 25 EME COLONNE  */

    grid[centreSpaceX+13][centreSpaceY-10] = 1;
    grid[centreSpaceX+13][centreSpaceY-7] = 1;
    grid[centreSpaceX+13][centreSpaceY-4] = 1;
    grid[centreSpaceX+13][centreSpaceY-2] = 1;
    grid[centreSpaceX+13][centreSpaceY+1] = 1;

    /* 26 EME COLONNE  */

    grid[centreSpaceX+14][centreSpaceY-7] = 1;
    grid[centreSpaceX+14][centreSpaceY-6] = 1;
    grid[centreSpaceX+14][centreSpaceY-5] = 1;
    grid[centreSpaceX+14][centreSpaceY-1] = 1;
    grid[centreSpaceX+14][centreSpaceY] = 1;
    grid[centreSpaceX+14][centreSpaceY+1] = 1;

    render(grid ,contexte); 

    requestAnimationFrame(update); 
}



function seedFonc(){
    
    PasAPasse = false; 
    grid = viderGrille(); 
    compteurIteration = 0;


    let indiceLigne = 30; 
    let indiceColonne = 30; 

    grid[indiceColonne][indiceLigne] = 1; 

    grid[indiceColonne+1][indiceLigne-1] = 1;
    grid[indiceColonne+2][indiceLigne-1] = 1;
    grid[indiceColonne+3][indiceLigne] = 1;
    grid[indiceColonne+3][indiceLigne+1] = 1; 
    grid[indiceColonne+2][indiceLigne+2] = 1;
    grid[indiceColonne+1][indiceLigne+2] = 1;
    grid[indiceColonne][indiceLigne+1] = 1;
    
    requestAnimationFrame(update); 

}

function pentamineFonc(){

    PasAPasse = false; 
    compteurIteration = 0;
    grid = viderGrille(); 
    

    grid[30][30] = 1; 
    grid[30][29] = 1; 
    grid[30][31] = 1; 
    grid[29][30] = 1; 
    grid[31][29] = 1; 

    requestAnimationFrame(update); 
}

function fuseeFonc(){

    PasAPasse = false; 
    compteurIteration = 0;

    grid = viderGrille(); 

    grid[20][20] = 1; 
    grid[20][21] = 1; 
    grid[20][22] = 1; 

    grid[19][21] = 1; 

    grid[21][22] = 1; 
    grid[22][22] = 1; 
    

    grid[21][23] = 1; 
    grid[22][23] = 1; 

    requestAnimationFrame(update); 
}

function expansion(){

    PasAPasse = false; 

    compteurIteration = 0;

    grid = viderGrille(); 


    grid[20][20] = 1;
    grid[20][21] = 1; 
    grid[20][22] = 1;
    grid[21][22] = 1;
    grid[22][22] = 1; 
    grid[23][21] = 1; 
    grid[24][20] = 1; 
    grid[24][19] = 1; 
    grid[24][18] = 1; 

    grid[23][18] = 1; 
    grid[22][18] = 1; 

    grid[21][19] = 1; 

    requestAnimationFrame(update); 

}

function lanceurGospelFonc(){

    PasAPasse = false; 

    compteurIteration = 0;

    grid = viderGrille();
    
    let indexiColonne = 20; 
    let indexiLigne = 20; 

    /* cote gauche  */
    grid[indexiColonne][indexiLigne] = 1;
    grid[indexiColonne][indexiLigne+1] = 1; 
    grid[indexiColonne+1][indexiLigne] = 1;
    grid[indexiColonne+1][indexiLigne+1] = 1; 
    
    grid[indexiColonne+10][indexiLigne] = 1;
    grid[indexiColonne+10][indexiLigne+1] = 1;
    grid[indexiColonne+10][indexiLigne+2] = 1;
    
    grid[indexiColonne+11][indexiLigne+3] = 1;
    grid[indexiColonne+12][indexiLigne+4] = 1;
    grid[indexiColonne+13][indexiLigne+4] = 1;

    grid[indexiColonne+11][indexiLigne-1] = 1;
    grid[indexiColonne+12][indexiLigne-2] = 1;
    grid[indexiColonne+13][indexiLigne-2] = 1;

    grid[indexiColonne+14][indexiLigne+1] = 1;



    grid[indexiColonne+15][indexiLigne-1] = 1;
    grid[indexiColonne+16][indexiLigne] = 1;
    grid[indexiColonne+16][indexiLigne+1] = 1;
    grid[indexiColonne+16][indexiLigne+2] = 1;
    grid[indexiColonne+17][indexiLigne+1] = 1;

    /* oubli d un carre  */

    grid[indexiColonne+15][indexiLigne+3] = 1;


    /* suite du rectangle  */

    grid[indexiColonne+20][indexiLigne] = 1;
    grid[indexiColonne+20][indexiLigne-1] = 1;
    grid[indexiColonne+20][indexiLigne-2] = 1;
    grid[indexiColonne+21][indexiLigne] = 1;
    grid[indexiColonne+21][indexiLigne-1] = 1;
    grid[indexiColonne+21][indexiLigne-2] = 1;

    /* carre rectangle du bas  */ 

    grid[indexiColonne+22][indexiLigne+1] = 1;


    /* carre rectangle du haut  */

    grid[indexiColonne+22][indexiLigne-3] = 1;


    /* 2 carre verticaux  du haut  */

    grid[indexiColonne+24][indexiLigne-3] = 1;
    grid[indexiColonne+24][indexiLigne-4] = 1;

    /* 2 carres verticaux du bas   */

    grid[indexiColonne+24][indexiLigne+1] = 1;
    grid[indexiColonne+24][indexiLigne+2] = 1;
    

    grid[indexiColonne+34][indexiLigne-1] = 1;
    grid[indexiColonne+34][indexiLigne-2] = 1;
    grid[indexiColonne+35][indexiLigne-1] = 1;
    grid[indexiColonne+35][indexiLigne-2] = 1;



    requestAnimationFrame(update); 
}



/* definition des fonction ****************************************** */

/* vider Grille  */

function viderGrille(){
    
    return new Array(ROWS).fill(null).map( () => new Array(COLS).fill(0));
}

/* verifier si la sauvegarde  */

function grilleSauvegardeEstVide(){

    let verite = false; 
    let i = 0; 
    let y = 0; 

    for( i = 0 ; i < grilleSauvegarde.length ; i++){
        for( y = 0 ; y < grilleSauvegarde[i].length ; y++){
            if(grilleSauvegarde[i][y] != 0){
                return false; 
            }
        }
    }
    return true; 
}


/* verifier si la grille est vide  */

function grilleEstVide(){

    let verite = false; 
    let i = 0; 
    let y = 0; 

    for( i = 0 ; i < grid.length ; i++){
        for( y = 0 ; y < grid[i].length ; y++){
            if(grid[i][y] != 0){
                return false; 
            }
        }
    }
    return true; 
}


/* Fonction d attente  */


function sleep(ms) {
    let currentTime = Date.now()
    while(currentTime + ms > Date.now()) {}
}


/* fonction d attente  */
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

// fonction qui construit la grille (retourne une grille d'entier 0 ou 1 )

function buildGridAleatoire(ROWS , COLS ){
    return new Array(ROWS).fill(null).map(
        () => new Array(COLS).fill(0).map(
            () => Math.floor(Math.random() * 2 ) ) 
    )
}

// Fonction qui actualise le rendu de la matrice d'entier 
function render(grid , contexte){

    contexte.clearRect(0 , 0 , contexte.width , contexte.height); 
    // on dessine chacune des cases de la grille si la cellule 
    // est vivante elle sera en noir , sinon en blanc 
    for(let col = 0 ; col < grid.length; col++){
        for(let row = 0 ; row < grid[col].length ; row++){

          
            const cell = grid[col][row]; 
            contexte.beginPath(); 
            contexte.rect(col * resolution ,  row * resolution , resolution , resolution); 
            contexte.fillStyle = cell == 1 ? 'black' : 'white';  
            contexte.fill(); 
            contexte.stroke(); 
        }
    }
}

// Fonction qui update la matrice 1 FOIS 
function nouvelleGeneration(grid){

    let newGrid = grid.map(arr => [...arr]); 

    console.log(newGrid); 
    let compteur = 0 ; 
    let cellule = 0;
    let row = 0; 
    let col = 0; 
    let i = 0; 
    let y = 0 

    /* On itere sur chaque case de la grid  */
    for( row = 0 ; row < newGrid.length ; row++){
        for( col = 0 ; col < newGrid[row].length ; col++){

            /* Ici on defini la cellule en question  */
            cellule = grid[row][col]; 

            /* Cette  iteration a pour but de compter le nombre de voisins   */
            for( i = -1 ; i < 2  ; i++){
                for( y = -1 ; y < 2  ; y++){

                    /* Cette condition gère les cas ou la case est en bordure , voir dans un angles 
                    droit de la grille  */
                    if( !(row + i < 0 || row+i >= grid.length || col+y < 0 || col+y >= grid[row].length) 
                    && !(i == 0 && y == 0) ){
                        
                        compteur += grid[row+i][col+y]; 
                    }
                }
            }

            /* On applique ensuite les règles du jeu de la vie , étant donné que l'on 
            connait le nombre de voisin , on peut faire toutes les décisions nécessaires  */

            if(cellule == 1 ){
                if(compteur < 2 || compteur > 3){
                    newGrid[row][col] = 0; 
                }
            }else{
                if(compteur == 3 ){
                    newGrid[row][col] = 1; 
                }
            }

            // On oublie pas de mettre le compteur a vide pour la prochaine iteration 
            compteur = 0; 
        }
    }

    return newGrid; 
}

/* fonction boucle principale du jeu */

function update(){
    if(!grilleEstVide()){
        compteurIteration++; 
        grid = nouvelleGeneration(grid); 
        render(grid , contexte); 
        requestAnimationFrame(update);
        sleep(tempsAttente); 
    }else{
        return; 
    }
}

/* lancement du jeu  */



