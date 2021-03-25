import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { NologinGuard } from './guard/nologin.guard';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule), canActivate: [ AuthGuard ]
  },
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.module').then( m => m.LoginPageModule), canActivate: [ NologinGuard ]
  },
  {
    path: 'register',
    loadChildren: () => import('./components/register/register.module').then( m => m.RegisterPageModule), canActivate: [ NologinGuard ]
  },
  {
    path: 'about',
    loadChildren: () => import('./components/about/about.module').then( m => m.AboutPageModule), canActivate: [ AuthGuard ]
  },
  {
    path: 'contact',
    loadChildren: () => import('./components/contact/contact.module').then( m => m.ContactPageModule), canActivate: [ AuthGuard ]
  },
  {
    path: 'profile',
    loadChildren: () => import('./components/profile/profile.module').then( m => m.ProfilePageModule), canActivate: [ AuthGuard ]
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./components/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule), canActivate: [ NologinGuard ]
  },
  {
    path: 'u-cerveceria',
    loadChildren: () => import('./components/u-cerveceria/u-cerveceria.module').then( m => m.UCerveceriaPageModule), canActivate: [ AuthGuard ]
  },
  {
    path: 'list-products',
    loadChildren: () => import('./components/posts/list-products/list-products.module').then( m => m.ListProductsPageModule), canActivate: [ AuthGuard ]
  },
  {
    path: 'find-users',
    loadChildren: () => import('./components/find-users/find-users.module').then( m => m.FindUsersPageModule)
  },
  {
    path: 'list-publicaciones',
    loadChildren: () => import('./components/publicaciones/list-publicaciones/list-publicaciones.module').then( m => m.ListPublicacionesPageModule)
  },
  {
    path: 'showclass',
    loadChildren: () => import('./showclass/showclass.module').then( m => m.ShowclassPageModule)
  },
  {
    path: 'cervezas',
    loadChildren: () => import('./components/cervezas/cervezas.module').then( m => m.CervezasPageModule)
  },
  {
    path: 'wishlist',
    loadChildren: () => import('./components/wishlist/wishlist.module').then( m => m.WishlistPageModule)
  },
  {
    path: 'favoritas',
    loadChildren: () => import('./components/favoritas/favoritas.module').then( m => m.FavoritasPageModule)
  },
  {
    path: 'scans',
    loadChildren: () => import('./components/scans/scans.module').then( m => m.ScansPageModule)
  },
  {
    path: 'followers',
    loadChildren: () => import('./components/followers/followers.module').then( m => m.FollowersPageModule)
  },
  {
    path: 'following',
    loadChildren: () => import('./components/following/following.module').then( m => m.FollowingPageModule)
  },
  {
    path: 'comentadas',
    loadChildren: () => import('./components/comentadas/comentadas.module').then( m => m.ComentadasPageModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./components/calendar/calendar.module').then( m => m.CalendarPageModule)
  },
  {
    path: 'cal-modal',
    loadChildren: () => import('./components/cal-modal/cal-modal.module').then( m => m.CalModalPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./components/admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'reset-email',
    loadChildren: () => import('./components/reset-email/reset-email.module').then( m => m.ResetEmailPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
