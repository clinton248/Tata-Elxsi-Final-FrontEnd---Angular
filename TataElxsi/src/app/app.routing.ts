import { Routes } from "@angular/router";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { AdminFeedbackComponent } from "./admin-feedback/admin-feedback.component";


export const routes:Routes=[

    {path:'', component:LoginComponent},
    {path:'login', component:LoginComponent},
    {path:'register', component:RegisterComponent},
    {path:'forgot-password', component:ForgotPasswordComponent},
    {path:'dashboard', component:DashboardComponent},
    {path:'dashboard/changepassword', component:ChangePasswordComponent},
    {path:'admin-dashboard', component:AdminDashboardComponent},
    {path:'admin-feedback',component:AdminFeedbackComponent},
]