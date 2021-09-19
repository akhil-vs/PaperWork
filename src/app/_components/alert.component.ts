import { Component, OnInit, OnDestroy, Input, Inject } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Subscription } from 'rxjs';

import { Alert, AlertType } from '../_models/alert';
import { AlertService } from '../_services/alert.service';
import { ProjectService } from 'app/_services/project.service';

@Component({ selector: 'alert', templateUrl: 'alert.component.html' })
export class AlertComponent implements OnInit, OnDestroy {
    @Input() id = 'default-alert';
    @Input() fade = true;

    alerts: Alert[] = [];
    alertSubscription: Subscription;
    routeSubscription: Subscription;

    submitted: boolean = false;

    teacher: FormGroup = this.formBuilder.group({
        first_name: [null, Validators.required],
        last_name: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        phone: [null, [Validators.minLength(10), Validators.maxLength(10)]],
        organization: [null, [Validators.required]],
        class: [null, [Validators.required]]
    });;
    selectedClasses: string[];

    organization: FormGroup = this.formBuilder.group({
        first_name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        last_name: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
        email: [null, [Validators.required, Validators.email]],
        phone: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
        name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    });;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router, 
        private alertService: AlertService,
        private proService: ProjectService,
        public dialogRef: MatDialogRef<AlertComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        console.log(data);
    }

    get f() { return this.organization.controls }
    get g() { return this.teacher.controls }

    ngOnInit() {
        // subscribe to new alert notifications
        this.alertSubscription = this.alertService.onAlert(this.id)
            .subscribe(alert => {
                // clear alerts when an empty alert is received
                if (!alert.message) {
                    // filter out alerts without 'keepAfterRouteChange' flag
                    this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);

                    // remove 'keepAfterRouteChange' flag on the rest
                    this.alerts.forEach(x => delete x.keepAfterRouteChange);
                    return;
                }

                // add alert to array
                this.alerts.push(alert);

                // auto close alert if required
                if (alert.autoClose) {
                    setTimeout(() => this.removeAlert(alert), 3000);
                }
           });

        // clear alerts on location change
        this.routeSubscription = this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.alertService.clear(this.id);
            }
        });

        this.createClass();
    }

    // createOrg() {
    //     this.submitted = true;
    //     if(this.f.name.valid
    //         && this.f.first_name.valid
    //         && this.f.last_name.valid
    //         && this.f.email.valid
    //         && this.f.phone.valid) {
    //             console.log("All Set")
    //             this.proService.createOrganization(this.f.first_name.value, this.f.last_name.value, this.f.email.value, this.f.phone.value, this.f.name.value).subscribe(
    //                 (res) => {
    //                     console.log(res);
    //                 }, (err) => {
    //                     console.log(err);
    //                 }
    //             );
    //         } else {
    //             return
    //         }
    //     console.log(this.f);
    // }

    createClass() {
        this.proService.createClass().subscribe(
            (res) => {
                console.log(res);
            }, (err) => {
                console.log(err);
            }
        );
    }

    closeModal() {
        this.dialogRef.close();
    }

    ngOnDestroy() {
        // unsubscribe to avoid memory leaks
        this.alertSubscription.unsubscribe();
        this.routeSubscription.unsubscribe();
    }

    removeAlert(alert: Alert) {
        // check if already removed to prevent error on auto close
        if (!this.alerts.includes(alert)) return;

        if (this.fade) {
            // fade out alert
            alert.fade = true;

            // remove alert after faded out
            setTimeout(() => {
                this.alerts = this.alerts.filter(x => x !== alert);
            }, 250);
        } else {
            // remove alert
            this.alerts = this.alerts.filter(x => x !== alert);
        }
    }

    cssClasses(alert: Alert) {
        if (!alert) return;

        const classes = ['alert', 'alert-dismissable'];
                
        const alertTypeClass = {
            [AlertType.Success]: 'alert alert-success',
            [AlertType.Error]: 'alert alert-danger',
            [AlertType.Info]: 'alert alert-info',
            [AlertType.Warning]: 'alert alert-warning'
        }

        classes.push(alertTypeClass[alert.type]);

        if (alert.fade) {
            classes.push('fade');
        }

        return classes.join(' ');
    }
}