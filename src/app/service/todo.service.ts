import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import{ToastrService} from 'ngx-toastr';
import{map} from 'rxjs/operators'
import {firestore} from 'firebase'
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private afs : AngularFirestore,private toastr:ToastrService) { }


  saveTodo(id:string,data){
    this.afs.collection('categories').doc(id).collection('todos').add(data).then(ref =>{
    
      this.afs.doc('categories/' +id).update({todoCount:firestore.FieldValue.increment(1)})
      this.toastr.success("New Todo saved succesfully")
    });
  }

  loadTodos(id:string){
    return  this.afs.collection('categories').doc(id).collection('todos').snapshotChanges().
     pipe(
       map(actions => {
        return  actions.map(a =>{
           const data = a.payload.doc.data();
           const id = a.payload.doc.id;
           return {id, data}
         })
       })
     );
   }

   updateTodo(catId:string,todoId:string,updatedData:string){
    this.afs.collection('categories').doc(catId).collection('todos')
    .doc(todoId).update({todo:updatedData}).then(()=>{
      this.toastr.success("Todo updated succesfully")
    })
   }

   deleteTodo(catId:string,todoId:string){
    this.afs.collection('categories').doc(catId).collection('todos')
    .doc(todoId).delete().then(()=>{
      this.toastr.error(" Task succesfully deleted")
      this.afs.doc('categories/' +catId).update({todoCount:firestore.FieldValue.increment(-1)})

    })
  }

  markComplete(catId:string,todoId:string){
    this.afs.collection('categories').doc(catId).collection('todos')
    .doc(todoId).update({isCompleted:true}).then(()=>{
      this.toastr.info('Todo marked Completed')
    })
  }

  unMarkComplete(catId:string,todoId:string){
    this.afs.collection('categories').doc(catId).collection('todos')
    .doc(todoId).update({isCompleted:false}).then(()=>{
      this.toastr.info('Todo Marked Not completed')
    })
  }
  
}
