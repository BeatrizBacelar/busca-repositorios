class App{
    //Constructor
    constructor(){
        //Lista de repositórios
        this.repositorios = [];

        //Form
        this.formulario = document.querySelector('form');
        
        //Método para registrar os eventos do form
        this.registrarEventos();
    }

    registrarEventos(){
        this.formulario.onsubmit = evento => this.adicionarRepositorio(evento);
    }

    adicionarRepositorio(evento){
        //Evita que o formulário recarregue a página
        evento.preventDefault();

        //Adiciona o repositorio na lista
        this.repositorios.push({
            nome: 'Nerd Fonts',
            descricao: 'Iconic font agregator, collection, and patcher',
            avatar_url: 'https:/avatars0.githubusercontent.com/u/8083459?v=4',
            link: 'https://github.com/ryanoasis/nerd-fonts',
        });
        // renderizar a tela
        console.log(this.repositorios);
    }
}

new App();