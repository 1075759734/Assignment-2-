import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChannelListComponent } from './channel-list/channel-list.component';
import { LoginComponent } from './login/login.component';
import { GroupComponent } from './group/group.component';
import { ChatComponent } from './chat/chat.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './models/auth.guard';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', redirectTo: 'Login', pathMatch: 'full'},
  { path: 'Home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'Login', component: LoginComponent},
  { path: 'User', component: UserComponent, canActivate: [AuthGuard]},
  { path: 'Group', component: GroupComponent, canActivate: [AuthGuard]},
  { path: 'Channel', component: ChannelListComponent, canActivate: [AuthGuard]},
  { path: 'Chat/:channelname', component: ChatComponent, canActivate: [AuthGuard], pathMatch: 'full'},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
