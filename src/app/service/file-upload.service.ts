import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytesResumable, getDownloadURL, listAll,deleteObject } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  getImages() {
    throw new Error('Method not implemented.');
  }
   file: string[] = [];
  files: any;



  constructor(public storage: Storage) { }


  chosefile(event: any) {
    const file = event.target.files[0];
    const storageRef = ref(this.storage, `folder_name/${file?.name}`);
    // const storageRef = ref(this.storage, 'images/rivers.jpg');
    const uploadTask = uploadBytesResumable(storageRef,file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.error('Error uploading the file:', error);
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
        });
      }
    );
  }

  getallfiles(callback:Function) {
    console.log('it is working');
    
    const storageRef = ref(this.storage, `folder_name`);
    listAll(storageRef).then((res) => {
      this.file=[];
      res.items.forEach((items) => {
        // console.log(items);
        getDownloadURL(items).then((downloadURL) => {
          
          this.file.push(downloadURL);
        
          // console.log('File available at', downloadURL);
        });
        
      })
     
      callback(this.file);
    }).catch((error) => {
      console.log(error);

    });

  }



  detetfile(){
    

  }

  



}
