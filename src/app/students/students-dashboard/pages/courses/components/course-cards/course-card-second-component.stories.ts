import { moduleMetadata,  type Meta, type StoryObj } from "@storybook/angular";
import { CourseCardsComponent } from "./course-cards.component";

const meta:Meta<CourseCardsComponent> = {
    title: "Components/atoms/Students/CourseCards",
    component: CourseCardsComponent,
    tags: ['autodocs'],
    
};
export default meta;
type Story = StoryObj<CourseCardsComponent>;
export const Default:Story = {
    args:{
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
        }
    }
};