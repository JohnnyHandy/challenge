//This is a function used to update an ond object with its new properties

export const updateObject = (oldObject,updatedProperties)=>{
    return{
        ...oldObject,
        ...updatedProperties
    }
}