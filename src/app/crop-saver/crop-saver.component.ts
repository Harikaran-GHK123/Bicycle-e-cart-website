import { Component,OnInit } from '@angular/core';
import { FileUploadService } from '../service/file-upload.service';
import { ActivatedRoute,Router } from '@angular/router';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-crop-saver',
  templateUrl: './crop-saver.component.html',
  styleUrls: ['./crop-saver.component.scss']
})
export class CropSaverComponent implements OnInit {
  imageUrls: string[] = [];
  paramParam!:any;
  typeParam!:any;
  categoriesparam!:any;
  constructor(private imageService: FileUploadService,public routurl:ActivatedRoute,public service:CrudService,public router:Router) {}

  ngOnInit(): void {
    this.service.trigerloader(true); 
    this.getImageURLs();

    this.routurl.paramMap.subscribe(params => {
      this.typeParam = params.get('type');
      this.paramParam = params.get('param');
  
      console.log(this.paramParam);
      
      // console.log(this.paramParam,this.typeParam);
       
    });
  }

  getImageURLs():void{
   
    this.imageService.getallfiles((urls: string[]) => {
      this.service.trigerloader(false);
      this.imageUrls=[]
      this.imageUrls = urls;
    })
  }

  setimage(image:any){
    console.log(image);
    if(this.typeParam == 'products'){
      let getimg={
        photo:image
      }
      this.service.applayproductimg(getimg,this.paramParam,()=>{
        console.log('sucessfull');
        
        this.router.navigate(["/dash_board/edit_product/"+this.paramParam])
      },()=>{
        console.log("error");
          
      })

    }

    if(this.typeParam=='categories'){
      let getimg={
        photo:image
      }
      this.service.applycategoriesimg(getimg,this.paramParam,()=>{
        console.log('sucessfull');
        
        this.router.navigate(["/dash_board/editcategories/"+this.paramParam])
      },()=>{
        console.log("error");
          
      })
    }
    
  }
  

  items = [
    { id: 1, name: 'Item 1', imageUrl: 'path/to/item1.jpg', hovered: false },
    { id: 2, name: 'Item 2', imageUrl: 'path/to/item2.jpg', hovered: false },
    // Add more items as needed
  ];
  hovered = false;
  
  onItemHover(): void {
    this.hovered = true;
  }
  
  onItemLeave(): void {
    this.hovered = false;
  }
  //
}
