let participant;
let participantname;

function requestName(){
    participantname = prompt('Defina um nome de usuário: ');
    participant = {
        name: participantname
    }
    const postpromise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', participant);
    postpromise.then(inputName);
    postpromise.catch(requestName);
}

requestName();

function inputName(resposta){
    if(resposta.status === 200){
        getMessages();
        setInterval(getMessages, 3000);
        setInterval(stayConnected, 5000);
    }
}

function stayConnected(){
    const postpromise = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', participant);
}


function getMessages(){
    const getpromise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    getpromise.then(displayMessages);
}

function displayMessages(resposta){
    let messagebox = document.querySelector('.messages');
    messagebox.innerHTML='';
    let data = resposta.data;
    for(let i=0; i<data.length; i++){
        if(data[i].type === "status"){
            messagebox.innerHTML+= `
                <div class="status-message">
                <div class="hour">(${data[i].time}) </div>
                <div class="name"> ${data[i].from} </div>
                <div class="action-inout"> ${data[i].text}</div>
            </div>
            `;
        }
        if(data[i].type === "private_message"){
            messagebox.innerHTML+= `
                <div class="private-message">
                <div class="hour">(${data[i].time}) </div>
                <div class="name"> ${data[i].from} </div>
                <div class="message-to"> reservadamente para</div>
                <div class="message-to-person"> ${data[i].to}:</div>
                <div class="message-sent">${data[i].text}</div>
            </div>
            `;
        }
        if(data[i].type === "message"){
            messagebox.innerHTML+= `
                <div class="message">
                <div class="hour">(${data[i].time}) </div>
                <div class="name"> ${data[i].from} </div>
                <div class="message-to"> para</div>
                <div class="message-to-person"> ${data[i].to}:</div>
                <div class="message-sent">${data[i].text}</div>
            </div>
            `;
        }
    }
    messagebox.innerHTML+=`<div class="new-messages"></div>`;
    document.querySelector('.new-messages').scrollIntoView({block: "end", inline: "nearest", behavior: "smooth"});
}


