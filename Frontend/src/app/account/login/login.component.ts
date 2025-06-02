import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { showErrorForInputs } from '../../shared/validators/form-group.validator';
import { CpfCnpjValidator } from '../../shared/validators/cpf-cnpj.validator';
import { IAuth } from '../../shared/models/auth.model';
import { LocalStorageService } from 'angular-web-storage';
import { LocalStorageKeys } from '../../shared/models/storage-keys.model';
import { DefaultSetTimeout } from '../../../constants/constants';
import { UtilService } from '../../shared/services/util.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        SharedModule
    ],
    templateUrl: './login.component.html',
    styleUrl: '../styles/form.style.scss'
})
export class LoginComponent implements OnInit {

    public loading: boolean = false;
    public showPassword: boolean = false;
    public redirectUrl: string = '';
    public form: FormGroup;

    constructor(
        private readonly _formBuilder: FormBuilder,
        private readonly location: Location,
        private readonly router: Router,
        private readonly localStorage: LocalStorageService,
        private readonly utilService: UtilService,
    ) {
        this.form = this._formBuilder.group({
            cpf: ['', [Validators.required, CpfCnpjValidator]],
            password: ['', [Validators.required]],
            keepConnected: ['']
        });
    }

    public async ngOnInit(): Promise<void> {
        await this.verifyIfHasRedirectUrl();
    }

    public async login(): Promise<void> {
        this.loading = true;
        const loginData: IAuth = {
            cpf: this.form.value.cpf,
            password: this.form.value.password
        }

        setTimeout(() => {
            if (this.form.value.keepConnected) {
                const loginToStorage: IAuth = {
                    cpf: this.form.value.cpf,
                    password: null,
                }
                this.localStorage.set(LocalStorageKeys.SAVED_LOGIN_DATA, JSON.stringify(loginToStorage));
            } else {
                this.localStorage.remove(LocalStorageKeys.SAVED_LOGIN_DATA);
            }
            this.router.navigate(['/tasks']);
            this.loading = false;
        }, DefaultSetTimeout);
    }

    public cancel(): void {
        this.location.back();
    }

    public disableLogin(): boolean {
        if (this.loading || this.form.invalid) {
            return true;
        }
        return false;
    }

    public showError(formName: string): boolean {
        return showErrorForInputs(formName, this.form);
    }

    public async verifyIfHasRedirectUrl(): Promise<void> {
        this.getStorageDataForLogin();
    }

    public getStorageDataForLogin(): void {
        const loginData: IAuth = this.utilService.getLocalStorageDataFormatted(LocalStorageKeys.SAVED_LOGIN_DATA);
        if (loginData) {
            this.form.patchValue({
                cpf: loginData.cpf,
                keepConnected: true
            });
        }
    }
}