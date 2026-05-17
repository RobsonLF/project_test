
const btnDiam = document.getElementById('btnAddDiam');
const btnFechamento = document.getElementById('btnAddTijolos');
const btnLimparTijolos = document.getElementById('btnLimparTijolos');
const btnCalcularComposicao = document.getElementById('btnCalcularComp');

btnDiam.addEventListener('click', calcularDiametroInterno);
btnFechamento.addEventListener('click', calcularfechamento);
btnLimparTijolos.addEventListener('click', limparTabelaTijolos);
btnCalcularComposicao.addEventListener('click', calcularComposicao);


// ################################## FUNÇÃO CALCULAR DIÂMETRO INTERNO ################################################################ 

function calcularDiametroInterno(){
    const espessura = parseFloat(document.getElementById('espessura').value);
    const diamExt = parseFloat(document.getElementById('diamExt').value);
    const ang = parseFloat(document.getElementById('angulo').value);
    const junt = parseFloat(document.getElementById('junta').value);
    const Tabela = document.getElementById('tbDiametros');
    const linha = Tabela.tBodies[0].rows[0];
        if (isNaN(espessura)){
            window.alert('Por favor, insira um valor numérico válido para a espessura.');
            document.getElementById('espessura').focus();
            return;
        }
        if (isNaN(diamExt)) {
            window.alert('Por favor, insira um valor numérico válido para o diâmetro externo.');
            document.getElementById('diamExt').focus();
            return;
        }
        const diamInt = diamExt - (2 * espessura);
        if (diamInt <= 0) {
            window.alert('O diâmetro interno calculado é inválido. Verifique os valores de espessura e diâmetro externo.');
            document.getElementById('espessura').value = '';
            document.getElementById('diamExt').value = '';
            document.getElementById('espessura').focus();
            return;
        }
                    
        linha.cells[1].innerText = espessura;
        linha.cells[2].innerText = diamExt;
        linha.cells[3].innerText = diamInt;
        linha.cells[4].innerText = ang;
        linha.cells[5].innerText = junt;           
}

function calcularfechamento(){
    const cordaExt = parseFloat(document.getElementById('cordaExterna').value); 
    const cordaInt = parseFloat(document.getElementById('cordaInterna').value);
    const esp = parseFloat(document.getElementById('espessura').value);
    const junt = parseFloat(document.getElementById('junta').value);
    const Tabela = document.getElementById('tbTijolos');
    const linha = document.createElement('tr');
    const indiceTijolo = Tabela.rows.length;
    let fechamento;

    if (isNaN(cordaExt)){
        window.alert('Por favor, insira um valor numérico válido para a corda externa.');
        document.getElementById('cordaExterna').focus();
        return;
    }
    if (isNaN(cordaInt)){
        window.alert('Por favor, insira um valor numérico válido para a corda interna.');
        document.getElementById('cordaInterna').focus();
        return;
    }
    if (cordaInt - cordaExt == 0) {
        fechamento = 0;
    } else if (cordaExt-cordaInt < 0) {
        window.alert('A corda interna deve ser menor que a corda externa. Verifique os valores inseridos.');
        document.getElementById('cordaExterna').value = '';
        document.getElementById('cordaInterna').value = '';
        document.getElementById('cordaExterna').focus();
        return;
    }
    else{
        fechamento = (esp * 2)*(cordaExt + junt) / (cordaExt - cordaInt);
    }
    linha.innerHTML = `
    <td>${indiceTijolo}</td>
    <td>${cordaExt}</td>
    <td>${cordaInt}</td>
    <td>${fechamento.toFixed(2)}</td>
    `;
    Tabela.tBodies[0].appendChild(linha);
    document.getElementById('cordaExterna').value = '';
    document.getElementById('cordaInterna').value = '';
    document.getElementById('cordaExterna').focus();
}

function limparTabelaTijolos(){
    const Tabela = document.getElementById('tbTijolos');
    const corpoTabela = Tabela.tBodies[0];

    if (corpoTabela.rows.length > 0) {
        corpoTabela.deleteRow(-1);
    }
}

function calcularComposicao(){
    const espessura = parseFloat(document.getElementById('espessura').value);
    const diamExt = parseFloat(document.getElementById('diamExt').value);
    const ang = parseFloat(document.getElementById('angulo').value);
    const junt = parseFloat(document.getElementById('junta').value);
    const Tabela = document.getElementById('tbTijolos');
    const linhas = Tabela.tBodies[0].rows;

    for (let i = 0; i <linhas.length; i++) {
        const linha = linhas[i];
        const proxlinha = linhas[i+1];
        const tj1cordaExt = parseFloat(linha.cells[1].innerText);
        const tj1cordaInt = parseFloat(linha.cells[2].innerText);
        const tj2cordaExt = parseFloat(proxlinha.cells[1].innerText);
        const tj2cordaInt = parseFloat(proxlinha.cells[2].innerText);


        inserirCard({
            tijolo1: `${tj1cordaExt} - ${tj1cordaInt}`,
            tijolo2: `${tj2cordaExt} - ${tj2cordaInt}`,
            qtdtijolo1: '1',
            qtdtijolo2: '1',
            header: `Composição ${i+1}`
        });

        //alert(`Corda Externa: ${cordaExt}, Corda Interna: ${cordaInt}`);
    }
}

function inserirCard({tijolo1, tijolo2, qtdtijolo1, qtdtijolo2, header}){
    const grid = document.querySelector('.cards-grid');
    if (!grid){
        window.alert("Conteiner .cards-grid não encontrado. Verifique o HTML.");
        return;
    }
    const card = document.createElement('div');
    card.className = "card border-success mb-3";
    card.style.maxWidth = "18rem";

    card.innerHTML = `
    <div class="card-header text-success bg-transparent border-success">${header}</div>
    <div class="card-body text-success">
        <h5 class="card-title">${tijolo1} - Qtd.: ${qtdtijolo1}</h5> <br>
        <h5 class="card-title">${tijolo2} - Qtd.: ${qtdtijolo2}</h5>
    </div>
    `;
    grid.appendChild(card);
}

/*    <script>
        function calcularDiametroInterno(){
            const espessura = parseFloat(document.getElementById('espessura').value);
            const diamExt = parseFloat(document.getElementById('diamExt').value);
            const Tabela = document.getElementById('tbDiametros');
            const linha = Tabela.tBodies[0].rows[0];
            if (isNaN(espessura)){
                window.alert('Por favor, insira um valor numérico válido para a espessura.');
                document.getElementById('espessura').focus();
                return;
            }
            if (isNaN(diamExt)) {
                window.alert('Por favor, insira um valor numérico válido para o diâmetro externo.');
                document.getElementById('diamExt').focus();
                return;
            }
            const diamInt = diamExt - (2 * espessura);
            if (diamInt <= 0) {
                window.alert('O diâmetro interno calculado é inválido. Verifique os valores de espessura e diâmetro externo.');
                document.getElementById('espessura').value = '';
                document.getElementById('diamExt').value = '';
                document.getElementById('espessura').focus();
                return;
            }
                        
            linha.cells[1].innerText = espessura;
            linha.cells[2].innerText = diamExt;
            linha.cells[3].innerText = diamInt;
        }
     </script>*/