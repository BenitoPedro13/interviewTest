# Awesome Project Build by Benito Pedro

  

## 🚀 - Steps to run this project:

  

1. Execute o comando `npm i` 

2. Defina as configuraçoes da Base de Dados no arquivo `ormconfig.json`

3. Execute o comando `npm start` 

## 👨‍💻 - API Documentation



1. Rota /create :
- aceita apenas solicitaçoes http do tipo POST
	- recebe um JSON com as informaçoes do usuario
	- template do json: 
		{
			name: 'seu_nome',
			username: 'seu_username_unico',
			senha: 'sua_senha'
		}
	- **todos os campos devem estar preenchidos**
	- **cada username deve ser unico para ser aceito**
	

2. Rota /read:
- aceita apenas solicitaçoes http do tipo GET
	- retorna todos os usuarios existentes na Base de Dados


3. Rota /read/:id
- aceita apenas solicitaçoes http do tipo GET
	- o parametro de roda `id` deve ser :
		 
		- Um `id` correspondente ao de um usuario existente
		- Uma unica string de 12 bytes ou 24 caracteres hex

4. Rota /update/:id
- aceita apenas solicitaçoes http do tipo PUT
	- recebe um JSON com as informaçoes do usuario
	- template do json (**pelo menos um campo deve ser enviado**) : 
		{
			`Opcional` name: 'seu_nome',
			`Opcional` username: 'seu_username_unico',
			`Opcional` senha: 'sua_senha'
		}
	- **pelo menos um campo deve ser enviado**
	- **todos os campos enviados devem estar preenchidos**
	- **cada username deve ser unico para ser aceito**
	- o parametro de roda `id` deve ser :
		 
		- Um `id` correspondente ao de um usuario existente
		- Uma unica string de 12 bytes ou 24 caracteres hex
	 
5. Rota /delete/:id
- aceita apenas solicitaçoes http do tipo DELETE
	- o parametro de roda `id` deve ser :
		 
		- Um `id` correspondente ao de um usuario existente
		- Uma unica string de 12 bytes ou 24 caracteres hex
