// MEMORY

// Currently, return dummy JSON data
// TODO: update to get data from REDIS

exports.all = function(proposeId, cb) {
  cb(null, [  
    {  
       "id":"1",
       "createdAt":"Tuesday",
       "name":"Henriette Walter",
       "avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/jeremiaha/128.jpg",
       "dateTime":"Sunday",
       "content":"In ultricies ipsum sem, in ullamcorper velit luctus sed. Fusce arcu ante, aliquet sit amet ornare quis, euismod ac justo. Duis hendrerit, lacus a facilisis congue",
       "isClass":true
    },
    {  
       "id":"2",
       "createdAt":"Friday",
       "name":"Paige Haag",
       "avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/dannol/128.jpg",
       "dateTime":"Saturday",
       "content":"Duis hendrerit, lacus a facilisis congue",
       "isClass":false
    },
    {  
       "id":"3",
       "createdAt":"Sunday",
       "name":"Trycia Botsford",
       "avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/megdraws/128.jpg",
       "dateTime":"Saturday",
       "content":"In ultricies ipsum sem, in ullamcorper velit luctus sed. Fusce arcu ante, aliquet sit amet ornare quis, euismod ac justo. Duis hendrerit, lacus a facilisis congue",
       "isClass":true
    },
    {  
       "id":"4",
       "createdAt":"Sunday",
       "name":"Peggie Anderson",
       "avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/brajeshwar/128.jpg",
       "dateTime":"Saturday",
       "content":"Duis hendrerit, lacus a facilisis congue",
       "isClass":false
    },
    {  
       "id":"5",
       "createdAt":"Thursday",
       "name":"Berniece Stracke Sr.",
       "avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/cocolero/128.jpg",
       "dateTime":"Monday",
       "content":"In ultricies ipsum sem, in ullamcorper velit luctus sed. Fusce arcu ante, aliquet sit amet ornare quis, euismod ac justo. Duis hendrerit, lacus a facilisis congue",
       "isClass":true
    },
    {  
       "id":"6",
       "createdAt":"Wednesday",
       "name":"Kathryne Stokes",
       "avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/okcoker/128.jpg",
       "dateTime":"Saturday",
       "content":"Duis hendrerit, lacus a facilisis congue",
       "isClass":false
    },
    {  
       "id":"7",
       "createdAt":"Saturday",
       "name":"Barry Gutmann",
       "avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/_ragzor/128.jpg",
       "dateTime":"Friday",
       "content":"In ultricies ipsum sem, in ullamcorper velit luctus sed. Fusce arcu ante, aliquet sit amet ornare quis, euismod ac justo. Duis hendrerit, lacus a facilisis congue",
       "isClass":true
    },
    {  
       "id":"8",
       "createdAt":"Sunday",
       "name":"Bailey Wunsch",
       "avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/gcmorley/128.jpg",
       "dateTime":"Monday",
       "content":"Duis hendrerit, lacus a facilisis congue",
       "isClass":false
    },
    {  
       "id":"9",
       "createdAt":"Saturday",
       "name":"Dr. Janis Murray",
       "avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/prrstn/128.jpg",
       "dateTime":"Wednesday",
       "content":"In ultricies ipsum sem, in ullamcorper velit luctus sed. Fusce arcu ante, aliquet sit amet ornare quis, euismod ac justo. Duis hendrerit, lacus a facilisis congue",
       "isClass":true
    },
    {  
       "id":"10",
       "createdAt":"Sunday",
       "name":"Maxwell Schmitt",
       "avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/borantula/128.jpg",
       "dateTime":"Monday",
       "content":"Duis hendrerit, lacus a facilisis congue",
       "isClass":false
    }
 ])
}
