# Projeto — Portfólio Web do Curso de Engenharia de Software

Alunos:
Gabriela Rocha Passotto - 2454351
Luiz Fernando Moreira Domenico - 2567962
Wenio Oliveira Silva - 2410427

**1 - Descrição Geral**

Sistema web que funcione como um portfólio online dos alunos do curso de Bacharelado em Engenharia de Software.
O sistema deverá permitir a interação de três tipos de usuários — Aluno, Administrador e Usuário Externo — cada um com permissões e funcionalidades específicas.
O objetivo é integrar os conhecimentos de desenvolvimento back-end e front-end adquiridos ao longo da disciplina, aplicando arquitetura MVC e boas práticas de programação web.

<img width="504" height="341" alt="Captura de tela 2025-10-04 002438" src="https://github.com/user-attachments/assets/cf999edb-4db1-4fe0-b9b7-3933b49e56fe" style = "width: 400px; height: 300px;" />



**2 -  Requisitos do Sistema**

***2.1 Requisitos do Aluno***
| ID            | Requisitos |
| ------------- | ------------- |
| 0001  | O aluno não pode se autocadastrar no sistema, mas deve poderfazer login.   |
| 0002  | Os alunos devem poder cadastrar todos os seus projetos, que devem ser vinculados a palavras-chave previamente cadastradas no sistema.  |
| 0003  | Um projeto pode estar vinculado a quantas palavras-chave o aluno desejar. |
| 0004  | Deve existr um relacionamento de muitos para muitos (N para N) entre a tabela de projetos e a tabela de palavras-chave. |
| 0005  | Cada projeto deve ter um nome, um resumo, e um link externo |
| 0006  | Cada projeto pode ser desenvolvido por mais de um aluno. |
| 0007  | Cada aluno pode cadastrar seus conhecimentos e defnir seu nível em cada um (em uma escala de 0 a 10). |
| 0008  | Todos os conhecimentos devem estar previamente cadastrados no sistema. |
| 0009  | Cada aluno pode editar e/ou excluir seus projetos, as palavras-chave de cada projeto e seus próprios conhecimentos. |


***2.2 Requisitos do usuário administrador***
| ID            | Requisitos |
| ------------- | ------------- |
| 0001 | O administrador deve poder, quando logado no sistema, cadastrar, listar, editar e excluir alunos, palavras-chave e conhecimentos no sistema. |

***2.3 Requisitos do usuário externo***
| ID            | Requisitos |
| ------------- | ------------- |
| 0001 | O usuário externo deve poder, sem estar logado no sistema, visualizar todos os projetos desenvolvidos pelos alunos. |
| 0002 | O usuário externo deve poder, sem estar logado no sistema, visualizar todos os projetos vinculados a uma palavra-chave que ele tenha escolhido (entre as palavraschave já cadastradas no sistema).  |
| 0003 | O usuário externo deve poder visualizar um relatório com a proporção de alunos que dominam cada um dos conhecimentos cadastrados no sistema |

