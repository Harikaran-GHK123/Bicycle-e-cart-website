import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductInfoComponent } from './pages/product-info/product-info.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { DashBoardComponent } from './pages/dash-board/dash-board.component';
import { ContacUsComponent } from './pages/contac-us/contac-us.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FotterComponent } from './layouts/fotter/fotter.component';
import { DashNavbarComponent } from './dhashboard/dash-navbar/dash-navbar.component';
import { DashboarduserComponent } from './pages/dashboarduser/dashboarduser.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { PhotoLibraryComponent } from './pages/photo-library/photo-library.component';
import { ThemeconficComponent } from './pages/themeconfic/themeconfic.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ChangepasswordComponent } from './pages/changepassword/changepassword.component';
import { CreatenewComponent } from './createnew/createnew.component';
import { EditCategoriesComponent } from './edit-categories/edit-categories.component';
import { CropSaverComponent } from './crop-saver/crop-saver.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { CreateproductComponent } from './createproduct/createproduct.component';
import { ListproductComponent } from './listproduct/listproduct.component';
import { EditProductComponent } from './edit-product/edit-product.component';

const routes: Routes = [
{path:"",component:HomeComponent},
{path:"header",component:HeaderComponent},
{path:"footer",component:FotterComponent},
{path:"home",component:HomeComponent},
{path:"regiter",component:RegisterComponent},
{path:"createprofile",component:CreateProfileComponent},
{path:"cart",component:CartComponent},
{path:"product_info/:product",component:ProductInfoComponent},
{path:"product_list/:type/:categories",component:ProductListComponent},
{path:"dash_board",component:DashBoardComponent,children:[
  {path:"user",component:DashboarduserComponent},
  {path:"categories",component:CategoriesComponent},
  {path:"photolib",component:PhotoLibraryComponent},
  {path:"themeconfig",component:ThemeconficComponent},
  {path:"profile",component:ProfileComponent},
  {path:"changepassword",component:ChangepasswordComponent},
  {path:"editcategories/:categories",component:EditCategoriesComponent},
  {path:"createnew",component:CreatenewComponent},
  {path:"crop_saver/:type/:param",component:CropSaverComponent},
  {path:"create_product/:categories",component:CreateproductComponent},
  {path:"listproduct/:categories",component:ListproductComponent},
  {path:"edit_product/:product",component:EditProductComponent},
  { path: '', redirectTo: '/dash_board/user', pathMatch: 'full' }, 
]},

{path:"contactUs",component:ContacUsComponent},
{path:"dashnavbar",component:DashNavbarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
