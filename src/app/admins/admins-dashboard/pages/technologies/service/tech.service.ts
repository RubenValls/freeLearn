import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { TechnologyType } from '../types/technologies';


@Injectable({
  providedIn: 'root'
})
export class TechService {

  constructor(private firestore: Firestore) { }

  async addTechnology(technology: TechnologyType){
    const techRef = collection(this.firestore, 'technologies')
    const newTech = await addDoc(techRef, technology);
    return newTech;
  }

  async getAllTechnologies(){
    const querySnapshot = await getDocs(collection(this.firestore, 'technologies'));
    return querySnapshot;
  }

  async isTechnologyInDatabase(technologyId: string){
    const techRef = doc(this.firestore, 'technologies', technologyId);
    const docSnap = await getDoc(techRef);
    
    return docSnap.exists()
  }

  async updateTechnology(technologyId: string, technology: TechnologyType){
    const techRef = doc(this.firestore, 'technologies', technologyId);
    const techUpdated = await updateDoc(techRef, {...technology})
    return techUpdated
  }

  async deleteTechDoc(technologyId: string){
    await deleteDoc(doc(this.firestore, "technologies", technologyId));
  }
}
