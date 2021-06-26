import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { ClassesComponent } from '../../classes/classes.component';
import { AnswerscriptsComponent } from '../../answerscripts/answerscripts.component';

export const AdminLayoutRoutes: Routes = [
    { path: '',      component: DashboardComponent, data: {title: 'Dashboard'} },
    { path: 'dashboard',      component: DashboardComponent, data: {title: 'Dashboard'} },
    { path: 'user-profile',   component: UserProfileComponent, data: {title: 'Profile'} },
    { path: 'classes',        component: ClassesComponent, data: {title: 'Classes'} },
    { path: 'answerscripts',  component: AnswerscriptsComponent, data: {title: 'AnswerScripts'} },
];
