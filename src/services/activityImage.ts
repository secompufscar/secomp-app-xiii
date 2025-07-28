import api from "./api"

type ActivityImage = ({
    id: string,
    activityId: string,
    typeOfImage: string,
    imageUrl: string
})

export const getImagesByActivityId = async( activityId : string): Promise<ActivityImage[]> =>{
    const response = await api.get(`/activityImages/activityId/${activityId}`);
    return response.data;
}