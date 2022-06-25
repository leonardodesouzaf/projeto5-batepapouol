let participantname = prompt('Defina um nome de usuário: ');
let participant = {
    name: participantname
}
const postpromise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', participant);
postpromise.then(displaying);


function displaying(resposta){
    console.log(resposta);
}



