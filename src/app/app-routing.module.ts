import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SitemapComponent } from './sitemap/sitemap.component';
import { UnknownComponent } from './unknown/unknown.component';

const routes: Routes = [
  {
    path: 'resume',
    loadChildren: () => import('./resume/resume.module').then(_ => _.ResumeModule)
  },
  {
    path: 'lab',
    loadChildren: () => import('./lab/lab.module').then(_ => _.LabModule)
  },
  {
    path: 'error',
    children: [
      { path: '', redirectTo: '/error/500', pathMatch: 'full' },
      { path: '500', component: UnknownComponent },
      { path: '403', component: ForbiddenComponent },
      { path: '404', component: PageNotFoundComponent },
    ]
  },
  // sitemap
  { path: 'sitemap', component: SitemapComponent },
  // home page
  { path: '', redirectTo: 'resume', pathMatch: 'full' },
  // default routing
  { path: '**', redirectTo: '/error/404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
