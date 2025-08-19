// ===== Bissecção =====
document.getElementById("calcBissec").addEventListener("click", function(){
    let fStr = document.getElementById("funcBissec").value;
    let a = parseFloat(document.getElementById("aBissec").value);
    let b = parseFloat(document.getElementById("bBissec").value);
    let eps = Math.abs(parseFloat(document.getElementById("epsBissec").value));
    let resDiv = document.getElementById("resultadoBissec");
    resDiv.innerHTML="";

    if(!fStr || isNaN(a) || isNaN(b) || isNaN(eps) || a===b){
        resDiv.innerHTML="⚠️ Preencha todos os campos corretamente.";
        return;
    }

    try{
        let f = x=>eval(fStr);
        if(f(a)*f(b)>0){resDiv.innerHTML="⚠️ O intervalo não contém raiz."; return;}

        let iter=0;
        let log="";
        while(Math.abs(b-a)>eps){
            let m=(a+b)/2;
            log+=`Iter ${++iter}: a=${a}, b=${b}, m=${m}, f(m)=${f(m)}<br>`;
            if(f(m)===0) break;
            if(f(a)*f(m)<0) b=m; else a=m;
        }
        let raiz=(a+b)/2;
        resDiv.innerHTML=`<strong>Raiz aproximada:</strong> ${raiz}<br>${log}`;
    }catch(e){
        resDiv.innerHTML="⚠️ Erro na função.";
    }
});

// ===== Gauss =====
document.getElementById("genGauss").addEventListener("click", ()=>{
    let n = parseInt(document.getElementById("sizeGauss").value);
    let container = document.getElementById("inputsGauss");
    container.innerHTML="";
    let table=document.createElement("table");
    let html="<tr>";
    for(let j=0;j<n;j++) html+="<th>x"+(j+1)+"</th>";
    html+="<th>b</th></tr>";
    for(let i=0;i<n;i++){
        html+="<tr>";
        for(let j=0;j<n;j++){
            html+=`<td><input type='number' step='any' id='a${i}_${j}'></td>`;
        }
        html+=`<td><input type='number' step='any' id='b${i}'></td></tr>`;
    }
    table.innerHTML=html;
    container.appendChild(table);
});

document.getElementById("calcGauss").addEventListener("click", ()=>{
    let n = parseInt(document.getElementById("sizeGauss").value);
    let A=[],B=[];
    for(let i=0;i<n;i++){
        A[i]=[];
        for(let j=0;j<n;j++){
            A[i][j]=parseFloat(document.getElementById(`a${i}_${j}`).value)||0;
        }
        B[i]=parseFloat(document.getElementById(`b${i}`).value)||0;
    }

    let resDiv = document.getElementById("resultadoGauss");
    resDiv.innerHTML="";
    let multipliers=[];

    // Eliminação de Gauss
    for(let k=0;k<n-1;k++){
        for(let i=k+1;i<n;i++){
            let m=A[i][k]/A[k][k];
            multipliers.push(m);
            for(let j=k;j<n;j++){
                A[i][j]-=m*A[k][j];
            }
            B[i]-=m*B[k];
        }
        resDiv.innerHTML+=`<strong>Etapa ${k+1}:</strong><br>${matrizHTML(A,B)}<br>`;
    }

    // Retro-substituição
    let X=Array(n).fill(0);
    for(let i=n-1;i>=0;i--){
        let sum=0;
        for(let j=i+1;j<n;j++){
            sum+=A[i][j]*X[j];
        }
        X[i]=(B[i]-sum)/A[i][i];
    }

    resDiv.innerHTML+=`<strong>Multiplicadores usados:</strong> ${multipliers.join(", ")}<br>`;
    resDiv.innerHTML+=`<strong>Quantidade de multiplicadores:</strong> ${multipliers.length}<br>`;
    resDiv.innerHTML+=`<strong>Solução:</strong> [${X.join(", ")}]<br>`;
});

// Função para mostrar matriz com vetor B
function matrizHTML(A,B){
    let n=A.length;
    let html="<table border='1' style='border-collapse:collapse'><tbody>";
    for(let i=0;i<n;i++){
        html+="<tr>";
        for(let j=0;j<n;j++){
            html+=`<td>${A[i][j].toFixed(3)}</td>`;
        }
        html+=`<td>${B[i].toFixed(3)}</td>`;
        html+="</tr>";
    }
    html+="</tbody></table>";
    return html;
}

// Botão aulas práticas (exemplo)
document.getElementById("btnAulas").addEventListener("click",()=>{
    alert("💡 Aulas Práticas:\n1) Método da Bissecção\n2) Eliminação de Gauss\n3) Outros métodos numéricos");
});
