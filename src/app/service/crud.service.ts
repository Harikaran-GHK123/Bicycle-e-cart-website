import { Injectable, EventEmitter } from '@angular/core';
import { Database, set, ref, update, get, child, onValue, getDatabase } from '@angular/fire/database';






@Injectable({
  providedIn: 'root'
})
export class CrudService {
  $loader= new EventEmitter();
  $disablepopup= new EventEmitter();



  public file: any = {}

  constructor(public dtatbase: Database) { }

  regiesteruser(value: regeisterdatatype, response: Function, error: Function) {
    set(ref(this.dtatbase, 'users/' + value.username), {
      username: value.username,
      email: value.email,
      userType: value.userType,
      password: value.password,
      status: value.status
    }).then(() => {

      let json = {
        response: true, data: "created success"
      }
      response(json)


    }).catch(() => {

      let json = {
        response: false, data: "created failed"

      }
      error(json)
    });
  }

  getallusers(then: Function, error: Function) {
    const dbRef = ref(this.dtatbase, "users");
    onValue(dbRef, (snapshot) => {

      if (snapshot.exists()) {
        let response = {
          Response: true,
          data: snapshot.val()
        }
        then(response)

      }
      else {

        let response = {
          Response: false,
          data: 'user not found'
        }
        error(response)
      }
    }, (err) => {
      let response = {
        Response: false,
        data: err
      }
      error(response)


    })
  }

  getuser(users: any, then: Function, error: Function) {
    const dbRef = ref(this.dtatbase, "users/" + users.username);
    onValue(dbRef, (snapshot) => {

      if (snapshot.exists()) {
        let response = {
          Response: true,
          data: snapshot.val()
        }

        then(response)

      }
      else {

        let response = {
          Response: false,
          data: 'user not found'
        }

        then(response)
      }
    }, (err) => {
      let response = {
        Response: false,
        data: err
      }
      error(response)


    })
  


    // get(dbRef)
    // .then((snapshot) => {
    //   if (snapshot.exists()) {
    //     let response = {
    //       Response: true,
    //       data: snapshot.val(), 
    //     };
    //     then(response);
    //     console.log('this is new method')
    //   } else {
    //     let response = {
    //       Response: false,
    //       data: 'User not found',
    //     };
    //     error(response);
    //   }
    // })
    // .catch((err) => {
    //   let response = {
    //     Response: false,
    //     data: err,
    //   };
    //   error(response);
    // });


  }
  getuseronce(users: any, then: Function, error: Function) {
    const dbRef = ref(getDatabase());
    get(child(dbRef, "users/" + users.username)).then((snapshot) => {
      if (snapshot.exists()) {


        let response = {
          Response: true,
          data: snapshot.val()
        }
        then(response)

      } else {

        let response = {
          Response: false,
          data: 'user not found'
        }
        then(response)
      }
    }).catch((err) => {
      error(err);

    });
  }

  getusernamepassword(users: any, then: Function, error: Function) {
    const dbRef = ref(this.dtatbase, "users/" +  users.username);

    onValue(dbRef, (snapshot) => {

      if (snapshot.exists()) {
        let response = {
          Response: true,
          data: snapshot.val()
        }

        then(response)

      }
      else {

        let response = {
          Response: false,
          data: 'user not found'
        }

        error(response)
      }
    }, (err) => {
      let response = {
        Response: false,
        data: err
      }
      error(response)


    })



  }

  //trigerloader

  trigerloader(vissible:boolean){
    this.$loader.emit(vissible);
  }

  triggereddisablepopup(vissible:boolean){
   this.$disablepopup.emit(vissible);
  }

  //trigerloader

  changeuserdata(newData: any, username: string) {
    const dbRef = ref(this.dtatbase, `users/${username}`);
    update(dbRef, newData)
      .then(() => {

      })
      .catch((error) => {

      });
  }

  // set theme config

  setthemeconfig(jsondata: any) {
    set(ref(this.dtatbase, 'themeconfig'), {
      jsondata: jsondata,
    }).then(() => {


    }).catch((e) => {


    })
  }
  // set theme config
  getthemeconfig(jsondata: Function, jsonerr: Function) {
    const themes = ref(this.dtatbase, "themeconfig");
    onValue(themes, (snapshot) => {
      if (snapshot.exists()) {
        let newdata = {
          Response: true,
          data: snapshot.val()
        }
        jsondata(newdata)
      }
      else {
        let newdata = {
          Response: false,
          data: 'json is empty'
        }
        jsonerr(newdata)
      }
    }, (err) => {
      let newdata = {
        Response: false,
        data: err
      }
      jsonerr(newdata)
    })
  }

  //  create new
  createcategories(categories: any, response: Function, reject: Function) {
    set(ref(this.dtatbase, 'categories/' + categories.Param), {
      Tittle: categories.Tittle,
      Param: categories.Param,
      Enable: categories.Enable
    }).then(() => {


      response()

    }).catch((e) => {


      reject()

    })
  }

  getcategories(createnew: Function, createrr: Function) {
    const create = ref(this.dtatbase, 'categories');
    onValue(create, (snapshot) => {
      if (snapshot.exists()) {
        let newdata = {
          Response: true,
          data: snapshot.val()
        }
        createnew(newdata)
      }
      else {
        let newdata = {
          Response: false,
          data: 'creatnew is empty'
        }
        createrr(newdata)
      }
    }, (err) => {
      let newdata = {
        Response: false,
        data: err
      }
      createrr(newdata)
    })
  }

  getcategoriesonce(categories: any, then: Function, error: Function) {
    const dbRef = ref(getDatabase());
    get(child(dbRef, "categories/" + categories.Param)).then((snapshot) => {
      if (snapshot.exists()) {


        let response = {
          Response: true,
          data: snapshot.val()
        }
        then(response)

      } else {

        let response = {
          Response: false,
          data: 'categories not found'
        }
        then(response)
      }
    }).catch((error) => {

    });
  }
  //  create new
  getcategorieonceforurl(categories: any, then: Function, error: Function) {
    const dbRef = ref(getDatabase());
    get(child(dbRef, "categories/" + categories)).then((snapshot) => {
      if (snapshot.exists()) {


        let response = {
          Response: true,
          data: snapshot.val()
        }
        then(response)


      } else {

        let response = {
          Response: false,
          data: 'categories not found'
        }
        error(response)

      }
    }).catch((error) => {

    });
  }

  // products related data
  createProductData(products: productDb, response: Function, reject: Function) {
    set(ref(this.dtatbase, 'products/' + products.Param), {
      Title: products.Title,
      Description: products.Description,
      Price: products.Price,
      Param: products.Param,
      Categories: products.Categories,
      Brand: products.Brand,
      Enable: products.Enable




    }).then(() => {
      let DB = {
        Response: true,
        data: products
      }


      response(DB)

    }).catch((e) => {


      reject(e)

    })
  }

  userupdates(users: any, responce: Function, reject: Function) {
    const dbRef = ref(this.dtatbase, `users/${users.username}`);
    update(dbRef, users)
      .then(() => {
        console.log('Data updated successfully');

        responce()
      })
      .catch((error) => {
        console.error('Error updating data:', error);
        reject()
      });
  }


  getallproduct(createnew: Function, createrr: Function) {
    const create = ref(this.dtatbase, 'products');
    onValue(create, (snapshot) => {
      if (snapshot.exists()) {
        let newdata = {
          Response: true,
          data: snapshot.val()
        }
        createnew(newdata)
      }
      else {
        let newdata = {
          Response: false,
          data: 'no product is available'
        }
        createrr(newdata)
      }
    }, (err) => {
      let newdata = {
        Response: false,
        data: err
      }
      createrr(newdata)
    })
  }

  getproductonce(products: any, resolve: Function, reject: Function) {
    const dbRef = ref(getDatabase());
    get(child(dbRef, "products/" + products)).then((snapshot) => {
      if (snapshot.exists()) {


        let response = {
          Response: true,
          data: snapshot.val()
        }
        resolve(response)

      } else {

        let response = {
          Response: false,
          data: 'product data not found'
        }
        reject(response)
      }
    }).catch((error) => {

    });
  }


  applayproductimg(products: any, url: string, responce: Function, reject: Function) {
    const dbRef = ref(this.dtatbase, `products/${url}`);
    update(dbRef, products)
      .then(() => {
        console.log('Data updated successfully');

        responce()
      })
      .catch((error) => {
        console.error('Error updating data:', error);
        reject()
      });
  }

  // products related data
  applycategoriesimg(categories: any, url: string, responce: Function, reject: Function) {
    const dbRef = ref(this.dtatbase, `categories/${url}`);
    update(dbRef, categories)
      .then(() => {


        responce()
      })
      .catch((error) => {

        reject()
      });
  }



}


export class regeisterdatatype {
  username?: string;
  email?: string;
  userType?: string;
  password?: string;
  status?: boolean;
  cart?: string[];
}
export class productDb {
  Title?: string;
  Description?: string;
  Price?: number;
  Param?: string;
  Categories?: string;
  Brand?: string;
  Enable?: boolean


}
export class createnew {
  Tittle?: string
  Param?: string
  Enable?: boolean
}





// uploadImage(file: File): Observable<string> {
//   const path = `images/${Date.now()}_${file.name}`;
//   const ref = this.storage.ref(path);
//   const task = ref.put(file);

//   return new Observable((observer) => {
//     task.then((snapshot:any) => {
//       snapshot.ref.getDownloadURL().then((downloadURL:undefined) => {
//         observer.next(downloadURL);
//         observer.complete();
//       });
//     });
//   });
// }