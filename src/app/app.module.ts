import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ToastrModule } from 'ngx-toastr';



import { FormsModule, ReactiveFormsModule  } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getDatabase, provideDatabase} from '@angular/fire/database';
import { LayersComponent } from './layouts/layers/layers.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FotterComponent } from './layouts/fotter/fotter.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductInfoComponent } from './pages/product-info/product-info.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { DashBoardComponent } from './pages/dash-board/dash-board.component';
import { ContacUsComponent } from './pages/contac-us/contac-us.component';
import { DashNavbarComponent } from './dhashboard/dash-navbar/dash-navbar.component';
import { DashboarduserComponent } from './pages/dashboarduser/dashboarduser.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { PhotoLibraryComponent } from './pages/photo-library/photo-library.component';
import { ThemeconficComponent } from './pages/themeconfic/themeconfic.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ChangepasswordComponent } from './pages/changepassword/changepassword.component';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { CreatenewComponent } from './createnew/createnew.component';
import { EditCategoriesComponent } from './edit-categories/edit-categories.component';
import { CropSaverComponent } from './crop-saver/crop-saver.component';
import { CreateproductComponent } from './createproduct/createproduct.component';
import { ListproductComponent } from './listproduct/listproduct.component';
import { EditProductComponent } from './edit-product/edit-product.component';




@NgModule({
  declarations: [
    AppComponent,
    LayersComponent,
    HeaderComponent,
    FotterComponent,
    HomeComponent,
    RegisterComponent,
    CartComponent,
    ProductInfoComponent,
    ProductListComponent,
    DashBoardComponent,
    ContacUsComponent,
    DashNavbarComponent,
    DashboarduserComponent,
    CategoriesComponent,
    PhotoLibraryComponent,
    ThemeconficComponent,
    ProfileComponent,
    ChangepasswordComponent,
    CreatenewComponent,
    EditCategoriesComponent,
    CropSaverComponent,
    CreateproductComponent,
    ListproductComponent,
    EditProductComponent,
  

    
  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    ToastrModule.forRoot({
      timeOut:5000,
      progressBar:true,
      progressAnimation:'increasing',
      preventDuplicates:true,
    }),
    provideFirebaseApp(() => initializeApp({"projectId":"bycycle-e-cart-project","appId":"1:194502118230:web:9f0cfc05e95b4de763e4f7","databaseURL":"https://bycycle-e-cart-project-default-rtdb.firebaseio.com","storageBucket":"bycycle-e-cart-project.appspot.com","apiKey":"AIzaSyCN85Nsgw215ajVcORDzT3UDCm3zPJ_fbY","authDomain":"bycycle-e-cart-project.firebaseapp.com","messagingSenderId":"194502118230"})),
    provideDatabase(() => getDatabase()),
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
