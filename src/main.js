import api from './api';

class App{
    //Constructor
    constructor(){
        //Lista de repositórios
        this.repositorios = [];

        //Form
        this.formulario = document.querySelector('form');

        //lista
        this.lista = document.querySelector('.list-group');
        
        //Método para registrar os eventos do form
        this.registrarEventos();
    }

    registrarEventos(){
        this.formulario.onsubmit = evento => this.adicionarRepositorio(evento);
    }

    async adicionarRepositorio(evento){
        //Evita que o formulário recarregue a página
        evento.preventDefault();

        //recuperar o valor do input
        let input = this.formulario.querySelector('input[id=repositorio]').value;

        // vazio? sai da aplicacao
        if (input.length === 0){
            return; // return sempre sai da função
        } 

        let response = await api.get(`/repos/${input}`);

        //console.log(response);

        let {name, description, html_url, owner: {avatar_url}} = response.data;

        //Adiciona o repositorio na lista
        this.repositorios.push({
            nome: name,
            descricao: description,
            avatar_url,
            link: html_url,
        });
        // renderizar a tela
        this.renderizarTela();
        console.log(this.lista);
    }

    renderizarTela(){
        //limpar o conteudo de lista
        this.lista.innerHTML = '';

        // percorrer toda a lista de repositorios e criar os elementos
        this.repositorios.forEach(repositorios => {
            // <li>
            let li = document.createElement('li');
            li.setAttribute('class', 'list-group-item list-group-item-action');

            //<img>
            let img = document.createElement('img');
            img.setAttribute('src', repositorio.avatar_url);
            li.appendChild(img);

            //<strong>
            let strong = document.createElement('strong');
            let txtNome = document.createTextNode(repositorio.nome);
            strong.appendChild(txtNome)
            li.appendChild(strong);

            //<p>
            let p = document.createElement('p');
            let txtDescricao = document.createTextNode(repositorio.descricao);
            p.appendChild(txtDescricao);
            li.appendChild(p);

            //<a>
            let a = document.createElement('a');
            a.setAttribute('target', '_blank');
            a.setAttribute('href', repositorio.link);
            let txtA = document.createTextNode('Acessar');
            a.appendChild(txtA);
            li.appendChild(a);

            //Adicionar <li> como filho da ul
            this.lista.appendChild(li);

            //Limpar o conteudo do input
            this.formulario.querySelector('input[id=repositorio]').value = '';

            // Adiciona o foco no input
            this.formulario.querySelector('input[id=repositorio]').focus();
        });
    }
}

new App();