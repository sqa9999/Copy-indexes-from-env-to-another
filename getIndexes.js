var dbs = db._adminCommand("listDatabases");

    for (var i = 0; i < dbs.databases.length; i++) {
        var dbObj = db.getSiblingDB(dbs.databases[i].name);
        if(dbObj != "config" && dbObj != "admin" && dbObj != "local"){
             print("use " + dbObj)
             collections = dbObj.getCollectionInfos({"type" : "collection"})
             for (var j = 0; j<collections.length; j++) {
                  var cname = collections[j].name
                  var indexes = dbObj.getCollection(collections[j].name).getIndexes()
                  indexes.forEach(function(index){
                        var key = index.key
                        delete index.v;
                        var ns = index.ns;
                        delete index.ns;
                        delete index.key;
                        print("db."+ns.toString().split(".")[1]+".createIndex(" +  tojson(key)+ "," + tojson(index)+")")
                  });
             }
        }
    }
