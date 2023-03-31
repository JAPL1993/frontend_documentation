import { Injectable } from '@angular/core';
import Swal, {
  SweetAlertIcon,
  SweetAlertOptions,
  SweetAlertResult,
  SweetAlertInput,
} from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  showSuccessAlert(message: string) {
    this.showAlert('¡Éxito!', message, 'success');
  }

  showErrorAlert(message: string) {
    this.showAlert('¡Error!', message, 'error');
  }

  showInfoAlert(message: string) {
    this.showAlert('Información', message, 'info');
  }

  showWarningAlert(message: string) {
    this.showAlert('Advertencia', message, 'warning');
  }

  showConfirmationAlert(title: string, message: string): Promise<boolean> {
    return this.showAlert(title, message, 'question', ['Yes', 'No']).then(
      (result) => {
        return result.isConfirmed;
      }
    );
  }

  showInputAlert(
    inputType: SweetAlertInput,
    options?: SweetAlertOptions
  ): Promise<SweetAlertResult> {
    const defaultOptions: SweetAlertOptions = {
      input: inputType,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    };

    return Swal.fire({ ...defaultOptions, ...options });
  }

  showModal(
    title: string,
    message: string,
    options?: SweetAlertOptions
  ): Promise<SweetAlertResult> {
    const defaultOptions: SweetAlertOptions = {
      title,
      html: message,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    };

    return Swal.fire({ ...defaultOptions, ...options });
  }

  showToast(
    title: string,
    message: string,
    icon: SweetAlertIcon = 'success',
    position:
      | 'top-end'
      | 'top-start'
      | 'bottom-end'
      | 'bottom-start' = 'top-end'
  ) {
    Swal.fire({
      title,
      text: message,
      icon,
      position,
      toast: true,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  }

  private showAlert(
    title: string,
    message: string,
    icon: SweetAlertIcon,
    buttons?: string[]
  ): Promise<SweetAlertResult> {
    const options: SweetAlertOptions = {
      title,
      text: message,
      icon,
      input: undefined,
      showCancelButton: buttons && buttons.length > 1,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: buttons && buttons.length > 0 ? buttons[0] : 'Aceptar',
      cancelButtonText: buttons && buttons.length > 1 ? buttons[1] : 'Cancelar',
    };

    return Swal.fire(options);
  }
}
