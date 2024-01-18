import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import { HeaderCourseComponent } from "./header-course.component";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { UsersService } from "src/app/shared/services/users/users.service";
import { AlertsService } from "src/app/shared/services/alerts/alerts.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { Firestore, FirestoreModule } from "@angular/fire/firestore";
import { FirebaseApp, FirebaseAppModule } from "@angular/fire/app";
import { StoreModule } from "@ngrx/store";
import { userReducer } from "src/app/login/store/user.reducer";

export default {
    title: "Components/Students/HeaderCourse",
    component: HeaderCourseComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [BrowserAnimationsModule, MatSnackBarModule, FirestoreModule, FirebaseAppModule, StoreModule.forRoot({ user: userReducer }),],
            providers: [AlertsService, UsersService, {
                provide: ActivatedRoute,
                useValue: {
                    params: of({ id: "1"}),
                    data: of({ })
                }
            },
                { provide: Firestore, useValue: {} },
                { provide: FirebaseApp, useValue: {} },
             
                

            ]
        })
    ]
}


export const Default = () => ({
    component: HeaderCourseComponent,
    props: {
    
        course: {
           
            name: "Curso Completo de REACT",
            imageUrl: "https://www.pildorasinformaticas.es/wp-content/uploads/2021/01/AngularJS-Tutorial.png",
            description: "Comienzo en el día de hoy un curso de Angular que me habéis solicitado mucho desde los comentarios del canal, mi web y redes sociales. En este primer vídeo vemos el temario del curso, los conocimientos previos requeridos y vemos qué es Angular y sus principales características. Espero que el curso sea de vuestro agrado.Para más cursos, ejercicios y manuales visita: www.pildorasinformaticas.es",
            lessons: [],
            techs: [{ id: "1", name: "Angular" }],
            rating: [],
            introductionURL: "https://www.youtube.com/watch?v=VoMyUgI-5NI&list=PLRM7PpbqqStKo-NiCuzuYwewZmd9b-EZ9&index=1",
            instructorId: [
                { id: "1", name: "JAB" }
            ]
        },
        isFavorite: false,
        courseId: "testId",
        userId: "testId"

    }
});