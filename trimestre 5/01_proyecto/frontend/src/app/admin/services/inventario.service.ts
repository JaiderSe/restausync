import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Inventario } from '@shared/interfaces';
import { environment } from '@env/environment';
import { catchError, Observable, Subject, tap } from 'rxjs';

const API_URL = `${environment.apiUrl}/inventario`;

@Injectable({
  providedIn: 'root',
})
export class InventarioService {
  private _http: HttpClient = inject(HttpClient);
  private reloadSubject = new Subject<void>();
  public reload$ = this.reloadSubject.asObservable();

  notifyReload() {
    this.reloadSubject.next();
  }

  getAll(): Observable<Inventario[]> {
    return this._http.get<Inventario[]>(API_URL);
  }

  getById(movimiento_id: number): Observable<Inventario> {
    return this._http.get<Inventario>(`${API_URL}/${movimiento_id}`);
  }

  create(inventario: Inventario): Observable<Inventario> {
    return this._http.post<Inventario>(API_URL, inventario).pipe(
      tap((data) => {
        return data;
      }),
      tap(() => this.notifyReload()),
      catchError((error) => {
        console.error('Error creating inventario:', error);
        throw error; // Rethrow the error to be handled by the caller
      }),
    );
  }

  updateById(
    movimiento_id: number,
    inventario: Inventario,
  ): Observable<Inventario> {
    return this._http
      .patch<Inventario>(`${API_URL}/${movimiento_id}`, inventario)
      .pipe(
        tap((data) => {
          return data;
        }),
        tap(() => this.notifyReload()),
        catchError((error) => {
          console.error('Error updating inventario:', error);
          throw error; // Rethrow the error to be handled by the caller
        }),
      );
  }

  deleteById(movimiento_id: number): Observable<Inventario[]> {
    return this._http
      .delete<Inventario[]>(`${API_URL}/${movimiento_id}`)
      .pipe(tap(() => this.notifyReload()));
  }
}
