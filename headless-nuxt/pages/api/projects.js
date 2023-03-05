// export const filterProject = async (query) => {
//     const strapiQuery = {
//         populate: ['deep'],
//         filters: {},
//
//     }
//
//     if(query.languages && query.languages.length){
//         strapiQuery['filters']['languages'] = { $in: query.languages };
//     }
// }