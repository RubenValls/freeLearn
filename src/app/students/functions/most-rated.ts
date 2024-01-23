import { Rating } from './../../admins/admins-dashboard/pages/courses/interface/course';
import { Course } from "src/app/admins/admins-dashboard/pages/courses/interface/course"
import { Instructor } from "src/app/admins/admins-dashboard/pages/instructors/instructors"

export const mostRatedTopic = ( array: Instructor[] | Course[] ) => {
    const topicArray = [...array]

    topicArray.forEach(( topic: any, index ) => {
        let eachTopic = {
            topicRating: 0,
            index: index
        };
        if(topic.rating.length > 0){
            topic.rating.forEach((rating : Rating) => {
                eachTopic.topicRating += rating?.rating
            })
            eachTopic.topicRating = eachTopic.topicRating / topic.rating.length
        }
        topicArray[index] = {
            ...topic,
            topicRating: eachTopic.topicRating,
        }
    })

    topicArray.sort((a: any, b: any) => b.topicRating - a.topicRating);


    return topicArray.slice(0, 3).map((topic: any) => {
        delete topic.topicRating;
        return topic;
      }) as Instructor[] | Course[];
      
}