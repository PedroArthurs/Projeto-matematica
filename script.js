document.getElementById("calcular").addEventListener("click", function () {
    let funcao = document.getElementById("funcao").value;
    let a = parseFloat(document.getElementById("a").value);
    let b = parseFloat(document.getElementById("b").value);
    let epsilon = parseFloat(document.getElementById("epsilon").value);
    let resultadoDiv = document.getElementById("resultado");

    if (!funcao || isNaN(a) || isNaN(b) || isNaN(epsilon)) {
        resultadoDiv.innerHTML = "⚠️ Preencha todos os campos corretamente.";
        return;
    }

    try {
        let f = x => eval(funcao);

        if (f(a) * f(b) > 0) {
            resultadoDiv.innerHTML = "⚠️ O intervalo não contém uma raiz (f(a) e f(b) têm o mesmo sinal).";
            return;
        }

        let iteracoes = [];
        let iter = 0;

        while (Math.abs(b - a) > epsilon) {
            let m = (a + b) / 2;
            iteracoes.push(`Iteração ${++iter}: a=${a.toFixed(6)}, b=${b.toFixed(6)}, m=${m.toFixed(6)}, f(m)=${f(m).toFixed(6)}`);

            if (f(m) === 0) {
                a = b = m;
                break;
            } else if (f(a) * f(m) < 0) {
                b = m;
            } else {
                a = m;
            }
        }

        let mFinal = (a + b) / 2;
        resultadoDiv.innerHTML = `<strong>Raiz aproximada:</strong> ${mFinal.toFixed(6)}<br><br>` +
                                  `<strong>Iterações:</strong><br>${iteracoes.join("<br>")}`;
    } catch (e) {
        resultadoDiv.innerHTML = "⚠️ Erro na função. Verifique a sintaxe.";
    }
});
