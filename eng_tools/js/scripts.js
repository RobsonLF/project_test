
const btnDiam = document.getElementById('btnAddDiam');
const btnFechamento = document.getElementById('btnAddTijolos');
const btnLimparTijolos = document.getElementById('btnLimparTijolos');


btnDiam.addEventListener('click', calcularDiametroInterno);
btnFechamento.addEventListener('click', calcularfechamento);
btnLimparTijolos.addEventListener('click', limparTabelaTijolos);

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