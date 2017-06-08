// app/controllers/application.js
import Ember from "ember";

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  sessionAccount: Ember.inject.service(),
});
/*
 "meta":{
 "number":0,
 "last":false,
 "size":10,
 "numberOfElements":10,
 "totalPages":3,
 "sort":[
 {
 "direction":"ASC",
 "property":"id",
 "ignoreCase":false,
 "nullHandling":"NATIVE",
 "ascending":true,
 "descending":false
 }
 ],
 "first":true,
 "totalElements":21
 },
 */
