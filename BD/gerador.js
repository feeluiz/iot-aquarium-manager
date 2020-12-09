/*
CREATE TABLE ALIMENTO
(
    COD_ALIMENTO INT NOT NULL,
    NOME VARCHAR(30) NOT NULL,
    DESC_ALIMENTO VARCHAR(70),
    QUANT_ALIMENTO SMALLINT NOT NULL,

    CONSTRAINT PK_ALIMENTO PRIMARY KEY (COD_ALIMENTO),
);*/

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
} 
/*
console.log('INSERT INTO ALIMENTO VALUES')
for (let i = 0; i < 30; i++) {
    console.log(` (${i},${COD_ALIMENTO[getRandomInt(0,3)]},${quant[getRandomInt(0,3)]},2020-11-30)`)
}
/*
(1,AQUARIUM,PARA PEIXES FRAGEIS E PEQUENOS. AUMENTA A IMUNIDADE E EVITA VERMES,10)
(2,GRANULES,GRÂNULOS COM VITAMINAS E MINERAIS,15)
(3,GOLDFISH,RAÇÃO EXTRUSADA QUE REALÇA A COLORAÇÃO DE KINGUIOS E CARPAS,20)

/*
CREATE TABLE AQUARIO
(
    COD_AQUARIO INT NOT NULL,
    TEMP_IDEAL SMALLINT NOT NULL,
    PERIODO INT NOT NULL,
    COD_ALIMENTO INT,
    CONSTRAINT PK_AQUARIO PRIMARY KEY (COD_AQUARIO),
    CONSTRAINT FK_ALIMENTO FOREIGN KEY (COD_ALIMENTO) REFERENCES ALIMENTO(COD_ALIMENTO),
);*/

let periodo = [240,360,480,360,600]

console.log('INSERT INTO AQUARIO (TEMP_IDEAL,PERIODO,COD_ALIMENTO) VALUES')
for (let i = 0; i < 5; i++) {
    console.log(`(${getRandomInt(20,25)},${periodo[i]},${getRandomInt(0,2)}),`)
}


/*
CREATE TABLE TEMPERATURA
(
    HORARIO DATETIME NOT NULL,
    TEMP INT NOT NULL,
    COD_AQUARIO INT NOT NULL,
    CONSTRAINT FK_AQUARIO FOREIGN KEY (COD_AQUARIO) REFERENCES AQUARIO(COD_AQUARIO),
);
*/

console.log('INSERT INTO TEMPERATURA(TEMP,COD_AQUARIO) VALUES')
for (let i = 0; i < 60; i++) {
    console.log(`(${getRandomInt(21,24)},${getRandomInt(0,5)}),`)
}


