//
// Some dummy data
//

// FIRST VERSION: all data are not encrypted, even "private" ones
// Private just means don't display it
// Future version will encrypt later

// We have 03 tables

// - user
//   - publicKey: user public key (address can be derived, so don't store on blockchain, could cache on server)
//   - username: string - unique
//   - displayName: string - not unique
//   - avatar: string - URL to an image

// - propose: a propose has 2 sides: sender and receiver
//   - visibility: listed, public, private
//   - sending
//      - timestamp
//      - sender: string - an username
//      - visibilitySuggestion: listed, public, private
//      - receiverCanChangeVisibility: none, reduceOnly, all
//      - messsage: string
//      - attachments: array
//          - url: string URL
//          - caption: string
//          - location: {name, lat, long}
//   - receiving
//      - receiver: string - an username
//      - react: null, accepted, denied
//      - timestamp: of reaction
//      - message
//      - attachments: array
//          - type: default 'photo'
//          - url: string URL
//          - caption: default null
//          - location: {name, lat, long} - default - null

// - memory: public memory need accepted from partner
//      - visibility: listed, public, private
//      - timestamp
//      - sender
//      - visibilitySuggestion: listed, public, private
//      - receiverCanReduceVisibility: none, reduceOnly, all
//      - messsage: string
//      - attachments: array
//          - type: default 'photo'
//          - url: string URL
//          - caption: default null
//          - location: {name, lat, long} - default - null
//      - receiverReact: null, accepted, denied (only for listed or public memory)
//      - receiverReactTimestamp: 
