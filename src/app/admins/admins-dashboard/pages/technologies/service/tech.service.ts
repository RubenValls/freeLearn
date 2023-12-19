import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class TechService {

  constructor(private firestore: Firestore) { }

  async addTechnology(technology: any){
    const newTech = await setDoc(doc(this.firestore, 'technologies', technology.name), technology);
    return newTech;
  }

  async getAllTechnologies(){
    const querySnapshot = await getDocs(collection(this.firestore, 'technologies'));
    return querySnapshot;
  }

  async isTechnologyInDatabase(technologyName: string){
    const techRef = doc(this.firestore, 'technologies', technologyName);
    const docSnap = await getDoc(techRef);
    
    return docSnap.exists()
  }

  async updateTechnology(oldTechName: string, technology: any){
    const techRef = doc(this.firestore, 'technologies', oldTechName);
    const techUpdated = await updateDoc(techRef, technology)
    return techUpdated
  }

  async deleteTechDoc(techName: string){
    await deleteDoc(doc(this.firestore, "technologies", techName));
  }
}
