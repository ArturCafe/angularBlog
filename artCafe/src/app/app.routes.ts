import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home/home.component';
import { LoginuserComponent } from '../app/pages/loginuser/loginuser/loginuser.component';
import { RegisterComponent } from '../app/pages/register/register/register.component';
import { NoguarduserGuard } from './guards/noguarduser.guard';


import { GuardadminGuard } from './guards/guardadmin.guard';

import { AdminDasboardComponent } from './admin/pages/admin-dasboard/admin-dasboard.component';
import { CreatecategoryComponent } from './admin/pages/createcategory/createcategory.component';
import { PostIdComponent } from './pages/postId/post-id/post-id.component';
import { FrontLayoutComponent } from './components/layout/front-layout/front-layout.component';
import { AdminLayoutComponent } from './admin/components/layout/admin-layout/admin-layout.component';
import { CreatePostComponent } from './admin/pages/create-post/create-post.component';
import { CreateVideoPostsComponent } from './admin/pages/create-video-posts/create-video-posts.component';
import { PostsAdminComponent } from './admin/pages/posts-admin/posts-admin.component';
import { PostsCategoryComponent } from './admin/pages/posts-category/posts-category.component';
import { UsersComponent } from './admin/pages/users/users.component';
import { ProfilComponent } from './admin/pages/profil/profil.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AdminProfilComponent } from './admin/pages/admin-profil/admin-profil.component';
import { AdminPostComponent } from './admin/pages/admin-post/admin-post.component';




export const routes: Routes = [
    {
       path: '',component: FrontLayoutComponent ,  // Layout-ul principal pentru ruta de bază
       children: [

            { path: '', component: HomeComponent },  // Pagina Home este încărcată pe calea de bază
            {path:'login',component: LoginuserComponent, canActivateChild:[NoguarduserGuard]},
            {path:'register',component: RegisterComponent, canActivateChild:[NoguarduserGuard]},
            {path:'post/:id',component: PostIdComponent, canActivateChild:[NoguarduserGuard]},
            {path:'contact',component: ContactComponent, canActivateChild:[NoguarduserGuard]},
            {path:'contact/:id',component: ContactComponent, canActivateChild:[NoguarduserGuard]},
     
         ]    
      
    },
    
   {path:'admin',component: AdminLayoutComponent,/*canActivate:[GuardadminGuard],*/

        children:[

           {path:'dashboard', component: AdminDasboardComponent},
           {path:'create-category', component: CreatecategoryComponent},
           {path:'create-post', component: CreatePostComponent},
           {path:'create-video-post', component: CreateVideoPostsComponent},
           {path:'admin-posts', component: PostsAdminComponent},
           {path:'category-posts/:id', component: PostsCategoryComponent},
           {path:'post-admin/:id', component: AdminPostComponent},
           {path:'profile-admin', component: AdminProfilComponent},
           {path:'profile', component: ProfilComponent},
           {path:'users', component: UsersComponent},
          
      ]

   },
     
];
