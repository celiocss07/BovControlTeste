import Realm from 'realm';
/* const From ={
    name: 'From',
    properties:{
        _id: {type: 'int', indexed: true},
        name: 'string'
    }
}
const To ={
    name: 'To',
    properties:{
        _id: {type: 'int', indexed: true},
        name: 'string'
    }
} */
const ChecklistSchema = {
  name: 'Checklist',
  primaryKey: 'id',
  properties: {
    id: {type: 'int', indexed: true},
    type: 'string',
    amount_of_milk_produced: 'int',
    number_of_cows_head: 'int',
    had_supervision: {type: 'bool', default: 'false'},
    farmer: "string",
    from: "string",
    to: "string",
    created_at: 'date', // Data de criação
    updated_at: 'date',
  },
};
// open a local realm with the 'Cat' schema
/* const realm = await Realm.open({
  schema: [Cat],
}); */

export default ChecklistSchema;
