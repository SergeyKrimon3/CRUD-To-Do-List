import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { showErrorForInputs } from '../../shared/validators/form-group.validator';
import { CpfCnpjValidator } from '../../shared/validators/cpf-cnpj.validator';

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
        private readonly activatedRoute: ActivatedRoute,
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
        this.activatedRoute.queryParams.subscribe(
            (params: Params) => {
                this.redirectUrl = params['redirectUrl'];
            }
        );
    }
}