import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { UsuariosResponse } from '../../shared/models/usuarios/usuarios-response.model';
import { UsuariosInserirRequest } from '../../shared/models/usuarios/usuarios-inserir-request.model';
import { UsuariosEditarRequest } from '../../shared/models/usuarios/usuarios-editar-request.model';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedModule],
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {
  usuarios: UsuariosResponse[] = [];
  usuarioSelecionado: UsuariosResponse | null = null;
  novoUsuario: UsuariosInserirRequest = {};
  editandoUsuario: UsuariosEditarRequest = {};
  modoEdicao: boolean = false;
  currentFormUser: any = {}; // Objeto temporário para o formulário

  // Propriedades para paginação
  paginaCorrente: number = 1;
  itensPorPagina: number = 10;
  totalRegistros: number = 0;

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit(): void {
    this.listarUsuarios();
    this.resetForm();
  }

  listarUsuarios(): void {
    this.usuariosService.listar().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.totalRegistros = data.length;
      },
      error: (err) => {
        console.error('Erro ao listar usuários:', err);
      }
    });
  }

  selecionarUsuario(usuario: UsuariosResponse): void {
    this.usuarioSelecionado = usuario;
    this.currentFormUser = { ...usuario }; // Copia para edição
    this.modoEdicao = true;
  }

  resetForm(): void {
    this.usuarioSelecionado = null;
    this.novoUsuario = {};
    this.editandoUsuario = {};
    this.currentFormUser = {};
    this.modoEdicao = false;
  }

  inserirUsuario(): void {
    this.novoUsuario = { ...this.currentFormUser }; // Copia do form para o objeto de inserção
    this.usuariosService.inserir(this.novoUsuario).subscribe({
      next: (data) => {
        console.log('Usuário inserido:', data);
        this.listarUsuarios();
        this.resetForm();
      },
      error: (err) => {
        console.error('Erro ao inserir usuário:', err);
      }
    });
  }

  editarUsuario(): void {
    this.editandoUsuario = { ...this.currentFormUser }; // Copia do form para o objeto de edição
    this.usuariosService.editar(this.editandoUsuario).subscribe({
      next: (data) => {
        console.log('Usuário editado:', data);
        this.listarUsuarios();
        this.resetForm();
      },
      error: (err) => {
        console.error('Erro ao editar usuário:', err);
      }
    });
  }

  excluirUsuario(id: number): void {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      this.usuariosService.excluir(id).subscribe({
        next: () => {
          alert('Usuário excluído com sucesso.');
          this.listarUsuarios();
          this.resetForm();
        },
        error: (err) => {
          console.error('Erro ao excluir usuário:', err);
        }
      });
    }
  }

  // Métodos de paginação
  onTrocarDePagina(event: any): void {
    this.paginaCorrente = event.page;
    this.itensPorPagina = event.itemsPerPage;
    // Aqui você pode adicionar lógica para carregar dados da API com base na página e itens por página
    // Por enquanto, a paginação será apenas visual na tabela.
  }

  getUsuariosPaginados(): UsuariosResponse[] {
    const inicio = (this.paginaCorrente - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    return this.usuarios.slice(inicio, fim);
  }
}
