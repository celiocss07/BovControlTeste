import Realm from "realm";

import ChecklistSchema from "../Schemas/ChecklistSchema";

export default function getRealm(){
    return Realm.open({
        schema: [ChecklistSchema],
    })
}