import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, getDoc, query, updateDoc, where } from 'firebase/firestore';
import { TechnologyType } from '../types/technologies';
import { Observable, of } from 'rxjs';


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

  getTechnologies(){
    const techRef =  collection(this.firestore, 'technologies');
    return collectionData(techRef, {idField: 'id'}) as Observable<TechnologyType[]>;
  }

  async getTechnologyById(technologyId: string){
    const techRef =  doc(this.firestore, 'technologies', technologyId);
    return (await getDoc(techRef)).data() as TechnologyType;
  }
  
  async getTechnologyByCourseId(courseId: string){
    if (!courseId) {     
      return of([]);
    }
    const techRef = await collection(this.firestore, 'technologies');
    const techQuery = query(techRef, where('courses', 'array-contains', courseId));
    const techCollection = collectionData(techQuery, {idField: 'id'}) as Observable<TechnologyType[]>;
    return techCollection;
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

  async updateTechnologyCourses(technologyId: string, courseId: string){   
    const techRef = doc(this.firestore, 'technologies', technologyId);
    const techData = (await getDoc(techRef)).data() as TechnologyType;      
    techData.courses.push(courseId)
    const techUpdated = await updateDoc(techRef, {
      courses: techData.courses
    });
    return techUpdated;
  }

  async deleteTechnologyCourses(technologyId: string, courseId: string){   
    const techRef = doc(this.firestore, 'technologies', technologyId);
    const techData = (await getDoc(techRef)).data() as TechnologyType;      
    const courses = techData.courses.filter(course => course !== courseId);
    const techUpdated = await updateDoc(techRef, {
      courses: courses
    });
    return techUpdated;
  }


  async deleteTechDoc(technologyId: string){
    const techRef = doc(this.firestore, 'technologies', technologyId);
    await deleteDoc(techRef);
  }

}
